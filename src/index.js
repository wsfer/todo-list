import Project from './todo-items';


//Testing JSON conversion for localStorage, everything will be deleted soon
const testArray = [
    ['Todo-List', 'desc', '2000-12-12', 1],
    ['Tic-Tac-Toe', 'description', '2015-08-05', 0],
    ['Game', 'desc', '2022-08-09', 5]
];

const project = new Project('title', 'description');
testArray.forEach((infs) => project.addTodo(...infs));
let date = JSON.stringify(project);
date = JSON.parse(date);
console.log(date);
//recreate
const anotherProject = new Project(date.title, date.description);
date.todos.forEach((todoData) => anotherProject.addTodo(...todoData));
console.log(anotherProject);