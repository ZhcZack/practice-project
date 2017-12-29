var b7;
(function (b7) {
    var button = document.querySelector('button');
    var dialog = document.querySelector('#dialog');
    var close = null;
    if (dialog !== null) {
        close = dialog.querySelector('.close');
    }
    function toggleDialog() {
        if (dialog === null) {
            return;
        }
        if (dialog.classList.contains('display')) {
            dialog.classList.remove('display');
        }
        else {
            dialog.classList.add('display');
        }
    }
    if (button !== null) {
        button.addEventListener('click', function (e) {
            var rect = button.getBoundingClientRect();
            var x = rect.left;
            var y = rect.bottom + 10;
            toggleDialog();
            if (dialog !== null) {
                dialog.style.top = y + 'px';
                dialog.style.left = x + 'px';
            }
        });
    }
    if (close !== null) {
        close.addEventListener('click', function (e) {
            toggleDialog();
        });
    }
})(b7 || (b7 = {}));
//# sourceMappingURL=b7.js.map