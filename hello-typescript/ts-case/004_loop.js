//  for 
for (var i = 0; i < 10; i++) {
    console.log("index: " + i);
}
// for .. in
var lang = ["GO", "RUST", "Typescript"];
for (var idx in lang) {
    console.log(idx, lang[idx]);
}
// for .. of
var array = [1, "frank", true];
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var entry = array_1[_i];
    console.log(entry);
}
// foreach
var list = [1, 4, 5];
list.forEach(function (val, idx, arr) {
    console.log(val, idx, arr);
    return true;
});
//every
list.every(function (val, idx, arr) {
    console.log(val, idx, arr);
    return true;
});
// while
var num = 5;
while (num > 0) {
    console.log(num);
    num--;
}
// do .. while
var num2 = 10;
do {
    console.log(num2);
    num2--;
} while (num2 > 0);
