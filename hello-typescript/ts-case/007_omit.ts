// Omit<K,T> 类型可以从另外一个对象类型中剔除某些属性

type User = {
    name: string;
    age: number;
    sex: string;
}

// 但不我们不想要 sex 属性

type NewUser = Omit<User, 'sex'>

var man:NewUser = {
    name: 'tom',
    age: 36,
}

console.log(man.name, man.age)