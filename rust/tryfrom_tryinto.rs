use std::convert::TryFrom;
// use std::convert::TryInto;

// 偶数, 这里使用定义元组的方式
#[derive(PartialEq)]
struct EvenNumber(i32);

impl TryFrom<i32> for EvenNumber {
    // 使用别名的方式定义一个错误类
    type Error = ();

    // Result 是内置的类型
    fn try_from(value: i32) -> Result<Self, Self::Error> {
        if value %2 == 0 {
            Ok(EvenNumber(value))
        }else{
            Err(())
        }
    }
}

fn main() {
    assert_eq!(EvenNumber::try_from(8), Ok(EvenNumber(8)));
    assert_eq!(EvenNumber::try_from(5), Err())
}