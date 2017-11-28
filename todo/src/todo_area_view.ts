class TodoAreaView {
    private element: HTMLElement
    private nameLabel: HTMLDivElement
    constructor() {
        this.element = get('#todo-area-view')
        this.nameLabel = get('#todo-area-view .name') as HTMLDivElement
    }
}