fn age() -> i32 {
    15
}

fn main(){
    match age() {
        0 => println!("zero,"),
        n @ 1..=13 => println!("1-13"),
        n @ 13..=19 => println!("13-19"),
        n => println!("rest"),
    }
}