import { format } from 'date-fns';

class Todo {
    #title;
    #description;
    #dueDate;
    #priority;
    #finished;
    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        /*dueDate comes from an input value of type date with pattern: year-month-day*/
        this.#dueDate = new Date(dueDate); 
        this.#priority = priority;
        this.#finished = false;
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
        return JSON.stringify({
            title: this.#title,
            description: this.#description,
            dueDate: format(this.#dueDate, 'yyyy-MM-dd'),
            priority: this.#priority,
            finished: this.#finished
        });
    }

}

export default Todo;