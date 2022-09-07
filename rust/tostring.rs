use std::fmt;

struct Cat {
    name: String,
    color: String,
}

impl fmt::Display for  Cat {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "name: {}, color:{}", self.name, self.color)
    }
}

fn main() {
    let cat = Cat {name: String::from("tom"), color: String::from("grey")};

    println!("{}",cat.to_string());

    let parsed: i32 = "5".parse().unwrap();
    let turbo_parsed = "10".parse::<i32>().unwrap();

    let sum = parsed + turbo_parsed;
    println!("Sum: {:?}", sum);
}