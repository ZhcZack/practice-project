var Router = /** @class */ (function () {
    function Router() {
        this.currentUrl = '';
        this.routes = {};
        this.init();
    }
    Router.prototype.init = function () {
        var _this = this;
        this.bindLink();
        window.addEventListener('popstate', function (e) {
            _this.updateView(window.location.pathname);
        });
        window.addEventListener('load', function (e) {
            _this.updateView('/');
        });
    };
    Router.prototype.updateView = function (url) {
        this.currentUrl = url;
        if (this.routes[this.currentUrl]) {
            this.routes[this.currentUrl]();
        }
    };
    Router.prototype.bindLink = function () {
        var _this = this;
        var allLink = document.querySelectorAll('a[data-href]');
        var _loop_1 = function (i) {
            var current = allLink[i];
            current.addEventListener('click', function (e) {
                e.preventDefault();
                var url = current.getAttribute('data-href');
                history.pushState({}, '', url);
                url && _this.updateView(url);
            });
        };
        for (var i = 0; i < allLink.length; i++) {
            _loop_1(i);
        }
    };
    Router.prototype.route = function (path, callback) {
        this.routes[path] = callback;
    };
    return Router;
}());
var router = new Router();
router.route('/', function () {
    document.getElementById('content').innerHTML = 'Home';
});
router.route('/about', function () {
    document.getElementById('content').innerHTML = 'About';
});
router.route('/topic', function () {
    document.getElementById('content').innerHTML = 'Topic';
});
