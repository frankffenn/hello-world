var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.disp = function () {
        console.log("this car's engine is " + this.engine);
    };
    return Car;
}());
var car = new Car("mazda");
car.prototype.color = "black";
car.disp();
console.log("this car's color is " + car.color);
