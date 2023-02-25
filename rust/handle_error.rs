use std::fs::File;
use std::io::ErrorKind;

fn main() {

}


fn default_error() {
   let file_result = File::open("hello.txt");
   let _file = match file_result {
        Ok(file) => file,
        Err(e) => panic!("open file: {}", e),
   };
}  

fn match_error_kind() {
    let file_result = File::open("hello.txt");

    let _file = match file_resule {
        Ok(file) => file,
        Err(e) => match e.kind() {
            ErrorKind::NotFound => match _file.create("hello.txt") {
                Ok(f) => f,
                Err(e) => panic!("create file: {}", e),
            },
            other_error => panic!("other error"),
        };
    };
}

// 使用闭包让代码更简单
fn match_error_kind_use_colsures() {
    let file_result = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("create file: {}", error)
            });
        }else {
            panic!("open file: {}", error);
        }
    });
}

// 还能更简单
// unwrap 如果程序报错，就会返回  Error,如果没错误，返回 Ok 的内容
fn hanle_error_with_unwrap() {
    let file_result = File::open("hello.txt").unwrap();
}

// 使用 expect 只返回有错误的
fn hanle_error_with_expect() {
    let file_resule = File::open("hello.txt")
    .expect("open file error");
}


// 错误广播（上抛）
fn propagating_error() -> Result<String, io::Error>{
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => Err(e),
    }

    let mut username = String::new();
    match username_file.read_to_string(&mut username) {
        Ok(_) => username,
        Err(e) => e,
    }
}

// 使用问号操作符, 问题操作符只能返回相应类型的返回值，不同类型会报错
// 比如下面例子必须是 Result<T, E> 类型的返回 
fn propagating_error_with_question_mark() -> Result<String, io::Error> {
    let username_file = File::open("hello.txt")?;
    let mut username = String::new();
    let username_file.read_to_string(&mut username)?;
    Ok(username)
}

//  使用链式调用还能再简化一点
fn propagating_error_with_question_mark_2() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?;
    Ok(username)
}