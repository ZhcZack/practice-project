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
    Object.defineProperty(TodoAreaView.prototype, "name", {
        set: function (value) {
            this.modelName = value;
            this.connectModel(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoAreaView.prototype, "numberOfItems", {
        get: function () {
            return this.itemModel.numberOfItems;
        },
        enumerable: true,
        configurable: true
    });
    // private methods
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
            // log(target);
            // 点击的是checkbox
            if (target.classList.contains('custom-checkbox')) {
                var item = target.nextElementSibling;
                var title = item.textContent;
                item.classList.toggle('done');
                _this.toggleItemStatus(title);
            }
            else if (target.classList.contains('todo-item')) {
                var title = target.querySelector('.todo-item-content').textContent;
                var item = _this.itemModel.getItem(title);
                if (item) {
                    _this.delegate.toggleDetailView(item);
                    _this.shrinkView();
                }
            }
        });
    };
    TodoAreaView.prototype.toggleItemStatus = function (title) {
        this.itemModel.toggle(title);
    };
    TodoAreaView.prototype.connectModel = function (name) {
        this.itemModel = new TodoItemModel(name);
        this.updateUI();
    };
    TodoAreaView.prototype.updateUI = function () {
        this.nameLabel.textContent = this.modelName;
        this.contentView.innerHTML = '';
        this.checkboxList = [];
        var items = this.itemModel.items;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            // log(item);
            var li = document.createElement('li');
            li.classList.add('todo-item');
            var span = document.createElement('span');
            span.classList.add('todo-item-content');
            span.textContent = item.name;
            var check = new CustomView.CustomCheckbox();
            this.checkboxList.push(check);
            li.appendChild(check.elem);
            li.appendChild(span);
            if (item.done) {
                check.switchChecked();
                span.classList.add('done');
            }
            this.contentView.appendChild(li);
        }
    };
    // delegate methods
    TodoAreaView.prototype.addNewItem = function (title) {
        this.itemModel.add(title);
        this.updateUI();
    };
    TodoAreaView.prototype.deleteItem = function (title) {
        this.itemModel.remove(title);
        this.updateUI();
    };
    TodoAreaView.prototype.toggleItem = function (title) {
        this.toggleItemStatus(title);
        this.updateUI();
    };
    TodoAreaView.prototype.shrinkView = function () {
        this.element.classList.add('shrink');
    };
    TodoAreaView.prototype.stretchView = function () {
        this.element.classList.remove('shrink');
    };
    return TodoAreaView;
}());
