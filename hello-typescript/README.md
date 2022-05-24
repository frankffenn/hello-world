#　Typescript　笔记

- [项目结构](#项目结构)
- [基础类型](#基础类型)
- [Array](#Array)
- [枚举](#枚举)
- [函数](#函数)
- [interface](#interface)
- [Object](#Object)
- [类class](#类-class)
- [for](#for)
- [Module 模块](#Module-模块)

## Typescipt  项目结构

使用 `tsc --init` 来创建一个 `tsconfig.json` 配置文件

```
typescript-project/
  dist/
  ts/
    src/           // ts 文件
      main.ts     
      util.ts
    test/          // 测试文件
      util_test.ts
  tsconfig.json     // 配置文件
```

主要设置这几个
```
--noImplicitAny: 如果 TypeScript 无法推断类型，我们必须指定它。这主要适用于函数和方法的参数：有了这个设置，我们必须对其进行注释。
--noImplicitThis: 如果这个类型不清楚，会提示。
--alwaysStrict: 尽可能使用 JavaScript 的严格模式。
--strictNullChecks: null 不是任何类型的一部分（除了它自己的类型 null），如果它是可接受的值，则必须明确提及。
--strictFunctionTypes: 启用对函数类型的更强检查
--strictPropertyInitialization: 类定义中的属性必须被初始化，除非它们的值可以是 undefined。
```

## 基础类型
- undefined, null
- boolean, number, string
- symbol
- object
- enum
- Array
- any
- void void
- null null
- undefined undefined
- never never

```
// var 和 let 的作用域不一样，var 全局， let 适应块代码
let isDone: boolean = false;
let lines: number = 42;
let name: string = "Anders";

// But you can omit the type annotation if the variables are derived
// from explicit literals
let isDone = false;
let lines = 42;
let name = "Anders";

// When it's impossible to know, there is the "Any" type
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

```

###　类型别名

type Age = number;
const age: Age = 26;

## Array 

Arrays 在 JavaScript 中扮演两个角色（一个或两个）：
- List 所有元素都具有相同的类型。 Array 的长度不同。
- Tuple 数组的长度是固定的。元素通常没有相同的类型。

```
// 两种数组的声明方式:
let arr1: number[] = [];
let arr2: 　enum将二维点存储在数组中，那么我们将该数组用作元组。看起来如下：

let point: [number, number] = [7, 5];

// 如果没有类型声明，那么 typescritp 会推断为 List number[]
// 元组的另一个例子是 Object.entries(obj) 的结果：一个数组，其中每个属性都有一个 [key, value] 对。

// 推断类型 [string, number]
const entries = Object.entries({ a: 1, b: 2 });

assert.deepEqual(
  entries,
  [[ 'a', 1 ], [ 'b', 2 ]]);
```


## 枚举
TypeScript 允许我们自己定义类似的类型，TypeScript 手册使用以大写字母开头的驼峰式名称
```
// 或者省略初始值，会从0开始加1 
enum NoYes {
  No,       // 0
  Yes,      // 1
  C = 'C',  // 如果中间有非数字类型的，后面的枚举类型必须给定初始值
  E = 8,    // 8
  F,        // 9
  Yes = Math.random(), // 可以编译期计算

  UserRead     = 1 << 8, // bit 8
  UserWrite    = 1 << 7,
  UserExecute  = 1 << 6,
}


function toGerman(value: NoYes) {
  switch (value) {
    case NoYes.No:
      return 'Nein';
    case NoYes.Yes:
      return 'Ja';
  }
}
```

引用枚举成员
```
enum HttpRequestField {
  'Accept',
  'Accept-Charset',
  'Accept-Datetime',
  'Accept-Encoding',
  'Accept-Language',
}
assert.equal(HttpRequestField['Accept-Charset'], 1);
```
建议使用字符串的枚举，避免打印日志打印枚举成员的是数字，和传参时错误没有告警的情况。

枚举成员可以用联合类型代替
```
type  Error = 'Network' | '' | 'Unknow';

function getError(err: Error) {
  switch (err) {
    case Error.Network:
      return 'network error';
    case Error.OutOfSpace:
      return 'out of space error';
    case Error.Unkown:
      return 'unknow error';
  }
}

```

## 函数
函数是头等，支持 lambda 粗箭头("fat arrow") 语法和使用类型推断，
粗箭头也称为 lambda 函数（因为其他语言）。另一个常用的功能是粗箭头函数 ()=>something
```
// 声明返回值类型
let f1 = function (i: number): number { return i * i; }
// 省略返回值类型，自动推断
let f2 = function (i: number) { return i * i; }
// 粗箭头语法
let f3 = (i: number): number => { return i * i; }
// 返回类型自动推断
let f4 = (i: number) => { return i * i; }
// 省略花括号表示没有返回值
let f5 = (i: number) => i * i;
```

###　可选参数， ?

```
function stringify123(callback?: (num: number) => string) {
  if (callback === undefined) {
    callback = String;
  }
  return callback(123); // (A)
}
```

### 参数默认值
默认值使参数可选。我们通常可以省略类型注释，因为 TypeScript 可以推断类型。例如，它可以推断出 x 和 y 都具有类型编号。
```
function createPoint(x=0, y=0): [number, number] {
  return [x, y];
}
```

### 剩余参数 ...
```
function joinNumbers(...nums: number[]): string {
  return nums.join('-');
} 
```

### 联合类型 |
```
function getScore(stringOrNumber: string|number): number {
  if (typeof stringOrNumber === 'string'
    && /^\*{1,5}$/.test(stringOrNumber)) {
      return stringOrNumber.length;
  } else if (typeof stringOrNumber === 'number'
    && stringOrNumber >= 1 && stringOrNumber <= 5) {
    return stringOrNumber
  } else {
    throw new Error('Illegal value: ' + JSON.stringify(stringOrNumber));
  }
}
```
在 TypeScript 中，undefined 和 null 由单独的、不相交的类型处理。如果我们想允许它们，我们需要联合类型，例如 undefined|string 和 null|string：  
```
let maybeNumber: null|number = null;
maybeNumber = 123;
```

可选与默认值与未定义|T 区别：
```
// 可选参数
function f1(x?: number) { return x }

assert.equal(f1(123), 123); // OK
assert.equal(f1(undefined), undefined); // OK
assert.equal(f1(), undefined); // can omit

// 默认参数
function f2(x = 456) { return x }

assert.equal(f2(123), 123); // OK
assert.equal(f2(undefined), 456); // OK
assert.equal(f2(), 456); // can omit

// 联合类型
function f3(x: undefined | number) { return x }

assert.equal(f3(123), 123); // OK
assert.equal(f3(undefined), undefined); // OK

// @ts-expect-error: Expected 1 arguments, but got 0. (2554)
f3(); // can’t omit
```

## interface
接口是结构化的，任何具有属性的东西都符合接口
```
interface Person {
  name: string;
  // Optional properties, marked with a "?"
  age?: number;
  // And of course functions
  move(): void;
}

// 实现“Person”接口的对象,可以被视为 Person，因为它具有 name 和 move 属性
let p: Person = { name: "Bobby", move: () => { } };
// 可选属性
let validPerson: Person = { name: "Bobby", age: 42, move: () => { } };
// 不是 Person 类型
let invalidPerson: Person = { name: "Bobby", age: true };
```

接口也可以描述一个函数类型, 参数类型必须相同
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (src: string, sub: string) {
  return src.search(sub) != -1;
}
```


## Object
与数组类似，对象在 JavaScript 中扮演两个角色（偶尔混合）： 
- 记录：在开发时已知的固定数量的属性。每个属性可以有不同的类型。 
- 字典：在开发时名称未知的任意数量的属性。所有属性都具有相同的类型。

`interface` 关键字声明一个对象， `；`分隔成员
```
interface Point {
  x: number;
  y: number;
}

或通过逗号分隔成员
interface Point {
  x: number,
  y: number,
}
```

TypeScript Point 接口匹配所有具有适当结构的对象，不必实现接口才能当参数
```
interface Point {
  x: number;
  y: number;
}
function pointToString(pt: Point) {
  return `(${pt.x}, ${pt.y})`;
}

assert.equal(
  pointToString({x: 5, y: 7}), // compatible structure
  '(5, 7)');
```
Object 字面量类型是匿名接口,一个好处是它们可以内联使用：
```
function pointToString(pt: {x: number, y: number}) {
  return `(${pt.x}, ${pt.y})`;
}
```

###　可选属性
```
interface Person {
  name: string;
  company?: string;
}

// 以下两种方式不会报错
const john: Person = {
  name: 'John',
};

const jane: Person = {
  name: 'Jane',
  company: 'Massive Dynamic',
};
```

### 方法
interface 也可以包含方法, 定义方法和函数类型成员是一样的
```
// 方法
interface Point {
  x: number, 
  y: number,
  distance(other: Point): number,
}


// 函数成员
interface Point{
  x: number, 
  y: number,
  distance: (other: Point) => number, 
}
```

### 类型变量和泛型类型
TypeScript 的两个语言级别：     
- 值存在于动态层面
- 类型存在于静态级别

普通函数存在于动态级别，是值的工厂，并具有表示值的参数。参数在括号之间声明：
```
const valueFactory = (x: number) => x; // 定义
const myValue = valueFactory(123); // 使用
```
泛型类型存在于静态级别，是类型的工厂并具有表示类型的参数。参数在尖括号之间声明:
```
type TypeFactory<X> = X; // 定义
type MyType = TypeFactory<string>; // 使用
```

## 类 class
Class 的成员默认是公开的
```
class Point {
  // 属性
  x: number;

  // y 跟 x 一样，并且有默认值
  constructor(x: number, public y: number = 0) {
    this.x = x;
  }

  // 方法定义
  dist(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }

  // 静态成员
  static origin = new Point(0, 0);
}
```

## for
```
// for..of statement
let arrayOfAnyType = [1, "string", false];
for (const val of arrayOfAnyType) {
    console.log(val); // 1, "string", false
}

let list = [4, 5, 6];
for (const i of list) {
   console.log(i); // 4, 5, 6
}

// for..in statement
for (const i in list) {
   console.log(i); // 0, 1, 2
}
```

### 访问修饰符

| 访问权限 | public | protectd | private |
|- | - | - | - |
|class | 可以| 可以 | 可以|
|class children| 可以| 可以| 不可以|
|class instances| 可以| 不可以| 不可以|

```
class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}

// EFFECT ON INSTANCES
var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : private
foo.z; // ERROR : protected

// EFFECT ON CHILD CLASSES
class FooChild extends FooBase {
    constructor() {
      super();
        this.x; // okay
        this.y; // ERROR: private
        this.z; // okay
    }
}
```

### 抽象 abstract
抽象类不能直接实例化，只能创建一个类来继承抽象类
```
abstract class FooCommand {}

class BarCommand extends FooCommand {}

const fooCommand: FooCommand = new FooCommand(); // 不能实例化

const barCommand = new BarCommand(); 
```
抽象成员不能直接访问，并且继续的子类必须要实现抽象成员
```
abstract class FooCommand {
  abstract execute(): string;
}

class BarErrorCommand  extends FooCommand {} // 'BarErrorCommand' needs implement abstract member 'execute'.

class BarCommand extends FooCommand {
  execute() {
    return `Command Bar executed`;
  }
}

const barCommand = new BarCommand();

barCommand.execute(); // Command Bar executed
```


### implements 实现
类可以使用 `implements`显式实现接口, 只要包含相同的属性和方法就可以。
```
class PointPerson implements Person {
  name: string
  move() {}
}
```

### extends 继续
```
let p1 = new Point(10, 20);
let p2 = new Point(25); //y will be 0

// 继承
class Point3D extends Point {
  constructor(x: number, y: number, public z: number = 0) {
    super(x, y); // 显式调用超类构造函数是强制性的
  }

  // 重写方法
  dist(): number {
    let d = super.dist();
    return Math.sqrt(d * d + this.z * this.z);
  }
}
```


## Module 模块
```
module Geometry {
  export class Square {
    constructor(public sideLength: number = 0) {
    }
    area() {
      return Math.pow(this.sideLength, 2);
    }
  }
}

let s1 = new Geometry.Square(5);

// 引用模块的本地别名
import G = Geometry;

let s2 = new G.Square(10);

```

## 泛型

```
// 类
class Tuple<T1, T2> {
  constructor(public item1: T1, public item2: T2) {
  }
}

// 接口
interface Pair<T> {
  item1: T;
  item2: T;
}

// 方法
let pairToTuple = function <T>(p: Pair<T>) {
  return new Tuple(p.item1, p.item2);
};

let tuple = pairToTuple({ item1: "hello", item2: "world" });

```