use std::mem;


fn main() {
    let color = String::from("green");

    // color 保存在闭包函数里，直到被使用
    let print  = || println!("the color is: {}", color);
    println!("before:{:p}", color.as_ptr());
    print();

    // 闭包只是保存引用地址
    let _reborrow = &color;
    print();

    let _color_remove = color;

    let mut count = 0;
    
     // 闭包使用的外部的变量，也会改变变量的值
    let mut inc = || {
        count += 1;
        println!("count:{}", count);
    };

    inc();
    // 闭包仍然可变地借用 `count`，因为它是稍后调用的
    inc();

    // count 变量被借走了，闭包函数无法再借用
    let _count_reborrowed = &mut count;
    println!("_count_reborrowed: {}", _count_reborrowed);

    // count 变量被借走了，inc 闭包函数无法再借用，报错
    //inc();
    
}