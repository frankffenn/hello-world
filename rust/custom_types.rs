#[allow(dead_code)]
struct Person {
    name: String,
    age: u8,
}

// A unit struct
#[allow(dead_code)]
struct Unit;

// A tuple struct
#[allow(dead_code)]
struct Pair(i32, f32);

// A struct with two fields
struct Point {
    x: u32,
    y: u32,
}

// Structs can be reused as fields of another struct
#[allow(dead_code)]
struct Rectangle {
    // A rectangle can be specified by where the top left and bottom right
    // corners are in space.
    top_left: Point,
    bottom_right: Point,
}

fn main() {
   let rect = Rectangle{
       top_left: Point{x: 0, y: 10},
       bottom_right: Point{x: 10, y: 0},
   };
   
  rect_area(rect);
}

fn rect_area(rect: Rectangle) {
    let Rectangle{top_left: t, bottom_right: b} = rect;
    let Point{x: x1, y: y1} = t;
    let Point{x: x2, y: y2} = b;

    println!("{}", (x2 - x1)*(y1-y2));
    
}
