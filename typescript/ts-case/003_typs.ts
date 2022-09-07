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


enum Coin{ BTC, ETH, FIL}

let boy:string = "frank"
let coin_list: Coin[] = [Coin.BTC, Coin.FIL];

function say(name: string): string {
    if (name) {
        return "hello " + name
    }
    return "hello"
}

// console.log(boy)
// console.log(coin_list)
// console.log(say(boy))




export enum MutationType {
    CreateItem = "CREATE_ITEM",
    SetItem = "SET_ITEM",
    Complete = "COMPLETE",
    SetLoading = "SET_LOADING",
}

export type Mutation = {
    [MutationType.CreateItem](state:string, item:string):void
    [MutationType.SetItem](state:string, items:string[]):void
    [MutationType.Complete](state:string, items:Partial<string> & {id:number}) :void
    [MutationType.SetLoading](state:string, value:boolean):void
}


type test = {
    ["name"](str:string):void,
}


var xt: testTree & test  = {
    ["name"](str:string):void{
        console.log("hello "+ str)
    }
}

//xt.profile = "frank"
xt.name("123")