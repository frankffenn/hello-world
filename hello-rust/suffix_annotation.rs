fn main(){
    // 后缀注释表示u32类型
    println!("1 + 2 = {}", 1u32 + 2); 

    // 溢出 this arithmetic operation will overflow
    // println!("1 - 2 = {}", 1u32 - 2);

    println!("0011 AND 0101 is {:04b}", 0b0011u32 & 0b0101);

    // 增加可读性
    println!("One million is written as {}", 1_000_000u32);
}   