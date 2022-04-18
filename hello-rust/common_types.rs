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