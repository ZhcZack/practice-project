"use strict";
var c8;
(function (c8) {
    window.addEventListener('load', function () {
        __main();
    });
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    var Draggable = /** @class */ (function () {
        function Draggable(identifier) {
            this.identifier = identifier;
            this.identifier = identifier;
            this.setup();
        }
        Draggable.prototype.setup = function () {
            this.element = get(this.identifier);
            if (!this.element) {
                return;
            }
            this.element.setAttribute('draggable', 'true');
            this.dragEvents();
        };
        Draggable.prototype.dragEvents = function () {
            if (!this.element) {
                return;
            }
            this.element.addEventListener('dragstart', function (e) {
                e.dataTransfer.dropEffect = 'move';
            });
            this.element.addEventListener('dragend', function (e) {
                log(e.dataTransfer.dropEffect);
            });
        };
        return Draggable;
    }());
    var Droppable = /** @class */ (function () {
        function Droppable(identifier) {
            this.identifier = identifier;
            this.identifier = identifier;
            this.setup();
        }
        Droppable.prototype.setup = function () {
            this.element = get(this.identifier);
            if (!this.element) {
                return;
            }
            this.dropEvents();
        };
        Droppable.prototype.dropEvents = function () {
            if (!this.element) {
                return;
            }
            this.element.addEventListener('dragover', function (e) {
                e.stopPropagation();
                e.dataTransfer.dropEffect = 'move';
            });
            this.element.addEventListener('drop', function (e) {
                e.stopPropagation();
            });
        };
        return Droppable;
    }());
    function main() {
        var drag = new Draggable('.drag');
    }
    function __main() {
        var drag = get('.drag');
        if (!drag) {
            return;
        }
        dragAndDrop(drag);
        titleButtonActions();
        resizeActions();
    }
    function resizeActions() {
        var isResizing = false;
        var drag = get('.drag');
        var top = get('.resize-top');
        if (!drag || !top) {
            return;
        }
        var startX = 0;
        var startY = 0;
        var minWidth = 400;
        var maxWidth = window.innerWidth;
        var minHeight = drag.offsetHeight;
        var maxHeight = window.innerHeight;
        // TODO: 这里是我想多了
        top.addEventListener('mousedown', function (e) {
            isResizing = true;
            startY = e.clientY;
            // top.setCapture()
            e.stopPropagation();
        });
        top.addEventListener('mouseup', function (e) {
            isResizing = false;
            // this.releaseCapture()
            e.stopPropagation();
        });
        top.addEventListener('mouseout', function (e) {
            isResizing = false;
            e.stopPropagation();
        });
        top.addEventListener('mousemove', function (e) {
            if (!isResizing) {
                return;
            }
            var diff = e.clientY - startY;
            startY = e.clientY;
            if (diff > 0) {
                if (drag.offsetHeight <= minHeight) {
                    drag.style.height = minHeight + 'px';
                }
                else {
                    drag.style.height = drag.offsetHeight - diff + 'px';
                    drag.style.top = drag.offsetTop + diff + 'px';
                }
            }
            else {
                if (drag.offsetHeight >= maxHeight) {
                    drag.style.height = maxHeight + 'px';
                }
                else {
                    drag.style.height = drag.offsetHeight - diff + 'px';
                    drag.style.top = drag.offsetTop + diff + 'px';
                }
            }
        });
    }
    function titleButtonActions() {
        var drag = get('.drag');
        var buttons = getAll('.title-buttons span');
        if (!drag || buttons.length < 1) {
            return;
        }
        var minsize = buttons[0];
        var maxsize = buttons[1];
        var close = buttons[2];
        var t;
        var dragInMaxSize = false;
        minsize.addEventListener('click', function (e) {
            t = document.createElement('div');
            t.classList.add('min');
            document.body.appendChild(t);
            drag.style.display = 'none';
            t.addEventListener('click', function (e) {
                t.parentElement.removeChild(t);
                drag.style.display = 'block';
                e.stopPropagation();
            });
            e.stopPropagation();
        });
        maxsize.addEventListener('click', function (e) {
            if (dragInMaxSize) {
                drag.style.width = '400px';
                drag.style.height = 'auto';
                drag.style.top = '100px';
                drag.style.left = '100px';
                dragInMaxSize = false;
            }
            else {
                drag.style.width = window.innerWidth + 'px';
                drag.style.height = window.innerHeight + 'px';
                drag.style.left = '0';
                drag.style.top = '0';
                dragInMaxSize = true;
            }
            e.stopPropagation();
        });
        close.addEventListener('click', function (e) {
            t = document.createElement('div');
            t.classList.add('min');
            document.body.appendChild(t);
            drag.style.display = 'none';
            t.addEventListener('click', function (e) {
                t.parentElement.removeChild(t);
                drag.style.display = 'block';
                e.stopPropagation();
            });
            e.stopPropagation();
        });
    }
    function dragAndDrop(item) {
        var isDrag = false;
        var dx = 0;
        var dy = 0;
        item.addEventListener('mousedown', function (e) {
            isDrag = true;
            dx = e.clientX - this.offsetLeft;
            dy = e.clientY - this.offsetTop;
            // this.setCapture()
        });
        item.addEventListener('mouseup', function (e) {
            isDrag = false;
            // this.releaseCapture()
            e.stopPropagation();
        });
        item.addEventListener('mousemove', function (e) {
            if (!isDrag) {
                return;
            }
            this.style.left = e.clientX - dx + 'px';
            this.style.top = e.clientY - dy + 'px';
            dragWithLimits();
        });
    }
    function dragWithLimits() {
        var drag = get('.drag');
        if (!drag) {
            return;
        }
        if (drag.offsetLeft <= 0) {
            drag.style.left = '0';
        }
        else if (drag.offsetLeft + drag.offsetWidth >= window.innerWidth) {
            drag.style.left = window.innerWidth - drag.offsetWidth + 'px';
        }
        if (drag.offsetTop <= 0) {
            drag.style.top = '0';
        }
        else if (drag.offsetTop + drag.offsetHeight >= window.innerHeight) {
            drag.style.top = window.innerHeight - drag.offsetHeight + 'px';
        }
    }
})(c8 || (c8 = {}));
//# sourceMappingURL=c8.js.map