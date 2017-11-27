var CustomView;
(function (CustomView) {
    var AddNewList = /** @class */ (function () {
        function AddNewList() {
            this.defaultListName = '无命名清单';
            this.index = -1;
            this.setup();
        }
        AddNewList.prototype.setup = function () {
            var div = document.createElement('div');
            div.textContent = '新建清单';
            div.id = 'add-new-list';
            this.element = div;
        };
        Object.defineProperty(AddNewList.prototype, "elem", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddNewList.prototype, "listName", {
            get: function () {
                this.index++;
                return this.index > 0 ? this.defaultListName + this.index : this.defaultListName;
            },
            enumerable: true,
            configurable: true
        });
        return AddNewList;
    }());
    CustomView.AddNewList = AddNewList;
})(CustomView || (CustomView = {}));
