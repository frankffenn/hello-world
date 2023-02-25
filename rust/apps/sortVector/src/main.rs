#[derive(Eq, PartialEq, Ord, PartialOrd)]
struct Person {
    name: String,
    age: i32,
}

impl Person {
    pub fn new(name: String, age: i32) -> Self {
        Person {
            name,
            age,
        }
    }
}


fn main() {
    let mut people = vec![
        Person::new("b".to_string(), 1),
        Person::new("a".to_string(), 2),
        Person::new("c".to_string(), 5),
        Person::new("d".to_string(), 4),
    ];

    people.sort();

    people.iter().into_iter().for_each(|item| {
        println!("person name:{}, age:{}", item.name, item.age);
    });


    // sort by age
    people.sort_by(|i,j| i.age.cmp(&j.age));

    people.iter().into_iter().for_each(|item| {
        println!("person name:{}, age:{}", item.name, item.age);
    });
}
