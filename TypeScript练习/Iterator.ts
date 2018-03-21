namespace IIterator {

    // for...of
    let someArray = [1, 'string', false];

    for (let entry of someArray) {
        console.log(entry);
    }

    // for...in迭代的是索引，for...of是值
    let list = [4, 5, 6];
    for (let i in list) {
        console.log(i);
    }
    for (let i of list) {
        console.log(i);
    }

    // es2015中加入了Symbol.iterator，所以for...of可以迭代其中的元素，for...in不行
    let pets = new Set(['cat', 'dog', 'hamster']);
    // pets['species'] = 'mammals';

    // for (let pet of pets) {
    //     console.log(pet);
    // }

    // 编译到es5的时候for...of只能用于数组；编译到es6可以正常使用
}