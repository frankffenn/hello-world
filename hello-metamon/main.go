package main

import (
	"crypto/ecdsa"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/go-resty/resty/v2"
	"github.com/google/uuid"
	"log"
	"math"
	"math/rand"
	"net/http"
	"os"
	"sort"
	"time"
)

type Metamon struct {
	address    string
	privateKey string
	c          *resty.Client
	backoff    Backoff
}

type Backoff struct {
	minDelay time.Duration
	maxDelay time.Duration
}

func (b *Backoff) next(attempt int) time.Duration {
	if attempt < 0 {
		return b.minDelay
	}

	minf := float64(b.minDelay)
	durf := minf * math.Pow(1.5, float64(attempt))
	durf = durf + rand.Float64()*minf

	delay := time.Duration(durf)
	if delay > b.maxDelay {
		return b.maxDelay
	}

	return delay
}

func New(privateKey string) *Metamon {
	address, err := getPublicKey(privateKey)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("login wallet address:", address)
	return &Metamon{
		address:    address,
		privateKey: privateKey,
		c:          resty.New(),
		backoff:    Backoff{maxDelay: 5 * time.Second, minDelay: 2 * time.Second},
	}
}

func prefixHash(data []byte) common.Hash {
	msg := fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(data), data)
	return crypto.Keccak256Hash([]byte(msg))
}

func (m *Metamon) sign(msg string) (string, error) {
	privateKey, err := crypto.HexToECDSA(m.privateKey)
	if err != nil {
		return "", err
	}

	data := []byte(msg)
	hash := prefixHash(data)

	signature, err := crypto.Sign(hash.Bytes(), privateKey)
	if err != nil {
		return "", err
	}

	// https://stackoverflow.com/questions/69762108/implementing-ethereum-personal-sign-eip-191-from-go-ethereum-gives-different-s
	signature[64] += 27

	return hexutil.Encode(signature), nil
}

func (m *Metamon) Login(sign, msg string) error {
	params := map[string]string{
		"address": m.address,
		"sign":    sign,
		"msg":     msg,
		"network": "1",
	}

	resp, err := m.c.R().SetQueryParams(params).Post(loginURL)
	if err != nil {
		return err
	}

	if resp.StatusCode() != http.StatusOK {
		return errors.New("response err")
	}

	var ret Response
	if err := json.Unmarshal(resp.Body(), &ret); err != nil {
		return err
	}

	log.Println(ret)

	token := ret.Data.(string)
	m.setHeaders(token)

	return nil
}

func (m *Metamon) setHeaders(token string) {
	headers := map[string]string{
		"content-type": "multipart/form-data; boundary=----WebKitFormBoundaryBoisGGEqBQMlOG7a",
		"accesstoken":  token,
		"user_agent":   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
	}
	m.c = m.c.SetHeaders(headers)
}

func (m *Metamon) GetObjects(address, metamonId, battleLevel string) ([]*Monster, error) {
	params := map[string]string{
		"address":   address,
		"metamonId": metamonId,
		"front":     battleLevel,
	}

	resp, err := m.c.R().SetQueryParams(params).Post(getObjectURL)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode() != http.StatusOK {
		return nil, errors.New("response err")
	}

	var out MonsterObject
	if err := decodeResponse(resp.Body(), &out); err != nil {
		return nil, err
	}

	return out.Objects, nil
}

func (m *Metamon) StartPay(from, to, battleLevel string) error {
	params := map[string]string{
		"address":     m.address,
		"battleLevel": battleLevel,
		"monsterA":    from,
		"monsterB":    to,
	}

	resp, err := m.c.R().SetQueryParams(params).Post(startPayURL)
	if err != nil {
		return err
	}

	if resp.StatusCode() != http.StatusOK {
		return errors.New("response err")
	}

	var ret PayResult
	if err := decodeResponse(resp.Body(), &ret); err != nil {
		return err
	}

	if ret.Pay == true {
		log.Printf("pay %d raca success, please go to battle \n", ret.Amount)
	} else {
		log.Printf("pay failed! please try again \n")
		return errors.New("pay failed")
	}

	return nil
}

func (m *Metamon) StartBattle(from, to, battleLevel string) error {
	params := map[string]string{
		"address":     m.address,
		"battleLevel": battleLevel,
		"monsterA":    from,
		"monsterB":    to,
	}

	resp, err := m.c.R().SetQueryParams(params).Post(startBattleURL)
	if err != nil {
		return err
	}

	if resp.StatusCode() != http.StatusOK {
		return errors.New("response err")
	}

	var ret BattleResult
	if err := decodeResponse(resp.Body(), &ret); err != nil {
		return err
	}

	log.Printf("battle result: isWin: %t fragmentNum: %d  EXP: %d \n", ret.ChallengeResult, ret.BpFragmentNum, ret.ChallengeExp)
	return nil
}

func (m *Metamon) getWalletProperty() ([]*Monster, error) {
	params := map[string]string{
		"address":   m.address,
		"orderType": "-1",
	}

	resp, err := m.c.R().SetQueryParams(params).Post(getWalletPropertyList)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode() != http.StatusOK {
		return nil, errors.New("response err")
	}

	var monsters MonsterList
	if err := decodeResponse(resp.Body(), &monsters); err != nil {
		return nil, err
	}

	return monsters.Monsters, nil
}

func decodeResponse(in []byte, out interface{}) error {
	var ret Response
	if err := json.Unmarshal(in, &ret); err != nil {
		return err
	}

	if ret.Code != "SUCCESS" {
		log.Println(ret.Message)
	}

	data, err := json.Marshal(ret.Data)
	if err != nil {
		return err
	}

	if err := json.Unmarshal(data, &out); err != nil {
		return err
	}

	return nil
}

func getPublicKey(pk string) (string, error) {
	bytes, err := hexutil.Decode(fmt.Sprintf("0x%s", pk))
	if err != nil {
		return "", err
	}

	privateKey, err := crypto.ToECDSA(bytes)
	if err != nil {
		return "", err
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		return "", errors.New("cannot assert type: publicKey is not of type *ecdsa.PublicKey")
	}

	address := crypto.PubkeyToAddress(*publicKeyECDSA).Hex()
	return address, nil
}

func getBattleLevel(level int64) string {
	if level < 21 {
		return "1"
	} else if level >= 21 && level < 41 {
		return "2"
	} else {
		return "3"
	}
}

func (m *Metamon) UpdateMonster(monsterId string) error {
	params := map[string]string{
		"nftId":   monsterId,
		"address": m.address,
	}

	resp, err := m.c.R().SetQueryParams(params).Post(updateMonsterURL)
	if err != nil {
		return err
	}

	if resp.StatusCode() != http.StatusOK {
		return errors.New("response err")
	}

	var ret Response
	if err := json.Unmarshal(resp.Body(), &ret); err != nil {
		return err
	}

	log.Println("update monster: ", ret.Code)
	return nil
}

func main() {
	msg := fmt.Sprintf("LogIn-%s", uuid.New())
	m := New(os.Getenv("WALLET_PRIVATE_KEY"))

	sign, err := m.sign(msg)
	if err != nil {
		log.Fatalln("sign: ", err)
		return
	}

	if err := m.Login(sign, msg); err != nil {
		log.Fatalf("login: %v", err)
	}

	myMonsters, err := m.getWalletProperty()
	if err != nil {
		log.Fatalln("get monster failed: ", err)
		return
	}

	for _, monster := range myMonsters {
		if monster.Update {
			if err := m.UpdateMonster(monster.Id); err != nil {
				log.Println(err)
			}
		}

		for i := 0; i < int(monster.Tear); i++ {
			battleLevel := getBattleLevel(monster.Level)
			monsters, err := m.GetObjects(monster.Owner, monster.Id, battleLevel)
			if err != nil {
				log.Fatalln(err)
			}

			sort.Slice(monsters, func(i, j int) bool {
				return monsters[i].Sca < monsters[j].Sca
			})

			best := monsters[0]
			log.Printf("The weakest monster: Id: %s, Rarity:%s, Sca: %d", best.TokenId, best.Rarity, best.Sca)

			time.Sleep(m.backoff.next(i))

			if err := m.StartPay(monster.Id, best.Id, battleLevel); err != nil {
				log.Fatalln("start pay failed: ", err)
			}

			if err := m.StartBattle(monster.Id, best.Id, battleLevel); err != nil {
				log.Fatalln("start battle failed:", err)
			}
		}
	}
}
