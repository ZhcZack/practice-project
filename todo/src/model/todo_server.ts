class TodoServer {
    private listModel: TodoListModel;
    private itemModelList: ItemModelListInterface;

    constructor() {
        this.listModel = new TodoListModel();
        this.itemModelList = {};

        this.setup();
    }

    private setup() {
        const lists = this.listModel.lists;
        for (let list of lists) {
            this.itemModelList[list] = new TodoItemModel(list);
        }
    }

    get modelLists(): string[] {
        return this.listModel.lists;
    }

    get latestModelList(): string {
        let result = localStorage.getItem('list-name-before-closed');
        if (result === null || result === '') {
            localStorage.setItem('list-name-before-closed', '我的一天');
            result = '我的一天';
        }
        return result;
    }

    getItemInList(itemName: string, listName: string): TodoItemInterface | null {
        const list = this.itemModelList[listName];
        return list.getItem(itemName);
    }

    itemNumbersInList(listName: string): number {
        const list = this.itemModelList[listName];
        return list.numberOfItems;
    }

    addNewList(listName: string) {
        this.listModel.add(listName);
    }

    removeList(listName: string): boolean {
        localStorage.removeItem(listName);
        return this.listModel.remove(listName);
    }

    itemsInList(listName: string): TodoItemInterface[] {
        const list = this.itemModelList[listName];
        return list.items;
    }

    addItemInList(itemName: string, listName: string) {
        const list = this.itemModelList[listName];
        list.add(itemName);
    }

    removeItemInList(itemName: string, listName: string): boolean {
        const list = this.itemModelList[listName];
        return list.remove(itemName);
    }

    toggleItemInList(itemName: string, listName: string) {
        const list = this.itemModelList[listName];
        list.toggle(itemName);
    }

    renameItemInList(itemName: string, newName: string, listName: string): boolean {
        const list = this.itemModelList[listName];
        return false;
    }

    setSnapchat(listName: string) {
        localStorage.setItem('list-name-before-closed', listName);
    }

    removeSnapchat() {
        localStorage.removeItem('list-name-before-closed');
    }
}

interface ItemModelListInterface {
    [propName: string]: TodoItemModel;
}