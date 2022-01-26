package main

const (
	//address: 0xe003b2fb03f3126347afdbba460ed39e57f9588d
	//sign: 0xd82e41034dc9875d8090006af62b295ecf961febefec557ec3675c59a437e0cf2c653d5ecd02164b7e25ce158ca005eea176041cbb9eb958594c30e4652065ad1c
	//msg: LogIn-4a20c27e-fee7-a053-2980-4c039ccc23d9
	//network: 1
	loginURL     = "https://metamon-api.radiocaca.com/usm-api/login"
	getObjectURL = "https://metamon-api.radiocaca.com/usm-api/getBattelObjects"
	// address: 0xe003b2fb03f3126347afdbba460ed39e57f9588d
	// battleLevel: 2
	// monsterA: 176598
	// monsterB: 947068
	// resp:
	//{
	//	"code":"SUCCESS",
	//	"data":{
	//		"amount":10,
	//		"pay":true
	//	},
	//	"message":"",
	//	"result":1
	//}
	startPayURL = "https://metamon-api.radiocaca.com/usm-api/startPay"
	// address: 0xe003b2fb03f3126347afdbba460ed39e57f9588d
	// battleLevel: 2
	// monsterA: 176598
	// monsterB: 947068
	// resp
	//{
	//  "battleLevel": 2,
	//  "bpFragmentNum": 33,
	//  "bpPotionNum": 0,
	//  "bpRacaNum": 10,
	//  "challengeExp": 5,
	//  "challengeLevel": 27,
	//  "challengeMonster": {
	//    "con": 96,
	//    "conMax": 200,
	//    "createTime": "2021-12-02 11:18:08",
	//    "crg": 50,
	//    "crgMax": 100,
	//    "exp": 112,
	//    "expMax": 0,
	//    "id": "947068",
	//    "imageUrl": "https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A7-9880.png",
	//    "inte": 98,
	//    "inteMax": 200,
	//    "inv": 48,
	//    "invMax": 100,
	//    "isPlay": true,
	//    "itemId": 0,
	//    "itemNum": 0,
	//    "lastOwner": "0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//    "level": 27,
	//    "levelMax": 60,
	//    "life": 100,
	//    "lifeLL": 10,
	//    "luk": 20,
	//    "lukMax": 50,
	//    "monsterUpdate": false,
	//    "network": null,
	//    "owner": "0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//    "race": "dwarf",
	//    "rarity": "N",
	//    "sca": 312,
	//    "scaMax": 650,
	//    "status": 0,
	//    "tear": 19,
	//    "tokenId": null,
	//    "updateTime": "2022-01-25 01:32:03",
	//    "years": 1
	//  },
	//  "challengeMonsterId": "947068",
	//  "challengeNft": {
	//    "contractAddress": "0xF24Bf668Aa087990f1d40aBAbF841456E771913c",
	//    "createdAt": "2021-12-02 11:18:08",
	//    "description": "Normal Metamon NFT in Metamon Game on BSC.",
	//    "handle": null,
	//    "id": "947068",
	//    "imageUrl": "https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A7-9880.png",
	//    "level": null,
	//    "metadata": "{\"image\":\"https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A7-9880.png\",\"external_url\":\"https://www.radiocaca.com/\",\"name\":\"Metamon\",\"description\":\"Normal Metamon NFT in Metamon Game on BSC.\",\"attributes\":[{\"Rarity\":\"N\",\"Wisdom\":\"98\",\"Luck\":\"20\",\"Size\":\"96\",\"Race\":\"dwarf\",\"Courage\":\"50\",\"Stealth\":\"48\",\"Level\":\"1\",\"Healthy\":\"100\"}]}",
	//    "name": "Metamon",
	//    "network": 1,
	//    "owner": "0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//    "rarity": null,
	//    "status": -2,
	//    "symbol": "Metamon",
	//    "tokenId": "549999",
	//    "updatedAt": "2022-01-18 15:01:29"
	//  },
	//  "challengeOwner": "0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//  "challengeRecords": [
	//    {
	//      "attackType": 0,
	//      "challengeId": "557501773",
	//      "defenceType": 0,
	//      "id": null,
	//      "monsteraId": "947068",
	//      "monsteraLife": 100,
	//      "monsteraLifelost": 0,
	//      "monsterbId": "176598",
	//      "monsterbLife": 54,
	//      "monsterbLifelost": 46
	//    },
	//    {
	//      "attackType": 0,
	//      "challengeId": "557501773",
	//      "defenceType": 0,
	//      "id": null,
	//      "monsteraId": "176598",
	//      "monsteraLife": 54,
	//      "monsteraLifelost": 0,
	//      "monsterbId": "947068",
	//      "monsterbLife": 55,
	//      "monsterbLifelost": 45
	//    },
	//    {
	//      "attackType": 0,
	//      "challengeId": "557501773",
	//      "defenceType": 0,
	//      "id": null,
	//      "monsteraId": "947068",
	//      "monsteraLife": 55,
	//      "monsteraLifelost": 0,
	//      "monsterbId": "176598",
	//      "monsterbLife": 4,
	//      "monsterbLifelost": 50
	//    },
	//    {
	//      "attackType": 0,
	//      "challengeId": "557501773",
	//      "defenceType": 0,
	//      "id": null,
	//      "monsteraId": "176598",
	//      "monsteraLife": 4,
	//      "monsteraLifelost": 0,
	//      "monsterbId": "947068",
	//      "monsterbLife": 10,
	//      "monsterbLifelost": 45
	//    },
	//    {
	//      "attackType": 0,
	//      "challengeId": "557501773",
	//      "defenceType": 0,
	//      "id": null,
	//      "monsteraId": "947068",
	//      "monsteraLife": 10,
	//      "monsteraLifelost": 0,
	//      "monsterbId": "176598",
	//      "monsterbLife": 0,
	//      "monsterbLifelost": 46
	//    }
	//  ],
	//  "challengeResult": true,
	//  "challengedMonster": {
	//    "con": 95,
	//    "conMax": 200,
	//    "createTime": "2021-10-30 17:52:52",
	//    "crg": 50,
	//    "crgMax": 100,
	//    "exp": 190,
	//    "expMax": 0,
	//    "id": "176598",
	//    "imageUrl": "https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A1-8060.png",
	//    "inte": 95,
	//    "inteMax": 200,
	//    "inv": 48,
	//    "invMax": 100,
	//    "isPlay": true,
	//    "itemId": 0,
	//    "itemNum": 0,
	//    "lastOwner": "0xd75d4bf0dc774669e3daf4da0f9bc7a82303a47b",
	//    "level": 27,
	//    "levelMax": 60,
	//    "life": 100,
	//    "lifeLL": 0,
	//    "luk": 19,
	//    "lukMax": 50,
	//    "monsterUpdate": false,
	//    "network": null,
	//    "owner": "0xd75d4bf0dc774669e3daf4da0f9bc7a82303a47b",
	//    "race": "dwarf",
	//    "rarity": "N",
	//    "sca": 307,
	//    "scaMax": 650,
	//    "status": 0,
	//    "tear": 0,
	//    "tokenId": null,
	//    "updateTime": "2022-01-24 18:21:35",
	//    "years": 1
	//  },
	//  "challengedMonsterId": "176598",
	//  "challengedNft": {
	//    "contractAddress": "0xF24Bf668Aa087990f1d40aBAbF841456E771913c",
	//    "createdAt": "2021-10-10 06:52:04",
	//    "description": "Normal Metamon NFT in Metamon Game on BSC.",
	//    "handle": null,
	//    "id": "176598",
	//    "imageUrl": "https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A1-8060.png",
	//    "level": null,
	//    "metadata": "{\"image\":\"https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A1-8060.png\",\"external_url\":\"https://www.radiocaca.com/\",\"name\":\"Metamon\",\"description\":\"Normal Metamon NFT in Metamon Game on BSC.\",\"attributes\":[{\"Rarity\":\"N\",\"Wisdom\":\"95\",\"Luck\":\"19\",\"Size\":\"95\",\"Race\":\"dwarf\",\"Courage\":\"50\",\"Stealth\":\"48\",\"Level\":\"1\",\"Healthy\":\"100\"}]}",
	//    "name": "Metamon",
	//    "network": 1,
	//    "owner": "0xd75d4bf0dc774669e3daf4da0f9bc7a82303a47b",
	//    "rarity": null,
	//    "status": 0,
	//    "symbol": "Metamon",
	//    "tokenId": "160516",
	//    "updatedAt": "2021-12-24 19:21:55"
	//  },
	//  "challengedOwner": "0xd75d4bf0dc774669e3daf4da0f9bc7a82303a47b",
	//  "createTime": null,
	//  "id": "557501773",
	//  "monsterUpdate": false,
	//  "updateTime": null
	//}
	startBattleURL = "https://metamon-api.radiocaca.com/usm-api/startBattle"
	//address: 0xe003b2fb03f3126347afdbba460ed39e57f9588d
	//orderType: -1
	//{
	//	"code":"SUCCESS",
	//	"data":{
	//		"metamonList":[
	//			{
	//				"con":96,
	//				"conMax":200,
	//				"createTime":"2021-12-02 11:18:08",
	//				"crg":50,
	//				"crgMax":100,
	//				"exp":127,
	//				"expMax":230,
	//				"id":"947068",
	//				"imageUrl":"https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Dwarf-A7-9880.png",
	//				"inte":98,
	//				"inteMax":200,
	//				"inv":48,
	//				"invMax":100,
	//				"isPlay":true,
	//				"itemId":1,
	//				"itemNum":1,
	//				"lastOwner":"0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//				"level":27,
	//				"levelMax":60,
	//				"life":100,
	//				"lifeLL":0,
	//				"luk":20,
	//				"lukMax":50,
	//				"monsterUpdate":false,
	//				"network":1,
	//				"owner":"0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//				"race":"dwarf",
	//				"rarity":"N",
	//				"sca":312,
	//				"scaMax":650,
	//				"status":-2,
	//				"tear":16,
	//				"tokenId":"549999",
	//				"updateTime":"2022-01-25 03:15:14",
	//				"years":1
	//			}
	//		],
	//		"metamonNum":"1",
	//		"pDiamondNum":"0",
	//		"potionNum":"0",
	//		"yDiamondNum":"0"
	//	},
	//	"message":"",
	//	"result":1
	//}
	getWalletPropertyList = "https://metamon-api.radiocaca.com/usm-api/getWalletPropertyList"
	//nftId: 947068
	//address: 0xe003b2fb03f3126347afdbba460ed39e57f9588d
	//resp
	//{
	//	"code":"SUCCESS",
	//	"data":null,
	//	"message":"",
	//	"result":1
	//}
	updateMonsterURL = "https://metamon-api.radiocaca.com/usm-api/updateMonster"
	//0xe003b2fb03f3126347afdbba460ed39e57f9588d
	// resp
	//"item":[
	//			{
	//				"bpNum":"1146",
	//				"bpType":1,
	//				"createTime":"2021-12-02 22:43:15",
	//				"id":183592,
	//				"owner":"0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//				"updateTime":"2022-01-26 01:36:57"
	//			},
	//			{
	//				"bpNum":"20",
	//				"bpType":2,
	//				"createTime":"2021-12-03 07:12:55",
	//				"id":185961,
	//				"owner":"0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//				"updateTime":"2022-01-26 01:39:49"
	//			},
	//			{
	//				"bpNum":"958",
	//				"bpType":5,
	//				"createTime":"2021-12-02 12:04:25",
	//				"id":181025,
	//				"owner":"0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//				"updateTime":"2022-01-26 01:36:57"
	//			},
	//			{
	//				"bpNum":"0",
	//				"bpType":6,
	//				"createTime":"2021-12-08 07:50:57",
	//				"id":197245,
	//				"owner":"0xe003b2fb03f3126347afdbba460ed39e57f9588d",
	//				"updateTime":"2022-01-24 05:38:58"
	//			},
	//			{
	//				"bpNum":"1",
	//				"bpType":0,
	//				"createTime":null,
	//				"id":null,
	//				"owner":"",
	//				"updateTime":null
	//			}
	checkBagURL = "https://metamon-api.radiocaca.com/usm-api/checkBag"
)

type Response struct {
	Code    string      `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

/*
"con":97,
"conMax":200,
"createTime":"2021-10-31 00:34:41",
"crg":51,
"crgMax":100,
"exp":26,
"expMax":0,
"id":"198455",
"imageUrl":"https://racawebsource.s3.us-east-2.amazonaws.com/metamon/media/normal/Spirit-J1-4255.png",
"inte":100,
"inteMax":200,
"inv":51,
"invMax":100,
"isPlay":false,
"itemId":0,
"itemNum":0,
"lastOwner":"0xa148434a6bf43b9af92341ca9a88072d6eef2c0f",
"level":27,
"levelDiff":0,
"levelMax":60,
"life":100,
"lifeLL":0,
"luk":19,
"lukMax":50,
"monsterUpdate":false,
"owner":"0xa148434a6bf43b9af92341ca9a88072d6eef2c0f",
"race":"spirit",
"rarity":"N",
"sca":318,
"scaMax":650,
"status":0,
"tear":20,
"tokenId":"141494",
"updateTime":"2022-01-24 18:00:10",
"years":1
*/
type Monster struct {
	Id      string `json:"id"`
	TokenId string `json:"tokenId"`
	Rarity  string `json:"rarity"`
	Sca     int64  `json:"sca"`
	Exp     int64  `json:"exp"`
	ExpMax  int64  `json:"expMax"`
	Update  bool   `json:"monsterUpdate"`
	Tear    int64  `json:"tear"`
	Owner   string `json:"owner"`
	Level   int64  `json:"level"`
}

type MonsterObject struct {
	Number  int64      `json:"number"`
	Objects []*Monster `json:"objects"`
}

type MonsterList struct {
	Monsters []*Monster `json:"metamonList"`
}

type PayResult struct {
	Amount int64 `json:"amount"`
	Pay    bool  `json:"pay"`
}

type BattleResult struct {
	ChallengeResult bool  `json:"challengeResult"`
	BattleLevel     int64 `json:"battleLevel"`
	BpFragmentNum   int64 `json:"bpFragmentNum"`
	ChallengeExp    int64 `json:"challengeExp"`
	ChallengeLevel  int64 `json:"challengeLevel"`
}

type Bag struct {
	Item []*BagItem `json:"item"`
}

type BagItem struct {
	Number string `json:"bpNum"`
	Type   int64  `json:"bpType"`
	Id     int64  `json:"id"`
	Owner  string `json:"owner"`
}
