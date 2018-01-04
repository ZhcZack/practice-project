"use strict";
var l10;
(function (l10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var rows = get('.rows');
        var cols = get('.cols');
        var btn = get('.btn');
        if (!rows || !cols || !btn) {
            return;
        }
        btn.addEventListener('click', function (e) {
            var table = get('table');
            if (table) {
                table.parentElement.removeChild(table);
            }
            var rn = parseInt(rows.value, 10);
            var cn = parseInt(cols.value, 10);
            var tm = new TableMaker(rn, cn, tableCellClick);
            table = tm.make();
            document.body.appendChild(table);
            e.stopPropagation();
        });
    }
    function tableCellClick(number, color) {
        var msg = get('#msg');
        var ns = get('#msg .number');
        var css = get('#msg .color-square');
        var cs = get('#msg .color');
        if (!msg || !ns || !css || !cs) {
            return;
        }
        msg.style.display = 'block';
        ns.textContent = number + '';
        css.style.backgroundColor = color;
        cs.textContent = color;
    }
    var TableMaker = /** @class */ (function () {
        function TableMaker(rows, cols, clickCallback) {
            this.rows = rows;
            this.cols = cols;
            this.clickCallback = clickCallback;
            this.setup();
        }
        TableMaker.prototype.setup = function () {
            this.cellWidth = 25;
            this.cellHeight = 30;
            this.minNumber = 1;
            this.maxNumber = 15;
            this.numberColor = 'white';
        };
        Object.defineProperty(TableMaker.prototype, "randomColor", {
            get: function () {
                return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TableMaker.prototype, "randomNumber", {
            get: function () {
                return Math.floor(Math.random() * 15 + 1);
            },
            enumerable: true,
            configurable: true
        });
        TableMaker.prototype.tableClickEvent = function (e) {
            var target = e.target;
            if (target.nodeName !== 'TD') {
                return;
            }
            // console.log(target)
            // this.clickEventResult.value = Number(target.textContent)
            // this.clickEventResult.color = window.getComputedStyle(target)['background-color']
            var value = Number(target.textContent);
            var color = window.getComputedStyle(target).backgroundColor;
            console.log(this);
            if (this.clickCallback && color) {
                console.log('hi');
                this.clickCallback(value, color);
            }
        };
        TableMaker.prototype.make = function () {
            var table = document.createElement('table');
            // const head = document.createElement('thead')
            var body = document.createElement('tbody');
            for (var i = 0; i < this.rows; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < this.cols; j++) {
                    var cell = document.createElement('td');
                    cell.textContent = this.randomNumber + '';
                    // cell.style.color = this.numberColor
                    cell.style.backgroundColor = this.randomColor;
                    row.appendChild(cell);
                }
                body.appendChild(row);
            }
            // table.appendChild(head)
            table.appendChild(body);
            this.bindTableClick = this.tableClickEvent.bind(this);
            table.addEventListener('click', this.bindTableClick);
            return table;
        };
        return TableMaker;
    }());
})(l10 || (l10 = {}));
//# sourceMappingURL=l10.js.map