"use strict";
var e3;
(function (e3) {
    function main() {
        var times = 0;
        var button = document.querySelector('button');
        if (button === null) {
            return;
        }
        window.addEventListener('load', function (e) {
            button.textContent = '' + times;
        });
        button.addEventListener('click', function (e) {
            times++;
            this.textContent = '' + times;
            alert(times);
        });
    }
    main();
})(e3 || (e3 = {}));
//# sourceMappingURL=e3.js.map