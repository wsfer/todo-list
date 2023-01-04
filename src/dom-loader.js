
class DOMCreator {
    #range;
    constructor() {
        this.#range = new Range();
    }

    projectLi(project) {
        return this.#range.createContextualFragment(
            `<li class="project-list-element">
                <button class="project-viewer">${project.title}</button>
                <button class="project-deleter">X</button>
            </li>`
        );
    }

    projectPage(project) {
        return this.#range.createContextualFragment(
            `<h2 class="project-title">${project.title}</h2>
             <p class="project-description">${project.description}</p>
             <header class="todo-header">
                <p>Status</p>
                <p>Title</p>
                <p>Date</p>
                <p>Priority</p>
                <button class="add-todo">+</button>
             </header>
             <section class="todo-container"></section>
            `
        );
    }

    todo(todo) {
        return this.#range.createContextualFragment(
            `<div class="todo">
                <input type="checkbox" class="todo-check" ${todo.finished ? 'checked' : ''}></input>
                <h3 class="todo-title">${todo.title}</h3>
                <p>${todo.dueDate}</p>
                <p class="todo-${todo.priority}">
                    ${todo.priority}
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" />
                    </svg>
                </p>
                <div class="todo-options">
                    <svg class="todo-expand" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z" />
                    </svg>
                    <svg class="todo-delete" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                    </svg>
                </div>
                <div class="todo-body" style="display:none">
                    <p class="todo-description">${todo.description}</p>
                </div>
             </div>`
        );
    }

}

class EventCreator {
    
    projectLiEvents() {

    }

    projectPageEvents() {

    }

    todoEvents() {

    }
}

class DOMLoader {
    #creator;
    #eventCreator;
    constructor() {
        this.#creator = new DOMCreator();
        this.#eventCreator = new EventCreator();
    }

    createProjectList(project) {
        document.body.appendChild(this.#creator.projectPage(project));
    }

    createProjectPage() {
        
    }

    createTodoList() {

    }
}

const loader = new DOMLoader();

export default loader;