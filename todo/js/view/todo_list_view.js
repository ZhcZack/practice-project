var TodoListView = /** @class */ (function () {
    function TodoListView() {
        this.element = get('#listview');
        this.listView = get('#listview ul');
        this.customNewList = new CustomView.CustomNewList();
        this.areaView = new TodoAreaView();
        this.areaView.delegate = this;
        this.setup();
    }
    TodoListView.prototype.setup = function () {
        this.addCustomViews();
        this.connectModel();
        this.bindEvents();
    };
    TodoListView.prototype.addCustomViews = function () {
        this.element.appendChild(this.customNewList.elem);
    };
    TodoListView.prototype.connectModel = function () {
        this.model = new TodoListModel();
        this.updateUI();
    };
    TodoListView.prototype.updateUI = function () {
        var child = this.listView.firstElementChild;
        while (child !== null) {
            this.listView.removeChild(child);
            child = this.listView.firstElementChild;
        }
        this.itemList = this.model.lists;
        for (var _i = 0, _a = this.itemList; _i < _a.length; _i++) {
            var list = _a[_i];
            var li = document.createElement('li');
            li.classList.add('list-item');
            var name_1 = document.createElement('span');
            name_1.classList.add('item-name');
            name_1.textContent = list;
            var number = document.createElement('span');
            number.classList.add('number-of-items');
            number.textContent = '';
            li.appendChild(name_1);
            li.appendChild(number);
            this.listView.appendChild(li);
        }
    };
    TodoListView.prototype.bindEvents = function () {
        var _this = this;
        // this.customNewList.elem.addEventListener('click', (event: Event) => {
        //     let name = this.customNewList.listName
        //     while (this.itemList.indexOf(name) !== -1) {
        //         name = this.customNewList.listName
        //     }
        //     this.model.add(name)
        //     this.updateUI()
        // })
        this.listView.addEventListener('click', function (event) {
            var target = event.target;
            var name = '';
            if (target.nodeName === 'LI') {
                name = target.querySelector('.item-name').textContent;
            }
            else if (target.nodeName === 'SPAN') {
                var li = target.closest('li');
                if (li) {
                    name = li.querySelector('.item-name').textContent;
                }
            }
            // 让代理（也就是app）做切换视图内容的工作。
            // this.delegate!.toggleAreaView(name)
            // this.delegate!.closeDetailView()
            _this.areaView.name = name;
        });
    };
    // add new list delegate methods
    TodoListView.prototype.newListClicked = function (newList) {
        var name = this.customNewList.listName;
        while (this.itemList.indexOf(name) !== -1) {
            name = this.customNewList.listName;
        }
        this.model.add(name);
        this.updateUI();
    };
    return TodoListView;
}());
