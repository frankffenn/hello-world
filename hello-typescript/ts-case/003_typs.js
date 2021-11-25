"use strict";
/*
    any 任意类型
    string 字符串
    boolean 逻辑
    - 数组
        let arr: number[] = [1, 2];
        let arr: Array<number> = [1, 2];
    - 元组
        let x: [string, number];
    enum 枚举
    void void
    null null
    undefined undefined
    never never
*/
var _a;
exports.__esModule = true;
exports.MutationType = void 0;
var Coin;
(function (Coin) {
    Coin[Coin["BTC"] = 0] = "BTC";
    Coin[Coin["ETH"] = 1] = "ETH";
    Coin[Coin["FIL"] = 2] = "FIL";
})(Coin || (Coin = {}));
var boy = "frank";
var coin_list = [Coin.BTC, Coin.FIL];
function say(name) {
    if (name) {
        return "hello " + name;
    }
    return "hello";
}
// console.log(boy)
// console.log(coin_list)
// console.log(say(boy))
var MutationType;
(function (MutationType) {
    MutationType["CreateItem"] = "CREATE_ITEM";
    MutationType["SetItem"] = "SET_ITEM";
    MutationType["Complete"] = "COMPLETE";
    MutationType["SetLoading"] = "SET_LOADING";
})(MutationType = exports.MutationType || (exports.MutationType = {}));
var xt = (_a = {
        profile: "666"
    },
    _a["name"] = function (str) {
        console.log("hello " + str + xt.profile);
    },
    _a);
//xt.profile = "frank"
xt.name("123");
