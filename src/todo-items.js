import { format } from 'date-fns';

class Todo {
    #title;
    #description;
    #dueDate;
    #priority;
    #finished;
    constructor(title, description, dueDate, priority, finished=false) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate); //comes from an input value of type date with pattern year-mouth-day
        this.#priority = priority;
        /*finished value is false by default, will be true when the
        object is recreated with information from localStorage*/
        this.#finished = finished;
    }

    get title() {
        return this.#title;
    }
    get description() {
        return this.#description;
    }
    get dueDate() {
        return format(this.#dueDate, 'MMM, do');
    }
    get priority() {
        return this.#priority;
    }
    get finished() {
        return this.#finished;
    }

    //All setters receive a DOM element (usually an input) and get it's information 
    set description(textarea) {
        this.#description = textarea.textContent;
        updatedLocalStorage();
    }
    set dueDate(dateInput) {
        this.#dueDate = new Date(dateInput.value);
        updatedLocalStorage();
    }
    set priority(rangeInput) {
        this.#priority = rangeInput.value;
        updatedLocalStorage();
    }
    set finished(checkboxInput) {
        this.#finished = checkboxInput.checked;
        updatedLocalStorage();
    }

    toJSON() { //used for localStorage
        return [
            this.#title,
            this.#description,
            format(this.#dueDate, 'yyyy-MM-dd'),
            this.#priority,
            this.#finished
        ];
    }

}

class Project { //This is a container of todos.
    #title;
    #description;
    #todos;
    constructor(title, description) {
        this.#title = title;
        this.#description = description;
        this.#todos = [];
    }

    get title() {
        return this.#title;
    }
    get description() {
        return this.#description;
    }
    get todos() {
        return this.#todos;
    }

    addTodo(title, description, dueDate, priority, finished) {
        this.#todos.push(new Todo(title, description, dueDate, priority, finished));
        updatedLocalStorage();
    }

    removeTodo(todo) {
        /*The todo parameter should be a reference to one todo on the array
        of the project, so [element === todo] can return an index*/
        this.#todos.splice(this.#todos.findIndex((element) => element === todo), 1);
        updatedLocalStorage();
    }

    toJSON() {  //used for localStorage
        return {
            title: this.#title,
            description: this.#description,
            todos: this.#todos
        };
    }

}

class ProjectManager { //And this will store all projects
    #projects;
    constructor() {
        if (storageAvailable('localStorage') && localStorage.getItem("projects")) {
            //We have information from localStorage, build all the projects
            const parsedData = JSON.parse(localStorage.getItem("projects"));
            this.#projects = parsedData.map((obj) => {
                const project = new Project(obj.title, obj.description); //recreate the project
                obj.todos.forEach((todoInf) => project.todos.push(new Todo(...todoInf))); //and add each todo to it
                return project;
            });
        } else {
            this.#projects = [];
        }
    }

    get projects() {
        return this.#projects;
    }

    addProject(title, description) {
        this.#projects.push(new Project(title, description));
        updatedLocalStorage();
    }

    removeProject(project) { //same as removeTodo() from Project class
        this.#projects.splice(this.#projects.findIndex((element) => element === project), 1);
        updatedLocalStorage();
    }

    toJSON() { //localStorage too
        return this.#projects;
    }

}

function storageAvailable(type) { //From MDN
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

function updatedLocalStorage() { //Called each time one change happens
    if (storageAvailable('localStorage')) {
        localStorage.setItem('projects', JSON.stringify(projectManager.projects));
    }
}

const projectManager = new ProjectManager();

export default projectManager;