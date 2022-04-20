// 必须实现闭包函数 F 的 `Fn`方法
fn apply<F>(f: F) where
    F: Fn() {
    f();
}

// 定义一个接受通用 `F` 参数的函数,以 `Fn` 为界，并调用它
// 意思是这个 call_me 的函数只能被 <F:　Fn()> 这类的函数调用，包括闭包和普通函数
// 是上面的简单写法
fn call_me<F: Fn()>(f: F) {
    f()
}

fn function() {
    println!("here is a function");
}


// 闭包当返回值, Fn特性还可以是 FnMut, FnOnce
fn create() -> impl Fn() {
    // 四种转成字符串的方法，效率差不多 String::from(), "".to_string(), "".into(), "".to_owned()
    let text = "Fn".to_owned();
    move || println!("this is a:{}", text)
}


fn main() {
    let x = 7;
    let print = || println!("{}", x);

    apply(print);       // 7
    call_me(print);     // 7
    call_me(function);  // here is a function


    let ret = create();
    ret();
}