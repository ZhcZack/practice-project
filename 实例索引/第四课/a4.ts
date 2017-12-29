namespace a4 {
    function main() {
        alert(sum(1, 2, 3, 4, 5))
    }

    function sum(...numbers: number[]) {
        var result = 0
        for (var i = 0; i < arguments.length; i++) {
            result += arguments[i]
        }
        return result
    }

    main()

}