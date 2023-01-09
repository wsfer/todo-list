import projectManager from './todo-items';
import loader from './dom-loader';

loader.createProjectList(projectManager);
loader.createHomePage(projectManager);

document.querySelector('#add-project').addEventListener('click', () => {
    loader.createProjectCreator(projectManager);
});

document.querySelector('#home').addEventListener('click', () => {
    document.querySelector('#project-page').textContent = '';
    loader.createHomePage(projectManager);
});

