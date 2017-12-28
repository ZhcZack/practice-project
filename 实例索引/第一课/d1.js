var d1;
(function (d1) {
    var colors = document.querySelectorAll('#skins span');
    var body = document.body;
    var ul = document.querySelector('nav ul');
    var red = colors[0];
    red.addEventListener('click', function (e) {
        body.className = 'redType';
        if (ul) {
            ul.className = 'redType';
        }
    });
    var green = colors[1];
    green.addEventListener('click', function (e) {
        body.className = 'greenType';
        if (ul) {
            ul.className = 'greenType';
        }
    });
    var black = colors[2];
    black.addEventListener('click', function (e) {
        body.className = 'blackType';
        if (ul) {
            ul.className = 'blackType';
        }
    });
})(d1 || (d1 = {}));
//# sourceMappingURL=d1.js.map