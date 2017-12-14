var TodoDetailView = /** @class */ (function () {
    function TodoDetailView() {
        this.element = get('#detailview');
        this.check = new CustomView.CustomCheckbox();
        this.check.delegate = this;
        this.nameLabel = get('#detailview .title');
        this.hideButton = get('#detailview .disappear');
        this.closeButton = get('#detailview .delete');
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
        this.hideButton.addEventListener('click', function (event) {
            _this.delegate.closeDetailView();
        });
        this.closeButton.addEventListener('click', function (event) {
            var title = _this.todoItem.name;
            _this.delegate.deleteItem(title);
            _this.delegate.closeDetailView();
        });
        // this.check.elem.addEventListener('click', event => {
        //     const title = this.nameLabel.textContent as string;
        //     this.delegate.toggleItem(title);
        // });
    };
    // custom checkbox delegate method
    TodoDetailView.prototype.checkboxClicked = function (checkbox) {
        var title = this.nameLabel.textContent;
        this.delegate.toggleItem(title);
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
        this.nameLabel.parentNode.insertBefore(this.check.elem, this.nameLabel);
        this.timeLabel.textContent = '创建于' + this.todoItem.date.split(' ')[0];
    };
    TodoDetailView.prototype.disappear = function () {
        // hide detail view
        this.element.classList.add('disappear');
    };
    TodoDetailView.prototype.appear = function () {
        // show detail view
        this.element.classList.remove('disappear');
    };
    return TodoDetailView;
}());
