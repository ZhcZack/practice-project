"use strict";
var a7;
(function (a7) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var marks = getAll('.mark');
        var buttons = getAll('.button');
        var index = 0;
        var loadingSrc = 'http://images4.alphacoders.com/288/288276.png';
        var links = [
            'http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg',
            'http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg',
            'http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg'
        ];
        if (marks.length < 1 || buttons.length < 1) {
            return;
        }
        var _loop_1 = function (i) {
            marks[i].addEventListener('mouseover', function (e) {
                buttons[i].classList.add('button-display');
            });
            marks[i].addEventListener('mouseout', function (e) {
                buttons[i].classList.remove('button-display');
            });
        };
        for (var i = 0; i < marks.length; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            buttons[i].addEventListener('mouseover', function (e) {
                buttons[i].classList.add('button-display');
            });
        };
        for (var i = 0; i < buttons.length; i++) {
            _loop_2(i);
        }
        buttons[0].addEventListener('click', function (e) {
            // const container = get('.container')
            index--;
            if (index < 0) {
                index = 0;
                alert('这是第一张图片！');
                return;
            }
            loadImage(index);
            displayTitle();
            e.stopPropagation();
        });
        buttons[1].addEventListener('click', function (e) {
            // var container = get('.container')
            index++;
            if (index > links.length - 1) {
                index = links.length - 1;
                alert('这是最后一张图片！');
                return;
            }
            displayTitle();
            loadImage(index);
            e.stopPropagation();
        });
        loadImage(index);
        displayTitle();
    }
    function loadImage(index) {
        var img = get('.container .image');
        var loadingSrc = 'http://images4.alphacoders.com/288/288276.png';
        var links = [
            'http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg',
            'http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg',
            'http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg'
        ];
        if (!img) {
            return;
        }
        img.src = loadingSrc;
        var parent = img.parentElement;
        var image = document.createElement('img');
        image.classList.add('image');
        var temp = new Image();
        temp.src = links[index];
        temp.addEventListener('load', function (e) {
            image.src = temp.src;
            if (parent) {
                parent.replaceChild(image, img);
            }
        });
    }
    function displayTitle() {
        var title = get('.container .title');
        if (!title) {
            return;
        }
        title.classList.remove('title-display');
        var temp = title.cloneNode(true);
        title.parentElement.replaceChild(temp, title);
        setTimeout(function () {
            temp.classList.add('title-display');
        }, 100);
    }
    main();
})(a7 || (a7 = {}));
//# sourceMappingURL=a7.js.map