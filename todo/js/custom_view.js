var CustomView;
(function (CustomView) {
    var CustomNewList = /** @class */ (function () {
        function CustomNewList() {
            this.defaultListName = '无命名清单';
            this.index = -1;
            this.setup();
        }
        CustomNewList.prototype.setup = function () {
            var div = document.createElement('div');
            div.textContent = '新建清单';
            div.id = 'add-new-list';
            this.element = div;
        };
        Object.defineProperty(CustomNewList.prototype, "elem", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomNewList.prototype, "listName", {
            get: function () {
                this.index++;
                return this.index > 0 ? this.defaultListName + this.index : this.defaultListName;
            },
            enumerable: true,
            configurable: true
        });
        return CustomNewList;
    }());
    CustomView.CustomNewList = CustomNewList;
})(CustomView || (CustomView = {}));
