
// 可选参数
function say(nickname?: string) :string {
    if (nickname){
        return "hello "+nickname
    }
    return "hello"
}


// 默认参数
function sayHello(nickname:string = "frank") :string {
    return "Hello " + nickname 
}


// 剩余参数
function addNumbers(...nums:number[]) {
    var i = 0;
    var sum: number = 0;
    for(var num in nums){
        sum += nums[num];
    }
    console.log("sum: " + sum);
}



console.log(say())
console.log(sayHello())
addNumbers(1,3,4,5,6,7,8,9,10,11,12,13)
addNumbers(10,10,10,10,10,10,10,10,10,10)

// 函数重载
// 先定义好函数，精确的函数定义写在前面，优先匹配
// 实现函数的时候会自动匹配定义函数
function add(a:number, b:number):void
function add(a:number, b:number, c:number) :void

function add(a:number, b:number, c:number) :void {
    console.log(a, b, c);
}

add(10, 20)
