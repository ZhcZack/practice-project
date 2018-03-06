namespace TypeCompatibily {
    interface Named {
        name: string;
    }

    class Person {
        name = '';
    }
    let p: Named = new Person();
}