var TodoListView = /** @class */ (function () {
    function TodoListView() {
        this.element = get('#listview');
        this.listView = get('#listview ul');
        this.customNewList = new CustomView.CustomNewList();
        this.customNewList.delegate = this;
        this.rightMenu = new CustomView.CustomListViewRightMenu();
        this.rightMenu.delegate = this;
        this.areaView = new TodoAreaView();
        this.areaView.delegate = this;
        this.setup();
    }
    Object.defineProperty(TodoListView.prototype, "lists", {
        set: function (lists) {
            this.itemList = lists;
            this.updateUI();
            this.areaView.dataServer = this.dataServer;
            this.areaView.name = this.latestModelList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoListView.prototype, "cssProperties", {
        get: function () {
            var width = this.listView.getBoundingClientRect()['width'];
            var height = this.element.getBoundingClientRect()['height'];
            return { width: width, height: height };
        },
        enumerable: true,
        configurable: true
    });
    TodoListView.prototype.setup = function () {
        this.addCustomViews();
        // this.connectModel()
        this.bindEvents();
    };
    TodoListView.prototype.addCustomViews = function () {
        this.element.appendChild(this.customNewList.elem);
        this.element.appendChild(this.rightMenu.elem);
    };
    // private connectModel() {
    //     this.model = new TodoListModel()
    //     this.updateUI()
    // }
    TodoListView.prototype.updateUI = function () {
        this.latestModelList = this.dataServer.latestModelList;
        this.itemList = this.dataServer.modelLists;
        // log(this.itemList);
        var child = this.listView.firstElementChild;
        while (child !== null) {
            this.listView.removeChild(child);
            child = this.listView.firstElementChild;
        }
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
            if (list === this.latestModelList) {
                li.classList.add('active');
            }
            li.appendChild(name_1);
            li.appendChild(number);
            this.listView.appendChild(li);
        }
    };
    TodoListView.prototype.bindEvents = function () {
        var _this = this;
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
                _this.dataServer.setSnapchat(name);
            }
            event.stopPropagation();
        });
        this.listView.addEventListener('contextmenu', function (event) {
            event.stopPropagation();
            event.preventDefault();
            var target = event.target;
            if (target.nodeName === 'LI') {
                if (target.firstElementChild && target.firstElementChild.textContent) {
                    _this.toBeDelected = target.firstElementChild.textContent;
                }
            }
            else if (target.nodeName === 'SPAN') {
                if (target.textContent) {
                    _this.toBeDelected = target.textContent;
                }
            }
            if (_this.toBeDelected === '我的一天') {
                _this.rightMenu.disappear();
                return;
            }
            if (_this.rightMenu.isHidden) {
                _this.rightMenu.appear();
            }
            _this.rightMenu.setPosition(target.getBoundingClientRect().bottom);
        });
        this.element.addEventListener('click', function (event) {
            event.stopPropagation();
            _this.rightMenu.disappear();
        }, false);
    };
    // add new list delegate methods
    TodoListView.prototype.newListClicked = function (newList) {
        var name = this.customNewList.listName;
        while (this.itemList.indexOf(name) !== -1) {
            name = this.customNewList.listName;
        }
        this.dataServer.addNewList(name);
        this.updateUI();
    };
    // right menu delegate methods
    TodoListView.prototype.deleteList = function () {
        if (this.toBeDelected !== '') {
            this.dataServer.removeList(this.toBeDelected);
            this.dataServer.removeSnapchat();
            this.rightMenu.disappear();
            this.updateUI();
        }
    };
    return TodoListView;
}());
