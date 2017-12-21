class TodoServer {

    get modelLists(): string[] | null {
        return [];
    }

    itemNumbersInList(listName: string): number {
        return 0;
    }

    addNewList(listName: string) {

    }

    removeList(listName: string): boolean {
        return false;
    }

    itemsInList(listName: string): TodoItemInterface[] {
        return [];
    }

    addItemInList(itemName: string, listName: string) {

    }

    removeItemInList(itemName: string, listName: string): boolean {
        return false;
    }

    toggleItemInList(itemName: string, listName: string) {

    }

    renameItemInList(itemName: string, newName: string, listName: string): boolean {
        return false;
    }
}