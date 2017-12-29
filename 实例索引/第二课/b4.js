var b4;
(function (b4) {
    var button = document.querySelector('button');
    if (button !== null) {
        button.addEventListener('click', function (e) {
            createCover();
        });
    }
    function createCover() {
        var back = document.createElement('div');
        back.classList.add('cover-back');
        var x = window.innerWidth;
        var y = window.innerHeight;
        back.style.width = x + 'px';
        back.style.height = y + 'px';
        var dialog = createDialog();
        dialog.querySelector('.cover-close-button').addEventListener('click', function (e) {
            if (back.parentNode !== null) {
                back.parentNode.removeChild(back);
            }
        });
        back.appendChild(dialog);
        if (button !== null) {
            insertAfter(back, button);
        }
    }
    function createDialog() {
        var d = document.createElement('div');
        d.classList.add('cover-dialog');
        var t = document.createElement('div');
        t.classList.add('cover-dialog-title');
        var b = document.createElement('span');
        b.classList.add('cover-close-button');
        b.textContent = 'x';
        var c = document.createElement('div');
        c.classList.add('cover-dialog-content');
        t.appendChild(b);
        d.appendChild(t);
        d.appendChild(c);
        return d;
    }
    function insertAfter(newNode, targetNode) {
        var after = targetNode.nextElementSibling;
        var parent = targetNode.parentNode;
        if (parent === null) {
            return;
        }
        if (!after) {
            parent.appendChild(newNode);
        }
        else {
            parent.insertBefore(newNode, after);
        }
    }
})(b4 || (b4 = {}));
//# sourceMappingURL=b4.js.map