const log = console.log.bind(console);

class Hello {
    hello = () => {
        return 'hello';
    }
    static hi() {
        return 'hi';
    }
}

class Hi {
    hello() {
        return 'hello';
    }
}

class SubHello extends Hello {

}