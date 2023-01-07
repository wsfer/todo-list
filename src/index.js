import projectManager from './todo-items';
import loader from './dom-loader';

loader.createProjectList(projectManager);
document.querySelector('#add-project').addEventListener('click', () => {
    loader.createProjectCreator(projectManager);
});

