namespace TypeInference {
    // 激动把类型推断number|null
    let x = [0, 1, null];

    window.onmousedown = function (mouseEvent) {
        mouseEvent.button
    }

    class Animal { }
    class Rhino extends Animal { }
    class Elephant extends Animal { }
    class Snake extends Animal { }

    // 一般情况下推断出的类型是复合类型（union type）
    let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
}