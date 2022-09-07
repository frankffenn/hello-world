fn cat<Lin>(arg:Lin) {
    // println!("got generics type Lin:{}", arg.into());
    println!("called cat function");
}

fn main() {
   cat("cat");
}