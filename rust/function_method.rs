struct Cat {}

impl Cat {
    fn new() -> Cat {
        Cat{}
    }

    // self &self 
    fn say(self) -> String{
        String::from("I am a cat")
    }
}

fn main() {
    let cat = Cat::new();
    println!("form1:{}", cat.say());
    println!("form2:{}", Cat::say(cat));
}
