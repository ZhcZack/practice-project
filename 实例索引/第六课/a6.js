var a6;
(function (a6) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function weiboPostAction() {
        var button = get('#wb .wb-post-button');
        var content = get('#wb .wb-content');
        var numbers = get('#wb .wb-post-numbers');
        if (!button || !content || !numbers) {
            return;
        }
        var warning = numbers.previousElementSibling;
        if (!warning) {
            return;
        }
        content.addEventListener('keyup', function (e) {
            // log('hi')
            var length = content.value.length;
            if (length <= 140) {
                numbers.classList.remove('wb-post-numbers-warning');
                numbers.textContent = 140 - length + '';
                warning.textContent = '还能输入';
            }
            else {
                numbers.classList.add('wb-post-numbers-warning');
                numbers.textContent = length - 140 + '';
                warning.textContent = '已超出';
            }
        });
        button.addEventListener('click', postWeibo);
    }
    function postWeibo(e) {
        var b = e.target;
        var username = get('#wb .user .username');
        var image = get('#wb .user .userimage .current img');
        var content = get('#wb .wb-content');
        var numbers = get('#wb .wb-post-numbers');
        if (!username || !image || !content || !numbers) {
            return;
        }
        var warning = numbers.previousElementSibling;
        if (!warning) {
            return;
        }
        var result = judgeQualifiedWeibo(username, content);
        if (!result) {
            return;
        }
        var href = image.src;
        var text = content.value;
        var name = username.value;
        postWeiboAnimated(href, name, text);
    }
    function postWeiboAnimated(src, name, text) {
        var temp = get('#wb .wb-display-area .wb-display-template');
        if (!temp) {
            return;
        }
        var wb = temp.cloneNode(true);
        var list = temp.parentNode;
        if (!list) {
            return;
        }
        var target = list.firstElementChild;
        updateWeiboContent(wb, src, name, text);
        wb.classList.remove('wb-display-template');
        list.insertBefore(wb, target);
        var opacityTimer = 0;
        var heightTimer = 0;
        var h = wb.offsetHeight - 20; // box-sizing: content-box; 这就是内容盒模型的弊端，妈的
        var o = 0;
        wb.style.height = '0';
        wb.style.opacity = '0';
        heightTimer = setInterval(function () {
            wb.style.height = wb.offsetHeight - 20 + 2 + 'px';
            if (wb.offsetHeight >= h + 20) {
                wb.style.height = h + 'px';
                clearInterval(heightTimer);
                opacityTimer = setInterval(function () {
                    wb.style.opacity = (o += 0.1) + '';
                    if (o >= 1) {
                        wb.style.opacity = '1';
                        clearInterval(opacityTimer);
                        weiboDeleteAction();
                        clearUserInput();
                    }
                }, 1000 / 60);
            }
        }, 1000 / 60);
    }
    function updateWeiboContent(weibo, src, name, text) {
        var wb = weibo;
        var image = wb.querySelector('img');
        var username = wb.querySelector('.username');
        var content = wb.querySelector('.content');
        var time = wb.querySelector('.wb-posttime');
        if (!image || !username || !content || !time) {
            return;
        }
        var datetime = new Date();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minute = datetime.getMinutes();
        // log(month + '' + date + '' + hour + '' + minute)
        image.src = src;
        username.textContent = name;
        content.textContent = ': ' + text;
        time.textContent = ((month <= 9) ? ('0' + month) : month) + '月' +
            ((date < 10) ? ('0' + date) : date) + '日 ' +
            ((hour < 10) ? ('0' + hour) : hour) + ':' +
            ((minute < 10) ? ('0' + minute) : minute);
    }
    function judgeQualifiedWeibo(username, content) {
        var name = username.value;
        var text = content.value;
        var rule = /^[a-zA-Z]{1}[0-9a-zA-Z\_]{1,7}$/;
        if (!rule.test(name)) {
            alert('姓名由字母、数字和下划线组成，长度不能超过八且只能以字母开头！');
            return false;
        }
        if (text.length > 140) {
            alert('你输入的内容已超过限制，请检查！');
            return false;
        }
        return true;
    }
    function weiboDeleteAction() {
        var buttons = getAll('#wb .wb-delete-button');
        if (!buttons) {
            return;
        }
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', deleteWeibo);
        }
    }
    function deleteWeibo(e) {
        var button = e.target;
        var wb = button.closest('li');
        if (wb) {
            deleteWeiboAnimated(wb);
        }
        e.stopPropagation();
    }
    function deleteWeiboAnimated(weibo) {
        var wb = weibo;
        var h = weibo.offsetHeight - 20;
        var style = window.getComputedStyle(wb);
        var opacityTimer = 0;
        var heightTimer = 0;
        opacityTimer = setInterval(function () {
            wb.style.opacity = Number(style.opacity) - 0.05 + '';
            if (Number(style.opacity) <= 0) {
                clearInterval(opacityTimer);
                heightTimer = setInterval(function () {
                    h -= 4;
                    wb.style.height = h + 'px';
                    if (h <= 0) {
                        clearInterval(heightTimer);
                        if (wb.parentNode) {
                            wb.parentNode.removeChild(wb);
                        }
                    }
                }, 1000 / 60);
            }
        }, 1000 / 60);
    }
    function chooseUserImage() {
        var images = get('#wb .userimage');
        if (!images) {
            return;
        }
        images.addEventListener('click', function (e) {
            var target = e.target;
            var name = target.nodeName;
            if (name !== 'IMG') {
            }
            var parent = target.parentNode;
            if (parent) {
                target = target.parentNode;
            }
            var lis = getAll('#wb .userimage li');
            for (var i = 0; i < lis.length; i++) {
                var element = lis[i];
                element.classList.remove('current');
            }
            target.classList.add('current');
            e.stopPropagation();
        });
    }
    function clearUserInput() {
        var username = get('#wb .user .username');
        var content = get('#wb .wb-content');
        var numbers = get('#wb .wb-post-numbers');
        if (!username || !content || !numbers) {
            return;
        }
        username.value = '';
        content.value = '';
        numbers.textContent = '140';
    }
    function main() {
        chooseUserImage();
        weiboPostAction();
        weiboDeleteAction();
        clearUserInput();
    }
    main();
})(a6 || (a6 = {}));
//# sourceMappingURL=a6.js.map