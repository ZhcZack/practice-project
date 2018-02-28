interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({ color: 'black' });

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

// 函数的参数名称可以不和interface中定义的一致，type inference甚至可以推断参数的类型
let mySearch: SearchFunc;
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
}

// indexable type
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ['Bob', 'Fred'];
let myStr = myArray[0];

class Animal {
    name = "";
}
class Dog extends Animal {
    breed = "";
}

// 这里会出现类型错误的原因在于JavaScript的索引值只能是string，
// 使用number索引的时候会自动将number转换为string，
// 也就导致TypeScript里number返回的值必须是string返回的值的子类型。
// 而在这里number返回的Animal是string返回的Dog的父类型，所以出错。
interface NotOkay {
    // [x: number]: Animal;
    [x: string]: Dog;
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myStringArray: ReadonlyStringArray = ["Alice", "Bob"];
// myStringArray[2] = "Mallory"; // 因为是readonly，所以值不能更改

// class类型
// class类型只定义类的公开部分，不管类的私有部分

// 一个类implements一个interface的时候，只有类的实例部分会受到类型检查
interface ClockInterface {
    tick(): void;
}

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log('beep beep');
    }
}

let digital = createClock(DigitalClock, 12, 17);

// 拓展接口
// 接口可以拓展继承多个接口，非常棒。
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// TypeScript没有多重继承，所以有些地方需要考虑下。
// 比如防盗门，它是一个有提醒功能的门还是一个具有门功能的提醒设备。
class Door {
    open() { }
    close() { }
}
interface Alertion {
    alert(): void;
}
class AlertionDoor extends Door implements Alertion {
    alert() { }
}

interface ResonseInfo {
    success: boolean;
    message: string;
}

interface ErrorResponseInfo extends ResonseInfo {
    success: false;
}

// 用类型系统就可以将生活中的东西根据特性进行分类，
// 这样描述起来也会相对容易些。

interface HumanOrgan { };

interface Face extends HumanOrgan { }
interface Eye extends HumanOrgan { }
interface Nose extends HumanOrgan { }
interface Penis extends HumanOrgan { }

interface Human {
    face: Face;
    eyes: Eye[];
    nose: Nose;
    penis?: Penis;
}

interface Man extends Human {
    penis: Penis;
}

interface Woman extends Human {
    penis: undefined;
}

let man = <Man>{};
man.penis;
let woman = <Woman>{};
woman.penis;

interface TransgenderFromMan extends Human {
    penis: undefined;
}