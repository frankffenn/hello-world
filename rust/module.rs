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

   let open_box = my::OpenBox{contents: "public information"};
   println!("the open box:{}", open_box.contents);

   // 无法使用字段名直接构造类型
   // let close_box = my::CloseBox{contents: "classified information"};
    // 只能通过公开的构造方法创建
   let close_box = my::CloseBox::new("classified information");
   // 无法获取私有的字段
   、、println!("the closed box:{}", close_box.contents);
}


