class Car {
    engine: string;
    constructor(engine: string){
        this.engine = engine;
    }
    disp(): void {
        console.log("this car's engine is " + this.engine);
    }
}


var car = new Car("mazda");
car.prototype.color = "black";
car.disp()

console.log("this car's color is " + car.color);


/// 类的继承
// 接口可以继承多个，但类只能继承一个，但可以多重继承
class Root {
    name: string
}


class Clild extends Root {}
class Leaf extends Clild {}


var obj = new Leaf();
obj.name = "leaf";
console.log(obj.name);