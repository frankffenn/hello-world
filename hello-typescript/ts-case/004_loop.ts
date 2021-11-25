
//  for 
for (let i = 0; i < 10; i++) {
    console.log("index: " + i);
}


// for .. in
var lang: Array<string> = ["GO", "RUST", "Typescript"]
for (var idx in lang) { 
    console.log(idx, lang[idx])
}

// for .. of
let array = [1, "frank", true]
for (let entry of array) {
    console.log(entry)
}

// foreach
let list = [1, 4, 5]
list.forEach((val, idx, arr) => {
    console.log(val, idx, arr)
    return true
})


//every
list.every((val, idx, arr) => {
    console.log(val, idx, arr)
    return true
})


// while
var num:number = 5
while (num > 0 ){
    console.log(num)
    num--
}

// do .. while
var num2: number = 10
do {
    console.log(num2)
    num2--
}while(num2 > 0)


