var TodoListView = /** @class */ (function () {
    function TodoListView() {
        this.element = get('#listview');
        this.listView = get('#listview ul');
        this.customNewList = new CustomView.CustomNewList();
        this.areaView = new TodoAreaView();
        this.areaView.delegate = this;
        this.areaView.name = this.getItemModelName();
        this.setup();
    }
    TodoListView.prototype.getItemModelName = function () {
        var name = localStorage.getItem('list-name-before-closed');
        return name ? name : '我的一天';
    };
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
        var itemModelName = this.getItemModelName();
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
            if (list === itemModelName) {
                li.classList.add('active');
            }
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
            var elem = null;
            var temp = null;
            if (target.nodeName === 'LI') {
                elem = target;
                temp = elem.querySelector('.item-name');
            }
            else if (target.nodeName === 'SPAN') {
                temp = target.closest('li');
                if (temp !== null) {
                    elem = temp;
                    temp = elem.querySelector('.item-name');
                }
            }
            // 动画效果
            if (elem !== null && elem.parentNode) {
                var parent_1 = elem.parentNode;
                var siblings = parent_1.querySelectorAll('li');
                for (var i = 0; i < siblings.length; i++) {
                    siblings[i].classList.remove('active');
                }
                elem.classList.add('active');
            }
            if (temp !== null) {
                name = temp.textContent ? temp.textContent : '';
                _this.areaView.name = name;
                localStorage.setItem('list-name-before-closed', name);
            }
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
