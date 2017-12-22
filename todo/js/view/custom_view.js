// 自定义“视图”
var CustomView;
(function (CustomView) {
    // “新建清单”按钮
    var CustomNewList = /** @class */ (function () {
        function CustomNewList() {
            this.defaultListName = '无命名清单';
            this.index = -1;
            this.setup();
            this.bindEvents();
        }
        CustomNewList.prototype.setup = function () {
            var div = document.createElement('div');
            div.textContent = '新建清单';
            div.id = 'add-new-list';
            this.element = div;
        };
        CustomNewList.prototype.bindEvents = function () {
            var _this = this;
            this.element.addEventListener('click', function (event) {
                event.stopPropagation();
                if (_this.delegate) {
                    _this.delegate.newListClicked(_this);
                }
            });
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
    // “添加待办事项”按钮
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
                // log('hi')
                if (event.key === 'Control' || event.key === 'Shift') {
                    return;
                }
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
                _this.normalMode();
                if (_this.delegate) {
                    _this.delegate.addButtonClicked(value);
                }
            });
        };
        return CustomNewItem;
    }());
    CustomView.CustomNewItem = CustomNewItem;
    // 自定义checkbox
    var CustomCheckbox = /** @class */ (function () {
        function CustomCheckbox() {
            this.isChecked = false;
            this.delegate = null;
            this.setup();
        }
        CustomCheckbox.prototype.setup = function () {
            var div = document.createElement('div');
            div.classList.add('custom-checkbox');
            div.textContent = '√';
            this.element = div;
            this.bindEvents();
        };
        Object.defineProperty(CustomCheckbox.prototype, "checked", {
            get: function () {
                return this.isChecked;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomCheckbox.prototype, "elem", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        CustomCheckbox.prototype.switchChecked = function () {
            this.isChecked = true;
            this.element.classList.add('checked');
        };
        CustomCheckbox.prototype.toggleStatus = function () {
            if (this.isChecked) {
                this.element.classList.add('checked');
            }
            else {
                this.element.classList.remove('checked');
            }
        };
        CustomCheckbox.prototype.bindEvents = function () {
            var _this = this;
            this.element.addEventListener('click', function (event) {
                _this.isChecked = !_this.isChecked;
                _this.toggleStatus();
                event.stopPropagation();
                if (_this.delegate) {
                    _this.delegate.checkboxClicked(_this);
                }
            });
        };
        return CustomCheckbox;
    }());
    CustomView.CustomCheckbox = CustomCheckbox;
})(CustomView || (CustomView = {}));
