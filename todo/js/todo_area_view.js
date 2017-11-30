var TodoAreaView = /** @class */ (function () {
    function TodoAreaView() {
        this.element = get('#areaview');
        this.nameLabel = get('#areaview .name');
        this.contentView = get('#areaview-content ul');
        this.customNewItem = new CustomView.CustomNewItem();
        this.customNewItem.delegate = this;
        this.checkboxList = [];
        this.setup();
    }
    TodoAreaView.prototype.setup = function () {
        // very bad hard code
        this.modelName = '我的一天';
        this.connectModel('我的一天');
        this.bindEvents();
        this.element.appendChild(this.customNewItem.elem);
    };
    TodoAreaView.prototype.bindEvents = function () {
        var _this = this;
        this.contentView.addEventListener('click', function (event) {
            var target = event.target;
            // 点击的是checkbox
            if (target.classList.contains('custom-checkbox')) {
                var item = target.nextElementSibling.textContent;
                _this.toggleItemStatus(item);
            }
            else if (target.classList.contains('todo-item-content')) {
                var title = target.textContent;
                var item = _this.itemModel.getItem(title);
                if (!item) {
                    _this.delegate.toggleDetailView(item);
                }
            }
        });
    };
    TodoAreaView.prototype.toggleItemStatus = function (item) {
        this.itemModel.toggle(item);
    };
    TodoAreaView.prototype.connectModel = function (name) {
        this.itemModel = new TodoItemModel(name);
        this.updateUI();
    };
    Object.defineProperty(TodoAreaView.prototype, "name", {
        set: function (value) {
            this.modelName = value;
            this.connectModel(value);
        },
        enumerable: true,
        configurable: true
    });
    TodoAreaView.prototype.updateUI = function () {
        this.nameLabel.textContent = this.modelName;
        this.contentView.innerHTML = '';
        this.checkboxList = [];
        var items = this.itemModel.items;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var li = document.createElement('li');
            li.classList.add('todo-item');
            var span = document.createElement('span');
            span.classList.add('todo-item-content');
            span.textContent = item.itemName;
            var check = new CustomView.CustomCheckbox();
            this.checkboxList.push(check);
            li.appendChild(check.elem);
            li.appendChild(span);
            if (item.isDone) {
                check.switchChecked();
            }
            this.contentView.appendChild(li);
        }
    };
    // delegate methods
    TodoAreaView.prototype.addNewItem = function (title) {
        this.itemModel.add(title);
        this.updateUI();
    };
    return TodoAreaView;
}());
