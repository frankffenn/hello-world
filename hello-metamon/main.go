package main

import (
	"encoding/json"
	"errors"
	"github.com/go-resty/resty/v2"
	"log"
	"math"
	"math/rand"
	"net/http"
	"sort"
	"time"
)

type Metamon struct {
	address     string
	metamonId   string
	privateKey  string
	battleLevel string
	c           *resty.Client
	backoff     Backoff
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
	return &Metamon{
		address:     "0xe003b2fb03f3126347afdbba460ed39e57f9588d",
		metamonId:   "947068",
		battleLevel: "2",
		privateKey:  privateKey,
		c:           resty.New(),
		backoff:     Backoff{maxDelay: 5 * time.Second, minDelay: 2 * time.Second},
	}
}

func (m *Metamon) setHeaders() {
	headers := map[string]string{
		"content-type": "multipart/form-data; boundary=----WebKitFormBoundaryBoisGGEqBQMlOG7a",
		"accesstoken":  "DO0B5JH9ppIwgh9lNPq4Qw==",
		"user_agent":   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
	}
	m.c = m.c.SetHeaders(headers)
}

func (m *Metamon) GetObjects() ([]*Monster, error) {
	params := map[string]string{
		"address":   m.address,
		"metamonId": m.metamonId,
		"front":     m.battleLevel,
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

func (m *Metamon) StartPay(from, to string) error {
	params := map[string]string{
		"address":     m.address,
		"battleLevel": m.battleLevel,
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

func (m *Metamon) StartBattle(from, to string) error {
	params := map[string]string{
		"address":     m.address,
		"battleLevel": m.battleLevel,
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

func main() {
	m := New("123")
	m.setHeaders()

	monsters, err := m.GetObjects()
	if err != nil {
		log.Fatalln(err)
	}

	sort.Slice(monsters, func(i, j int) bool {
		return monsters[i].Sca < monsters[j].Sca
	})

	best := monsters[0]
	log.Printf("battle monster: Id: %s, Rarity:%s, Sca: %d", best.TokenId, best.Rarity, best.Sca)

	myMonsters, err := m.getWalletProperty()
	if err != nil {
		log.Fatalln("get monster failed: ", err)
		return
	}

	for _, monster := range myMonsters {
		for i := 0; i < int(monster.Tear); i++ {
			if err := m.StartPay(m.metamonId, best.Id); err != nil {
				log.Fatalln("start pay failed: ", err)
			}

			if err := m.StartBattle(m.metamonId, best.Id); err != nil {
				log.Fatalln("start battle failed:", err)
			}

			time.Sleep(m.backoff.next(i))
		}
	}
}
