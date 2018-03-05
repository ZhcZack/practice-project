namespace Generic {
    function identity<T>(arg: T): T {
        return arg;
    }

    interface Lengthwise {
        length: number;
    }

    // 泛型约束
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }


    // 泛型类型
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }

    let myIdentity: GenericIdentityFn = identity;

    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, 'a');
    // getProperty(x, 'm'); // x没有'm'这个索引值

    let y = { a: 1, b: '2', c: false, d: [] };
    getProperty(y, 'a');
    let yc = getProperty(y, 'c');
}