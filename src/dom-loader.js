
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
             <form action="" class="todo-creator" style="display: none">
                <label for="title">Title</label>
                <input type="text" id="title">
                <label for="description">Description</label>
                <textarea id="description"></textarea>
                <label for="date">Due date</label>
                <input type="date" id="date">
                <label for="priority">Select priority:</label>
                <select name="priority" id="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="button" class="create">Create</button>
                <button type="button" class="cancel">Cancel</button>
             </form>
            `
        );
    }

    todo(todo) {
        return this.#range.createContextualFragment(
            `<div class="todo">
                <input type="checkbox" class="todo-check" ${todo.finished ? 'checked' : ''}></input>
                <h3 class="todo-title">${todo.title}</h3>
                <p class="todo-date">${todo.dueDate}</p>
                <p class="todo-priority todo-${todo.priority}">${todo.priority}</p>
                <div class="todo-options">
                    <button class="todo-expand">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z" />
                        </svg>
                    </button>
                    <button class="todo-delete">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                        </svg>
                    </button>
                </div>
                <div class="todo-body" style="display:none">
                    <div>
                        <button class="edit-description">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                        </button>
                        <button class="confirm-edit">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                            </svg>
                        </button>
                        <button class="cancel-edit">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <label>Description:
                            <textarea class="todo-description" disabled="true">${todo.description}</textarea>
                        </label>
                    </div>
                    <div>
                        <label>Change date:
                            <input class="edit-date" type="date">
                        </label>
                    </div>
                    <div>
                        <label>Change priority:
                            <select class="edit-priority" value="${todo.priority}">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <button class="close-todo-body">Close</button>
                    </div>
                </div>
             </div>`
        );
    }

}

class EventCreator {

    projectLiEvents(projectLi, projectManager, project) {
        projectLi.querySelector('.project-viewer').addEventListener('click', () => {
            loader.createProjectPage(project);
        });
        projectLi.querySelector('.project-deleter').addEventListener('click', (e) => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            projectManager.removeProject(project);
        });
    }

    projectPageEvents(pageNode, project) {
        const addTodo = pageNode.querySelector('.add-todo');
        const todoContainer = pageNode.querySelector('.todo-container');
        const todoCreator = pageNode.querySelector('.todo-creator');

        addTodo.addEventListener('click', () => {
            todoCreator.style.display = 'block';
            todoContainer.textContent = '';
        });

        const title = todoCreator.querySelector('#title');
        const description = todoCreator.querySelector('#description');
        const dueDate = todoCreator.querySelector('#date');
        const priority = todoCreator.querySelector('#priority');

        todoCreator.querySelector('.create').addEventListener('click', () => {
            todoCreator.style.display = 'none';
            project.addTodo(title.value, description.value, dueDate.value, priority.value);
            todoContainer.appendChild(loader.createTodoList(project));
            title.value = '';
            description.value = '';
            dueDate.value = '';
            priority.value = '';
        });
        todoCreator.querySelector('.cancel').addEventListener('click', () => {
            todoCreator.style.display = 'none';
            todoContainer.appendChild(loader.createTodoList(project));
        });

    }

    todoEvents(todoNode, todo, project) {
        const todoBody = todoNode.querySelector('.todo-body');
        const todoContainer = todoNode.querySelector('.todo');
        const todoDescription = todoNode.querySelector('.todo-description');
        const todoDate = todoNode.querySelector('.todo-date');
        const todoPriority = todoNode.querySelector('.todo-priority');

        todoNode.querySelector('.todo-title').addEventListener('click', () => {
            todoBody.style.display = 'grid';
        });
        todoNode.querySelector('.todo-check').addEventListener('input', (e) => {
            todo.finished = e.target.checked;
        });
        todoNode.querySelector('.todo-expand').addEventListener('click', () => {
            todoBody.style.display = (todoBody.style.display === 'none') ? 'grid' : 'none';
        });
        todoNode.querySelector('.todo-delete').addEventListener('click', () => {
            todoContainer.parentElement.removeChild(todoContainer);
            project.removeTodo(todo);
        });
        todoNode.querySelector('.edit-description').addEventListener('click', () => {
            todoDescription.disabled = false;
        });
        todoNode.querySelector('.confirm-edit').addEventListener('click', () => {
            todo.description = todoDescription.value;
            todoDescription.disabled = true;
        });
        todoNode.querySelector('.cancel-edit').addEventListener('click', () => {
            todoDescription.value = todo.description; //reset description text
            todoDescription.disabled = true;
        });
        todoNode.querySelector('.edit-date').addEventListener('input', (e) => {
            todo.dueDate = e.target.value;
            todoDate.textContent = todo.dueDate;
        });
        todoNode.querySelector('.close-todo-body').addEventListener('click', () => {
            todoBody.style.display = 'none';
        });
        todoNode.querySelector('.edit-priority').addEventListener('input', (e) => {
            todo.priority = e.target.value;
            todoPriority.textContent = todo.priority;
            todoPriority.classList.remove(todoPriority.classList[1]);
            todoPriority.classList.add(`todo-${todo.priority}`);
        });
    }

}

class DOMLoader {
    #creator;
    #eventCreator;
    #projectList;
    #projectPage;

    constructor() {
        this.#creator = new DOMCreator();
        this.#eventCreator = new EventCreator();
        this.#projectList = document.querySelector('#project-list');
        this.#projectPage = document.querySelector('#project-page');
    }

    createProjectList(projectManager) {
        this.#projectList.textContent = ''; //clear the list first
        const container = document.createDocumentFragment();

        projectManager.projects.map(project => {
            const node = this.#creator.projectLi(project); //create node
            this.#eventCreator.projectLiEvents(node, projectManager, project); //add events
            return node;
        }).forEach(node => {
            container.appendChild(node); //append all nodes to container
        });

        this.#projectList.appendChild(container); //and render the project list
    }

    createProjectPage(project) {
        this.#projectPage.textContent = ''; //clear project page

        const page = this.#creator.projectPage(project); //create page content
        this.#eventCreator.projectPageEvents(page, project); //add events
        const todos = this.createTodoList(project); //create todos
        page.querySelector('.todo-container').appendChild(todos); //append todos to the page

        this.#projectPage.appendChild(page); //render the page
    }

    createTodoList(project) {
        const container = document.createDocumentFragment(); 
        const todos = project.todos;

        todos.map((todo) => {
            const node = this.#creator.todo(todo); //create todo content
            this.#eventCreator.todoEvents(node, todo, project); //add events
            return node; 
        }).forEach((node) => container.appendChild(node));
        
        return container;
    }
}

const loader = new DOMLoader();

export default loader;