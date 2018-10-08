"use strict";
function get(sel) {
    return document.querySelector(sel);
}
function getAll(sel) {
    return document.querySelectorAll(sel);
}
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var textarea = get('#text-log');
    textarea.value += '\n' + args.join(' ');
}
var fps = 30;
function loadLevel(game, n, blocks) {
    if (n > levels.length) {
        return;
    }
    n = n - 1;
    var level = levels[n];
    blocks.length = 0;
    for (var i = 0; i < level.length; i++) {
        var position = level[i];
        var block = new Block(game, position);
        blocks.push(block);
    }
}
get('#clear-log').addEventListener('click', function (e) {
    var textarea = get('#text-log');
    textarea.value = '';
});
//# sourceMappingURL=util.js.map