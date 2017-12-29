var h4;
(function (h4) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        bind();
    }
    function bind() {
        var stars = getAll('#star li');
        bindStars(stars);
    }
    function bindStars(stars) {
        var p = get('#star p');
        var ul = get("#star ul");
        var span = getAll('#star span')[1];
        if (!p || !ul || !span) {
            return;
        }
        var score = 0;
        var msgs = ["很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
            "不满意|部分有破损，与卖家描述的不符，不满意",
            "一般|质量一般，没有卖家描述的那么好",
            "满意|质量不错，与卖家描述的基本一致，还是挺满意的",
            "非常满意|质量非常好，与卖家描述的完全一致，非常满意"];
        var _loop_1 = function (i) {
            stars[i].addEventListener('mouseover', function (e) {
                var temp = Number(stars[i].querySelector('a').textContent);
                p.style.display = 'block';
                p.style.left = ul.offsetLeft + (temp * stars[i].offsetWidth) - 104 + 'px';
                var words = msgs[temp - 1].split('|');
                p.innerHTML = '<em><b>' + temp + '</b>分 ' + words[0] + '</em>' + words[1];
                showPoint(stars, temp);
            });
            stars[i].addEventListener('mouseout', function (e) {
                showPoint(stars, score);
                p.style.display = 'none';
            });
            stars[i].addEventListener('click', function (e) {
                score = Number(stars[i].querySelector('a').textContent);
                var words = msgs[score - 1].split('|');
                span.innerHTML = '<strong>' + score + '分</strong> (' + words[1] + ')';
            });
        };
        for (var i = 0; i < stars.length; i++) {
            _loop_1(i);
        }
    }
    function showPoint(stars, point) {
        for (var i = 0; i < stars.length; i++) {
            var score = Number(stars[i].querySelector('a').textContent);
            if (score <= point) {
                stars[i].classList.add('on');
            }
            else {
                stars[i].classList.remove('on');
            }
        }
    }
    main();
})(h4 || (h4 = {}));
//# sourceMappingURL=h4.js.map