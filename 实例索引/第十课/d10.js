"use strict";
var d10;
(function (d10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    // first try to use MVC in code
    // this is the M?
    /**
     * rely `images` property stored in object to represent images' loading status
     *
     * images:
     *  top: distance between image's top border to window's top edge
     *  bottom: distance between image's bottom border to window's top edge
     *  load: boolean value represent if image should be loaded
     */
    var LazyLoadImage = /** @class */ (function () {
        function LazyLoadImage(id) {
            this.id = id;
            this.setup();
        }
        LazyLoadImage.prototype.setup = function () {
            var imgs = getAll(this.id + ' img');
            if (imgs.length < 1) {
                return;
            }
            this.numberOfImages = imgs.length;
            this.images = [];
            var scrollTop = document.documentElement.scrollTop;
            for (var i = 0; i < this.numberOfImages; i++) {
                var rect = imgs[i].getBoundingClientRect();
                this.images.push({
                    top: rect.top + scrollTop,
                    bottom: rect.bottom + scrollTop,
                    load: false,
                });
            }
        };
        LazyLoadImage.prototype.load = function () {
            var scrollTop = document.documentElement.scrollTop;
            var height = window.innerHeight;
            for (var i = 0; i < this.images.length; i++) {
                var img = this.images[i];
                if (img.top > scrollTop && img.bottom < scrollTop + height) {
                    img.load = true;
                }
            }
        };
        // computed property
        // return value is an `Array`, represents each img's status--should load or should not load
        LazyLoadImage.prototype.tobeLoad = function () {
            this.load();
            var result = [];
            var imagesAllLoaded = true;
            for (var i = 0; i < this.images.length; i++) {
                imagesAllLoaded = this.images[i].load;
                result.push(this.images[i].load);
            }
            return result;
        };
        return LazyLoadImage;
    }());
    window.addEventListener('load', main);
    var loader = new LazyLoadImage('.imglist');
    function main() {
        startUp();
        window.addEventListener('scroll', refreshImageStatus);
    }
    // some method like `viewDidLoad` is iOS
    function startUp() {
        var imgs = getAll('.imglist img');
        if (imgs.length < 1) {
            return;
        }
        var baseHref = 'http://www.fgm.cc/learn/lesson10/img/lazy/';
        var lazyHref = baseHref + 'loading.gif';
        var result = loader.tobeLoad();
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].src = lazyHref;
        }
        refreshImageStatus();
    }
    function refreshImageStatus() {
        var baseHref = 'http://www.fgm.cc/learn/lesson10/img/lazy/';
        var imgs = getAll('.imglist img');
        if (imgs.length < 1) {
            return;
        }
        var result = loader.tobeLoad();
        for (var i = 0; i < result.length; i++) {
            if (!imgs[i].classList.contains('loaded') && result[i]) {
                // img should load
                imgs[i].src = baseHref + (i + 1) + '.jpg';
                imgs[i].classList.add('loaded');
            }
        }
    }
})(d10 || (d10 = {}));
//# sourceMappingURL=d10.js.map