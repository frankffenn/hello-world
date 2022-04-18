
# Rust-By-Example 笔记

原文: https://doc.rust-lang.org/stable/rust-by-example/index.html   

[TOC]

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

## 注释方式
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

## 格式化
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
## 基本类型

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


例子：

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

## 文字和表达类型
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

## 自定义类型

 - struct 定义一个结构体
 - enum 定义枚举类型
 - const 定义常量
 - static  ?

struct 关键字三种用法
 - 命名元组     struct Pair(i32, f32)
 - 重命名单位类型  struct Unit
 - 定义结构体

```
#[allow(dead_code)]  // 忽略未使用元素的警告日志
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