struct Tiger{
    color: String,
    name: String,
}

// 定义猫科动物特性
trait Cat {
    fn new(name: String, color: String) -> Self;

    // 方法签名, 即规定方法名和入参出参
    fn name(&self);
    fn color(&self);

    // 可以定义默认的方法
    fn talk(&self) {
        println!("baaaaah this is with");
    }
}

// 为 tiger 实现 cat 的特性
impl Cat for Tiger {
    fn new(name: String, color: String) -> Tiger {
        Tiger {name: name, color: color}
    }

    fn name(&self) {
        println!("name: {}",  self.name);
    }

    fn color(&self) {
        println!("color: {}", self.color);
    }

    fn talk(&self) {
        println!("rewrite talk function");
    }
}


#[derive(Debug)]
#[derive(PartialEq, PartialOrd)]
struct Inches(i32);

fn main() {
    let t = Tiger::new("laohu".to_string(), "huawen".to_string());

    t.color();
    t.name();
    t.talk();


    let foot = Inches(32);
    println!("{:?}", foot);

    let _is_true = foot == foot;
}