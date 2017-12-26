import TodoApp from './model/todo_app';

const main = (event: Event) => {
    let app = new TodoApp();
}

window.addEventListener('load', main);