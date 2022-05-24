// Partial 把参数变成可选的

type Item = {
    id: string
    name: string
}


var oriItem: Item = {
    id: "666",
    name: "1122",
}

var newItem: Partial<Item> = {
    id : '123',
    // 这里没有 name 属性不会报错
}
