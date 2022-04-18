
# Rust-By-Example 笔记

原文: https://doc.rust-lang.org/stable/rust-by-example/index.html   

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
### 基本类型

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

### 类型别名 type aliases

如果 enum 的变量名称太长或者常用冲突，可以用 type alias 来重命名, 最常见的就是 impl 关键字里的用 self 来当别名。

```
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

还有另外的用法就跟 C 的枚举类型一样。

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

### 类型别名，type aliases

type 关键字可用于为现有类型赋予新名称。类型必须具有驼峰名称，否则编译器将发出警告。此规则的例外是原始类型：usize、f32 
主要用与引入相同名称包时解决冲突，
```
type NanoSecond = u64;
type Inch = u64;
```

