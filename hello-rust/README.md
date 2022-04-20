
# Rust-By-Example 笔记

原文: https://doc.rust-lang.org/stable/rust-by-example/index.html   

- [安装](#安装)
- [编译](#编译)
- [Rust包和crate以及模块](#Rust包和crate以及模块)
- [语法](#语法)
  - [表达式](#表达式)
  - [注释方式](#注释方式)
  - [格式化](#格式化)
  - [原始类型](#原始类型)
  - [文字和表达类型](#文字和表达类型)  
  - [关联函数和方法](#关联函数和方法)
  - [自定义类型](#自定义类型)
  - [枚举类型](#enums-枚举类型)
  - [类型别名](#类型别名-type-aliases)
  - [作用域和遮蔽](#作用域和遮蔽scope-and-shadowing)
  - [类型转换](#类型转换) 
  - [类型推断](#类型推断) 
  - [From和Into特性](#from-和-into-特性) 
  - [TryFrom和TryInto特性](#tryfrom-和-tryinto-特性) 
  - [字符串转换和解析](#字符串转换和解析) 
  - [流控制](#流控制) 
  - [闭包](#闭包)                       
  - [模块](#模块)

## 安装

进入官网 `https://www.rust-lang.org/tools/install` 或者用下面的脚本安装     
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

升级版本,大概一个多月会升级一次
```
rustup update
```

## 编译

创建文件 `hello-world.rs`       
```
fn main(){
    println!("hello world");
}
```
编译 `rustc hello-world.rs`，执行 `./hello-world`, 得到输出结果     
```
➜   ./hello-world 
hello world
```

## Rust包和crate以及模块

crate 是一个二进制项/ 库， rust编译以crate root源文件为起点，包中包含一个Cargo.toml 描述如何构建crate.
使用 `cargo new project-name` 创建一个新的项目
```
├── Cargo.toml
└── src
    └── main.rs
```
Cargo 遵循一个约定 src/main.rs是一个与包同名二进制crate的根，如果包中同时包含src/main.rs, src/lib.rs 表示拥有多个与包同名的crate， 每个src/bin 文件都会被编译成独立的库

## 语法

### 表达式
rust 每一行都要以分号结尾，没有分号结尾则当返回值，分号结尾返回值为 `()`;     

### 注释方式
```
 // 常规注释
 /*
 * 块注释
 */
或者
/*
 注释内容
*/
```

### 格式化
打印由 std::fmt 中定义的一系列宏处理，其中包括：
```
format! 格式化
print! 跟 format! 一样，只是在打印出来
println!
eprint! 和 format!一样，只是文本打印到标准错误
eprintln!

```
std::fmt 标准输出,包含多种格式化特征(fromatting traits), 主要包含下面两种
```
fmt::Debug 使用 {:?} 标记
fmt::Display 使用 {} 标记
```
### 原始类型
rust 的基本类型默认都是只读的，不能修改，如果想要修改，在定义时要加上 `mut` 关键字。

基本类型
- signed: i8, i16, i32, i64, i128
- unsigned: u8, u16, u32, u64, u128
- floating: f32, f64
- char
- bool: true, false
- unit type: () 空的元组，相当 java 的 void, go 的 nil

组合类型
- 数组 [1, 2, 3]， 固定长度
- 元组 (1, true) 不同类型的集合
- 切片 跟数组一样，只是不固定长度

通常要使用后缀注释来指定类型，没有约束的话会,编译器会默认使用 i32 和 f64 类型
() 占用0个字节      
u8/i8 占用1个字节       
u16/i16 占用2个字节     
u32/i32/f32 占用4个字节         
u64/i64/f64 占用8个字节     
u128/i128 占用 16个字节     

```
/// 引入标准包
use std::mem;

fn main(){

    // 指定类型
    let logical: bool = true;
    println!("{}",logical);

    let a_float: f64 = 1.0; // 常规注释
    let an_intege = 5i32;   // 后缀注释

    // 默认值判断类型
    let default_float   = 3.0; // `f64`
    let default_integer = 7;   // `i32`


    //  通过上下文推断类型
    let mut inferred_type = 12; 
    inferred_type = 4294967296i64; // i64

    // mut 关键字指定 mutable 类型，才能修改值 
    // 如果没有 mut 关键字，会报错 cannot assign twice to immutable variable
    let mut mutable = 12; // Mutable `i32`
    mutable = 21;

    //  类型错误 mismatched types
    // mutable = true;

    // 关键字 let 可修改类型
    let mutable = true;

    println!("{};{}", a_float, an_intege);

    // 元组定义
    let long_tuple = (1u8, 2u16, 3u32, 4u64,
                      -1i8, -2i16, -3i32, -4i64,
                      0.1f32, 0.2f64,
                      'a', true);

    println!("long tuple first value: {}", long_tuple.0);
    println!("long tuple second value: {}", long_tuple.1);

    // 注意，长元组不能打印
    let too_long_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
    // println!("too long tuple: {:?}", too_long_tuple);

    // 数组定义，指定长度，语法: [T;len]
    let xs:[i32;5] = [1,2,3,4,5];
    // 指定长度，给定初始值
    let ys:[i32;500] = [6;500];

    println!("x0:{}, y0:{}", xs[0], ys[0]);
    println!("lenx:{}, leny:{}", xs.len(), ys.len());

    // 数组是连续的内存地址，分配在栈上
    println!("array occupies {} bytes", mem::size_of_val(&xs));
    // 数组可以当成切片参数传递，会自动转换
    
    analyze_slice(&xs);

    // 数组截取成切片
    analyze_slice(&xs[1..4]);
}

// 切片类型定义 &[T]
fn analyze_slice(slice: &[i32]){
    println!("first element of the slice: {}", slice[0]);
    println!("the slice has {} elements", slice.len());
}
```

### 赋值
```
let color = String::from("red");

// 这种是拷贝引用，地址相同
let _reborrow = &color;

// 这种是删除了 color 变量，创建一个新的 _remove 变量，内存地址和值保留不变。
// 删除之后，color 变量就无法再使用了。
let _remove = color;

```

### 文字和表达类型
- 0x 十六进制
- 0o 八进制
- 0b 二进制

另外，10_000 等于 10000, 增加可读性
```
fn main(){
    // 后缀注释表示u32类型
    println!("1 + 2 = {}", 1u32 + 2); 

    // 溢出 this arithmetic operation will overflow
    // println!("1 - 2 = {}", 1u32 - 2);

    println!("0011 AND 0101 is {:04b}", 0b0011u32 & 0b0101);

    // 增加可读性
    println!("One million is written as {}", 1_000_000u32);
}   
```

### 关联函数和方法
使用 `fn` 关键字定义一个方法, 参数必须指定类型，`->` 后面接返回值，最后一行表达式作为返回值，或者可以使用 `return` 关键字在中间或者 `if` 语句中提前返回。 

```
fn is_divisible_by(lhs: u32, rhs:u32) -> bool{
    if rhs == 0 {
            return false;
    }
    // 返回值，不需要分号结尾
    lhs % rhs == 0
}
```

函数是定义在类型上的`fn`, 使用双冒号来调用(`::`)    
方法是定义在特定实例的`fn`, 使用点来调用 (`.`)  

如果要变成方法，必须要有 self 参数
>   found the following associated functions; to be used as methods, functions must have a `self` parameter

```
struct Cat {}

impl Cat {
    fn new() -> Cat {
        Cat{}
    }

    fn say(self) -> String{
        String::from("I am a cat")
    }
}

fn main() {
    let cat = Cat::new();

    // cat.say() 等同于 Cat::say(cat);
    println!("{}", cat.say());
}
```

### 自定义类型

 - struct 定义一个结构体
 - enum 定义枚举类型
 - const 定义常量, 不可修改的常量
 - static  具有静态生命周期的可修改变量，访问和修改 static 变量是不安全的。

struct 关键字三种用法
 - 命名元组     struct Pair(i32, f32)
 - 重命名单位类型  struct Unit
 - 定义结构体

```
#[allow(dead_code)]  // 忽略未使用代码的警告日志
struct Person{
    name: String,
    age: u8,
}

// 定义元组, 必须要 分号结尾
struct Pair(u32, f32);

fn main() {
    let petter = Person{name: String::from("petter"), age: 18};
    println!("{}",petter.name);

    // 更新元素
    let tom = Person{name: String::from("tom"), ..petter};
    println!("name:{}, age:{}", tom.name, tom.age);
    

    // 解构（destructure）
    let Person{name: m_name, age: m_age} = petter;
    println!("{},{}", m_name, m_age);

    // 元组也同样的解构方式
    let p = Pair(17,0.3);
    let Pair( a, b ) = p;
    println!("{},{}", a, b)
}

```

### enums 枚举类型

enum 可以组合多种类型
```
enum WebEvent {
    // 类型 unit 类型
    PageLoad
    PageUnload

    //类似元组类型
    KeyPress(char)
    Paste(String)

    // struct 类型
    Click{x: i32, y:i32}
}
```

匹配 enum 的元素
```
fn inspect(event: WebEvent) {
    match event{
        WebEvent::PageLoad => println!("Page load"),
        WebEvent::PageUnload => println!("Page unload"),
        WebEvent::KeyPress(c) => println!("Key Press {}", c),
        WebEvent::Paste(s) => println!("pasted\n {}", s),
        WebEvent::Click{x,y} => {
            println!("click at: x={}, y={}", x, y);
        }
    }
}
```

还有另外的用法就跟 C 的枚举类型一样。

### 类型别名 type aliases
如果 enum 的变量名称太长或者常用冲突，可以用 type alias 来重命名, type 关键字可用于为现有类型赋予新名称。类型必须具有驼峰名称，否则编译器将发出警告。此规则的例外是原始类型：usize、f32     
最常见的就是 impl 关键字里的用 self 来当别名和解决引入相同名称包时的冲突。
```
type NanoSecond = u64;
type Inch = u64;

enum VeryVerboseEnumOfThingsToDoWithNumbers {
    Add,
    Subtract,
}

impl VeryVerboseEnumOfThingsToDoWithNumbers {
    fn run(&self, x: i32, y: i32) -> i32 {
        match self {
            Self::Add => x + y,
            Self::Subtract => x - y,
        }
    }
}

```

### 作用域和遮蔽(Scope and Shadowing)
跟其他语言类型，作用域使用 {} 来实现范围, rust 里还有一个遮蔽概念, 在一个作用域里修改外边的变量，仅对作用域内有效
```
fn main() {
    let shadowed_binding = 1;

    {
        println!("before being shadowed: {}", shadowed_binding); // 1

        // 修改 shadowed_binding 变量，仅在作用域里有效
        let shadowed_binding = "abc";

        println!("shadowed in inner block: {}", shadowed_binding); // abc
    }
    println!("outside inner block: {}", shadowed_binding);  // 1

    let shadowed_binding = 2;
    println!("shadowed in outer block: {}", shadowed_binding); // 2
}
```

### 类型转换
```
let decimal = 65.4321_f32;

let integer: u8 = decimal; // 报错，没有隐式转换
let integer:u8 = decimal as u8; // 隐式转换，有点 typescript 的感觉

// 溢出，1000 - 256 - 256 - 256 = 232
println!("1000 as a u8 is : {}", 1000 as u8);

```

### 类型推断
```
fn main() {
    // 使用后缀注释定义类型
    let elem = 5u8;

    // 创建一个空的 vector, 这时候编译器不知道 vec 是什么类型，只知道是 Vec<> 这样的
    let mut vec = Vec::new();
    // 这个时候编译器推断出了 vec 就是 u8 类型
    vec.push(elem);

    println!("{:?}", vec);
}
```

### From 和 Into 特性
From 提供了类型转换的功能，规定如果进行两个不同的类型进行转换
使用 `impl` 关键字来实现一个方法，`for` 指定这个方法的对象, 
into 是自动生成的，使用时必须要指定类型，会根据指定的类型去寻找 From 方法进行类型转换

```
struct Cat{
    name: String,
    age: u32,
}

struct Tiger{
    name:String,
    age: u32,
    color: String,
}

// 为 Tiger 创建一个 from 的方法，from 的方法只能接收一个参数
impl From<Cat> for Tiger {
    fn from(cat: Cat) -> Tiger {
        Tiger{name: cat.name, age: cat.age, color:String::from("yellow")}
    }
}

fn main(){
    let a_cat = Cat{name: String::from("tom"), age: 12};

    // 可以从 Cat 类型创建一个新的 Tiger 类型
    let a_tiger = Tiger::from(a_cat);

    println!("tiger name:{}, age:{}, color:{}", a_tiger.name, a_tiger.age, a_tiger.color);

    // 注意这里的 into 是 cat.into() 不是 cat::into()
    // into 会自动去寻找 From 方法
    let cat = Cat{name: String::from("tom"), age: 12};
    let tiger: Tiger = cat.into();
    
    println!("into tiger: {}", tiger.name);
}
```

### TryFrom 和 TryInto 特性
跟 From 和 Into 类型，只是增加了错误的处理，针对一些需要返回错误的情况

### 字符串转换和解析

只要实现了 `fmt::Display` 特性，就可以调用 `to_string` 的方法,      
四种转成字符串的方法，效率差不多 
 - String::from("str")
 - "str".to_string()
 - "str".into()
 - "str".to_owned()

```
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
```

### 流控制  
- if-else 跟 go 一样， 不需要括号，用块代码包裹
- loop 跟 其他语言的 for 一样，无限循环, break 退出 
    - loop 可以带注释和嵌套， break 和 continue 可以传参，退出到指定 loop
    - loop 可以当成返回值，会一直重试直到退出
- while 跟其他语言一样，循环
- for-range  迭代器，几种用法
    - for n in 1..100 {} 区间 [1:100)
    - for n in 1..=100 {} 区间 [1:100]
    - for item in items.iter() {} 从 items 里面遍历元素，不可修改
    - for item in items.into_iter() {} 从 items 里取出元素
    - for item in items.iter_mut() 从 items 里面遍历元素, 可修改
- match 匹配，类似 go 的switch, 返回第一个匹配成功的条件
    - match 加if过滤
    - match 函数
- if-let 匹配 enum 时比 match 更简洁, 而且避免编译时报错
- while-let 跟 if-let 类型，增加循环 match，简化代码

loop 当返回值
```
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    assert_eq!(result, 20);
}
```

match 数字
```
fn main(){
    let number = 13;
    match number {
        1 => println!("one"),
        2 | 3 | 4 | 5 => println!("prime"),
        13..=19 => println!("teen age:{}", number),
        // 默认
        _ => println!("Ain't special"),
    }
}

```

match 还有解构（destructure）功能
```
// 元组
let triple = (0, -2, 3);

println!("{}", triple);
mactch triple {
    (0, y, z) => println!("first is 0"),
    (1, y) => println!("first is 1"),
    _ => println!("it doesn't match"),
}

// 数组或切片
let array = [1, 3, 5];
match array {
    // 参数绑定获取元素
    [0, second, third] => println!("second:{},third:{}", second, third),
    // 使用 _ 忽略元素
    [0, _, third] => println!("third:{}", third),
    // 使用 .. 忽略剩下的元素
    [1, second, ..] => println!("second:{}", second),
    // 用 @.. 保存到另外的数组或切片
    [1, second, tail @..] => println!("tail: {}", tail),
    // 保存中间部分元素
    [1, middle @ .., tail] => println!("middle:{}", middle),
}
```

match 函数返回值
```
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
```
### 闭包
闭包也是一个函数，闭包使用 || 来包裹参数， 可以不用指定参数和返回值类型会自动推断。
```
fn function(i:i32) -> i32 {i+1};

// 可以省略函数名
let closure_annotated = |i:32| -> i32 {i+1};
// 省略函数名和参数返回值类型
let closure_inffered = |i| -> i+1;

// 调用方式
println!("result:{}", function(1));
println!("result:{}", closure_annotated(2));
println!("result:{}", closure_inffered(3));

// 没有参数的闭包函数
let one = || 1;
println!("closure returning one: {}", one());
```

当闭包函数当做参数传递时，为了避免歧义，必须使用下面的特性：            
- `Fn`  使用引用变量
- `FnMut`  使用可修改变量
- `FnOnce` 使用值变量
       
定义闭包时，编译器会隐式创建一个新的匿名结构来将捕获的变量存储在其中,同时通过以下特征之一实现功能：对于这种未知类型的 Fn、FnMut 或 FnOnce。这种类型被分配给在调用之前存储的变量。

由于这种新类型是未知类型，因此函数中的任何用法都需要泛型。但是，无界类型参数 <T> 仍然是模棱两可的，并且是不允许的。因此，受以下特征之一的限制：Fn、FnMut 或 FnOnce（它实现）足以指定其类型。

```
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

// 定义一个函数
fn function() {
    println!("here is a function");
}

fn main() {
    let x = 7;
    let print = || println!("{}", x);

    apply(print);       // 7
    // 闭包可以当成参数传递
    call_me(print);     // 7
    // 函数也可以当成参数传递
    call_me(function);  // here is a function
}
```

闭包当返回值返回，使用`impl`关键字和 `Fn`, `FnMut`, `FnOnce` 三种特性，同时必须使用 move 关键字，这表明所有捕获都按值发生。这是必需的，因为一旦函数退出，任何通过引用进行的捕获都会被丢弃，从而在闭包中留下无效的引用。

```
// 闭包当返回值, Fn特性还可以是 FnMut, FnOnce
fn create() -> impl Fn() {
    let text = "Fn".to_owned();
    move || println!("this is a:{}", text)
}

fn main() {
    let ret = create();
    ret();
}
```
#### 高级函数
更多细节待补充      
```
// Functional approach
let sum_of_squared_odd_numbers: u32 =
    (0..).map(|n| n * n)                        // All natural numbers squared
    .take_while(|&n_squared| n_squared < upper) // Below upper limit
    .filter(|&n_squared| is_odd(n_squared))     // That are odd
    .fold(0, |acc, n_squared| acc + n_squared); // Sum them
println!("functional style: {}", sum_of_squared_odd_numbers);
```
#### 发散函数
发散的功能永远不会返回。它们使用 ! 标记，这是一个空类型。
与所有其他类型相反，此类型无法实例化，因为此类型可以具有的所有可能值的集合都是空的。请注意，它与 () 类型不同，后者只有一个可能的值。
```
fn foo() -> ! {
    panic!("This call never returns.");
}
```

还有 continue， exit() 之类的，不会返回任何东西。

### 模块
Rust 提供了一个强大的模块系统，可用于将代码分层拆分为逻辑单元（模块），并管理它们之间的可见性（公共/私有）。

#### 可视化
```
// 定义一个 my_mod 的模块
mod my_mod {
    // 默认是私有的方法
    fn private_function() {
        println!("called my_mod::private_function");
    }

    // 可以使用 pub 关键字重写成为公开的
    pub fn function(){
        println!("called my_mod::function");
    }

    // 可以访问同个模块下的项目，包括私有的
    pub fn indirect_access() {
        println!("called my_mod:: indirect_access");
        private_function();
    }

    // 嵌套模块
    pub mod nested {
        pub fn function() {
            println!("called my_mod::nested::function");
        }

        #[allow(dead_code)]
        fn private_function(){
            println!("called my_mod::nested::private_function");
        }

        // pub(in path) 语法表示这个公共方法只在 path 下面可见
        pub(in crate::my_mod) fn public_function_in_my_mod() {
            println!("called my_mod::nested::public_function_in_my_mod");
            public_function_in_nested();
        }

        // pub(self) 语法表示只能在当前模块中可见
        pub(self) fn public_function_in_nested() {
            println!("called my_mod::nested::public_function_in_nested");
        }

        // pub(super) 语法表示只在父模块中可见
        pub(super) fn public_function_in_super_mod() {
            println!("called my_mod::nested::public_function_in_super_mod");
        }
    }

    pub fn call_public_function_in_my_mod(){
        println!("called my_mod::call_public_function_in_my_mod");
        nested::public_function_in_my_mod();
        print!("> ");
        nested::public_function_in_super_mod();
    }

    // 只在当前的包中可见
    pub(crate) fn public_function_in_crate() {
        println!("called my_mod::public_function_in_crate");
    }

    // 私有的嵌套模块
    mod private_nested {
        pub fn function(){
            println!("called my_mod::private_nested");
        }
    }

}


fn main() {
    // 调用公共的方法
    my_mod::function();
    my_mod::indirect_access();
    my_mod::nested::function();
    my_mod::call_public_function_in_my_mod();

    // 在同个包下可以随地调用
    my_mod::public_function_in_crate();
    // 只能在 path (crate::my_mod) 中调用
    // my_mod::nested::public_function_in_my_mod();

    // 公共模块下的私有方法也不能调用
    // my_mod::private_function();
    // my_mod::nested::private_function();

    // 私有的模块就算是公共方法也不能调用
   // my_mod::private_nested::function();
}
```

#### 结构可视化
结构对其字段具有额外的可见性。可见性默认为私有，并且可以使用 pub 修饰符覆盖。这种可见性仅在从定义它的模块外部访问结构时才重要，并且具有隐藏信息（封装）的目标。
```
mod my {
    // 定义一个公共的结构体，并且拥有一个公开泛型的字段
    pub struct OpenBox<T> {
        pub contents: T,
    }

    // 定义一个公开的结构体，拥有一个私有的泛型字段
    pub struct CloseBox<T> {
        contents: T,
    }

    impl <T> CloseBox<T> {
        // 公共的构造方法
        pub fn new(contents:T) -> CloseBox<T> {
            CloseBox{contents:contents}
        }
    }
}

fn main() {
   let open_box = my::OpenBox{contents: "public information"};
   println!("the open box:{}", open_box.contents);

   // 无法使用字段名直接构造类型
   // let close_box = my::CloseBox{contents: "classified information"};
    // 只能通过公开的构造方法创建
   let close_box = my::CloseBox::new("classified information");
   // 无法获取私有的字段
   、、println!("the closed box:{}", close_box.contents);
}
```