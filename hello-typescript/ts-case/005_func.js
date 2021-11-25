// 可选参数
function say(nickname) {
    if (nickname) {
        return "hello " + nickname;
    }
    return "hello";
}
// 默认参数
function sayHello(nickname) {
    if (nickname === void 0) { nickname = "frank"; }
    return "Hello " + nickname;
}
// 剩余参数
function addNumbers() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var i = 0;
    var sum = 0;
    for (var num in nums) {
        sum += nums[num];
    }
    console.log("sum: " + sum);
}
console.log(say());
console.log(sayHello());
addNumbers(1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
addNumbers(10, 10, 10, 10, 10, 10, 10, 10, 10, 10);
function add(a, b, c) {
    console.log(a, b, c);
}
add(10, 20);
