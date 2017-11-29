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
    var CustomNewItem = /** @class */ (function () {
        function CustomNewItem() {
            this.setup();
            this.bindEvents();
        }
        Object.defineProperty(CustomNewItem.prototype, "elem", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        CustomNewItem.prototype.setup = function () {
            this.element = document.createElement('div');
            this.closeButton = document.createElement('span');
            this.addButton = document.createElement('span');
            this.inputArea = document.createElement('input');
            this.element.id = 'add-new-item';
            this.closeButton.id = 'close-button';
            this.addButton.id = 'add-button';
            this.inputArea.id = 'input-area';
            this.closeButton.textContent = 'X';
            this.closeButton.classList.add('hide');
            this.addButton.textContent = '添加';
            this.addButton.classList.add('hide');
            this.inputArea.placeholder = '添加待办事项';
            this.element.appendChild(this.inputArea);
            this.element.appendChild(this.closeButton);
            this.element.appendChild(this.addButton);
        };
        CustomNewItem.prototype.inputMode = function () {
            this.inputArea.focus();
            this.closeButton.classList.remove('hide');
            this.addButton.classList.remove('hide');
        };
        CustomNewItem.prototype.normalMode = function () {
            this.inputArea.value = '';
            this.inputArea.blur();
            this.closeButton.classList.add('hide');
            this.addButton.classList.add('hide');
        };
        CustomNewItem.prototype.bindEvents = function () {
            var _this = this;
            this.inputArea.addEventListener('keyup', function (event) {
                log('hi');
                var target = event.target;
                var value = target.value;
                if (value !== '') {
                    _this.inputMode();
                }
                else {
                    _this.normalMode();
                }
            });
            this.closeButton.addEventListener('click', function (event) {
                _this.normalMode();
            });
            this.addButton.addEventListener('click', function (event) {
                var value = _this.inputArea.value;
                _this.delegate.addNewItem(value);
                // 重复代码，后面再改
                _this.normalMode();
            });
        };
        return CustomNewItem;
    }());
    CustomView.CustomNewItem = CustomNewItem;
})(CustomView || (CustomView = {}));
