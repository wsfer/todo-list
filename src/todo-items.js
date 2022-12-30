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
    }
    set dueDate(dateInput) {
        this.#dueDate = new Date(dateInput.value);
    }
    set priority(rangeInput) {
        this.#priority = rangeInput.value;
    }
    set finished(checkboxInput) {
        this.#finished = checkboxInput.checked;
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
    }

    removeTodo(todo) {
        /*The todo parameter should be a reference to one todo on the array
        of the project, so [element === todo] can return an index*/
        this.#todos.splice(this.#todos.findIndex((element) => element === todo), 1);
    }

    toJSON() {  //used for localStorage
        return {
            title: this.#title,
            description: this.#description,
            todos: this.#todos
        };
    }

}

export default Project;