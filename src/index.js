import Todo from './todo-items';

const testArray = [
    ['Todo-List', 'desc', '2000-12-12', 1],
    ['Tic-Tac-Toe', 'description', '2015-08-05', 0],
    ['Game', 'desc', '2022-08-09', 5]
];

let a = testArray.map((array) => new Todo(...array));
console.log(a);
a = JSON.stringify(a);
console.log(a);
a = JSON.parse(a);
console.log(a);
a = a.map((str) => JSON.parse(str)).map((obj) => new Todo(...Object.values(obj)));
console.log(a);