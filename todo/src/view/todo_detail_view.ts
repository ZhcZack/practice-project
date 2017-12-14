<<<<<<< HEAD
class TodoDetailView implements CustomView.CustomCheckboxDelegate {
=======
class TodoDetailView {
>>>>>>> 3cd509b4af9afa47820b209adb78a9020be2d192
    delegate: TodoApp
    private element: HTMLElement
    private check: CustomView.CustomCheckbox
    private nameLabel: HTMLElement
    private hideButton: HTMLElement
    private closeButton: HTMLElement
    private timeLabel: HTMLElement
    private todoItem: TodoItemInterface

    constructor() {
        this.element = get('#detailview')
        this.check = new CustomView.CustomCheckbox()
<<<<<<< HEAD
        this.check.delegate = this
=======
>>>>>>> 3cd509b4af9afa47820b209adb78a9020be2d192
        this.nameLabel = get('#detailview .title')
        this.hideButton = get('#detailview .disappear')
        this.closeButton = get('#detailview .delete')
        this.timeLabel = get('#detailview .create-time')

        this.setup()
    }

    closeView() {
        this.disappear()
    }

    private setup() {
        this.bindEvents()
    }

    private bindEvents() {
        // 让delegate来显示/隐藏视图总觉得哪里怪怪的……
        this.hideButton.addEventListener('click', event => {
            this.delegate.closeDetailView()
        });
        this.closeButton.addEventListener('click', event => {
            const title = this.todoItem.name
            this.delegate.deleteItem(title)
            this.delegate.closeDetailView()
<<<<<<< HEAD
=======
        });
        this.check.elem.addEventListener('click', event => {
            const title = this.nameLabel.textContent as string
            this.delegate.toggleItem(title)
>>>>>>> 3cd509b4af9afa47820b209adb78a9020be2d192
        });
        // this.check.elem.addEventListener('click', event => {
        //     const title = this.nameLabel.textContent as string;
        //     this.delegate.toggleItem(title);
        // });
    }

    // custom checkbox delegate method
    checkboxClicked(checkbox: CustomView.CustomCheckbox) {
        const title = this.nameLabel.textContent as string
        this.delegate.toggleItem(title)
    }

    set item(item: TodoItemInterface) {
        this.todoItem = item
        this.appear()
        this.updateUI()
    }

    private updateUI() {
        this.nameLabel.textContent = this.todoItem.name
        this.nameLabel.parentNode!.insertBefore(this.check.elem, this.nameLabel)
        this.timeLabel.textContent = '创建于' + this.todoItem.date.split(' ')[0]
    }

    private disappear() {
        // hide detail view
        this.element.classList.add('disappear')
    }

    private appear() {
        // show detail view
        this.element.classList.remove('disappear')
    }
}