var TodoDetailView = /** @class */ (function () {
    function TodoDetailView() {
        this.element = get('#detailview');
        this.checkbox = new CustomView.CustomCheckbox();
        this.checkbox.delegate = this;
        this.nameLabel = get('#detailview .title');
        this.closeButton = get('#detailview .disappear');
        this.deleteButton = get('#detailview .delete');
        this.timeLabel = get('#detailview .create-time');
        this.setup();
    }
    TodoDetailView.prototype.closeView = function () {
        this.disappear();
    };
    TodoDetailView.prototype.setup = function () {
        this.bindEvents();
    };
    TodoDetailView.prototype.bindEvents = function () {
        var _this = this;
        // 让delegate来显示/隐藏视图总觉得哪里怪怪的……
        this.closeButton.addEventListener('click', function (event) {
            _this.closeView();
            if (_this.delegate) {
                _this.delegate.closeButtonClicked(_this.todoItem);
            }
        });
        this.deleteButton.addEventListener('click', function (event) {
            var title = _this.todoItem.name;
            _this.closeView();
            if (_this.delegate) {
                _this.delegate.deleteButtonClicked(_this.todoItem);
            }
        });
    };
    Object.defineProperty(TodoDetailView.prototype, "item", {
        set: function (item) {
            this.todoItem = item;
            this.appear();
            this.updateUI();
        },
        enumerable: true,
        configurable: true
    });
    TodoDetailView.prototype.updateUI = function () {
        this.nameLabel.textContent = this.todoItem.name;
        this.nameLabel.parentNode.insertBefore(this.checkbox.elem, this.nameLabel);
        this.timeLabel.textContent = '创建于' + this.todoItem.date.split(' ')[0];
        if (this.todoItem.done) {
            this.checkbox.switchChecked();
        }
    };
    TodoDetailView.prototype.disappear = function () {
        // hide detail view
        this.element.classList.add('disappear');
    };
    TodoDetailView.prototype.appear = function () {
        // show detail view
        this.element.classList.remove('disappear');
    };
    // custom checkbox delegate method
    TodoDetailView.prototype.checkboxClicked = function (checkbox) {
        if (this.delegate) {
            this.delegate.toggleItem(this.todoItem);
        }
    };
    return TodoDetailView;
}());
