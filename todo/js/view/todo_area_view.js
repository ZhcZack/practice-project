var TodoAreaView = /** @class */ (function () {
    function TodoAreaView() {
        this.element = get('#areaview');
        this.nameLabel = get('#areaview .name');
        this.contentView = get('#areaview-content ul');
        this.customNewItem = new CustomView.CustomNewItem();
        this.customNewItem.delegate = this;
        this.checkboxList = [];
        this.detailView = new TodoDetailView();
        this.detailView.delegate = this;
        this.setup();
    }
    Object.defineProperty(TodoAreaView.prototype, "name", {
        set: function (value) {
            this.listName = value;
            this.detailView.closeView();
            this.updateUI();
        },
        enumerable: true,
        configurable: true
    });
    // private methods
    TodoAreaView.prototype.setup = function () {
        this.bindEvents();
        this.element.appendChild(this.customNewItem.elem);
    };
    TodoAreaView.prototype.bindEvents = function () {
        var _this = this;
        this.contentView.addEventListener('click', function (event) {
            var target = event.target;
            // log(target)
            if (target.classList.contains('todo-item')) {
                var title = target.querySelector('.todo-item-content').textContent;
                var item = _this.dataServer.getItemInList(title, _this.listName);
                if (item) {
                    _this.detailView.item = item;
                    _this.shrinkView();
                }
            }
        });
    };
    TodoAreaView.prototype.toggleItemStatus = function (title) {
        this.dataServer.toggleItemInList(title, this.listName);
    };
    TodoAreaView.prototype.updateUI = function () {
        this.nameLabel.textContent = this.listName;
        this.contentView.innerHTML = '';
        this.checkboxList = [];
        var items = this.dataServer.itemsInList(this.listName);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            // log(item)
            var li = document.createElement('li');
            li.classList.add('todo-item');
            var span = document.createElement('span');
            span.classList.add('todo-item-content');
            span.textContent = item.name;
            var check = new CustomView.CustomCheckbox();
            check.delegate = this;
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
    // custom checkbox delegate methods
    TodoAreaView.prototype.checkboxClicked = function (checkbox) {
        var item = checkbox.elem.nextElementSibling;
        if (item) {
            var title = item.textContent;
            if (title) {
                item.classList.toggle('done');
                this.toggleItemStatus(title);
            }
        }
    };
    // custom view 'CustomNewItem' delegate methods
    TodoAreaView.prototype.addButtonClicked = function (value) {
        this.addNewItem(value);
    };
    // detail view delegate methods
    TodoAreaView.prototype.closeButtonClicked = function (item) {
        this.stretchView();
    };
    TodoAreaView.prototype.deleteButtonClicked = function (item) {
        var title = item.name;
        this.stretchView();
        this.deleteItem(title);
    };
    TodoAreaView.prototype.toggleItem = function (item) {
        this.toggleItemStatus(item.name);
        this.updateUI();
    };
    TodoAreaView.prototype.addNewItem = function (title) {
        this.dataServer.addItemInList(title, this.listName);
        this.updateUI();
    };
    TodoAreaView.prototype.deleteItem = function (title) {
        var result = this.dataServer.removeItemInList(title, this.listName);
        if (result) {
            this.updateUI();
        }
    };
    TodoAreaView.prototype.shrinkView = function () {
        this.element.classList.add('shrink');
    };
    TodoAreaView.prototype.stretchView = function () {
        this.element.classList.remove('shrink');
    };
    return TodoAreaView;
}());
