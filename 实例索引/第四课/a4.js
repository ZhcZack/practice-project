var a4;
(function (a4) {
    function main() {
        alert(sum(1, 2, 3, 4, 5));
    }
    function sum() {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        var result = 0;
        for (var i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    }
    main();
})(a4 || (a4 = {}));
//# sourceMappingURL=a4.js.map