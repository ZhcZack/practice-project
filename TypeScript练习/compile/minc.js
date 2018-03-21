"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var log = console.log.bind(console);
var Hello = /** @class */ (function () {
    function Hello() {
        this.hello = function () {
            return 'hello';
        };
    }
    Hello.hi = function () {
        return 'hi';
    };
    return Hello;
}());
var Hi = /** @class */ (function () {
    function Hi() {
    }
    Hi.prototype.hello = function () {
        return 'hello';
    };
    return Hi;
}());
var SubHello = /** @class */ (function (_super) {
    __extends(SubHello, _super);
    function SubHello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SubHello;
}(Hello));
var h1 = Hello();
var h2 = new Hello();
log(h1.hello());
log(h2.hello());
