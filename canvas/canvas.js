var basicOperation = function (ctx) {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
};
var drawShapes = function (ctx) {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
};
var drawPaths = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
    ctx.stroke();
};
var drawLines = function (ctx) {
    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();
    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
};
var fillStyleSample = function (ctx) {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            ctx.fillStyle = "rgb(" + Math.floor(255 - 42.5 * i) + ", " + Math.floor(255 - 42.5 * j) + ", 0)";
            ctx.fillRect(j * 25, i * 25, 25, 25);
        }
    }
};
var strokeStyleSample = function (ctx) {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            ctx.strokeStyle = "rgb(0, " + Math.floor(255 - 42.5 * i) + ", " + Math.floor(255 - 42.5 * j) + ")";
            ctx.beginPath();
            ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
            ctx.stroke();
        }
    }
};
var transparency = function (ctx) {
    // draw background
    ctx.fillStyle = '#FD0';
    ctx.fillRect(0, 0, 75, 75);
    ctx.fillStyle = '#6C0';
    ctx.fillRect(75, 0, 75, 75);
    ctx.fillStyle = '#09F';
    ctx.fillRect(0, 75, 75, 75);
    ctx.fillStyle = '#F30';
    ctx.fillRect(75, 75, 75, 75);
    ctx.fillStyle = '#FFF';
    // set transparency value
    ctx.globalAlpha = 0.2;
    // Draw semi transparent circles
    for (var i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
        ctx.fill();
    }
};
var transparentRgba = function (ctx) {
    // Draw background
    ctx.fillStyle = 'rgb(255, 221, 0)';
    ctx.fillRect(0, 0, 150, 37.5);
    ctx.fillStyle = 'rgb(102, 204, 0)';
    ctx.fillRect(0, 37.5, 150, 37.5);
    ctx.fillStyle = 'rgb(0, 153, 255)';
    ctx.fillRect(0, 75, 150, 37.5);
    ctx.fillStyle = 'rgb(255, 51, 0)';
    ctx.fillRect(0, 112.5, 150, 37.5);
    // Draw semi transparent rectangles
    for (var i = 0; i < 10; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (i + 1) / 10 + ')';
        for (var j = 0; j < 4; j++) {
            ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
        }
    }
};
var lineWidthExample = function (ctx) {
    for (var i = 0; i < 10; i++) {
        ctx.lineWidth = i + 1;
        ctx.beginPath();
        ctx.moveTo(5 + i * 14, 5);
        ctx.lineTo(5 + i * 14, 140);
        ctx.stroke();
    }
};
var lineCapExample = function (ctx) {
    var lineCap = ['butt', 'round', 'square'];
    // 创建路径
    ctx.strokeStyle = '#09f';
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(140, 10);
    ctx.moveTo(10, 140);
    ctx.lineTo(140, 140);
    ctx.stroke();
    // 画线条
    ctx.strokeStyle = 'black';
    for (var i = 0; i < lineCap.length; i++) {
        ctx.lineWidth = 15;
        ctx.lineCap = lineCap[i];
        ctx.beginPath();
        ctx.moveTo(25 + i * 50, 10);
        ctx.lineTo(25 + i * 50, 140);
        ctx.stroke();
    }
};
var lineJoinExample = function (ctx) {
    var lineJoin = ['round', 'bevel', 'miter'];
    ctx.lineWidth = 10;
    for (var i = 0; i < lineJoin.length; i++) {
        ctx.lineJoin = lineJoin[i];
        ctx.beginPath();
        ctx.moveTo(-5, 5 + i * 40);
        ctx.lineTo(35, 45 + i * 40);
        ctx.lineTo(75, 5 + i * 40);
        ctx.lineTo(115, 45 + i * 40);
        ctx.lineTo(155, 5 + i * 40);
        ctx.stroke();
    }
};
var myTest = function (ctx) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(10.5, 0);
    ctx.lineTo(10.5, 100);
    ctx.stroke();
};
var linearGradientExample = function (ctx) {
    // Create gradients
    var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
    lingrad.addColorStop(0, '#00ABEB');
    lingrad.addColorStop(0.5, '#fff');
    lingrad.addColorStop(0.5, '#26C000');
    lingrad.addColorStop(1, '#fff');
    // assign gradients to fill and stroke styles
    ctx.fillStyle = lingrad;
    // draw shapes
    ctx.fillRect(10, 10, 130, 130);
    ctx.strokeRect(50, 50, 50, 50);
};
var main = function (event) {
    var canvas = document.querySelector('#canvas');
    if (!canvas) {
        return;
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    // basicOperation(ctx)
    // drawShapes(ctx)
    // drawPaths(ctx)
    // drawLines(ctx)
    // fillStyleSample(ctx)
    // strokeStyleSample(ctx)
    // transparency(ctx)
    // transparentRgba(ctx)
    // lineWidthExample(ctx)
    // lineCapExample(ctx)
    // lineJoinExample(ctx)
    linearGradientExample(ctx);
};
window.addEventListener('load', main);
//# sourceMappingURL=canvas.js.map