use std::convert::From;

struct Cat{
    name: String,
    age: u32,
}

impl From<Cat> for Tiger {
    fn from(cat: Cat) -> Tiger {
        Tiger{name: cat.name, age: cat.age, color:String::from("yellow")}
    }
}

struct Tiger{
    name:String,
    age: u32,
    color: String,
}


fn main(){
    let a_cat = Cat{name: String::from("tom"), age: 12};

    let a_tiger = Tiger::from(a_cat);

    println!("tiger name:{}, age:{}, color:{}", a_tiger.name, a_tiger.age, a_tiger.color);

    let cat = Cat{name: String::from("tom"), age: 12};
    let tiger: Tiger = cat.into();
    
    println!("into tiger: {}", tiger.name);
}