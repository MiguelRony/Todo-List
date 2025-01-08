import  { ProjectsController, TodosController } from "./controllers/controllers.js";
import { MainList, TestStorage } from "./controllers/mainList.js";
import { Project, NormalProjectStorage } from "./controllers/project.js";
import { Todo } from "./controllers/todo.js";
import { consoleApp } from "./controllers/consoleApp.js";

import mainPage from "./pages/mainPage.js";

mainPage();

class ProjectsFactory{
    createProject(projectName){
        const project = new Project(projectName, new NormalProjectStorage());
        return project
    }
}

class TodosFactory{
    createTodo(title, description, dueDate, priority, status){
        const todo = new Todo(title, description, dueDate, priority, status);
        return todo;
    }
}


const controller = (() => {
    const mainList = new MainList(new TestStorage());
    const projectsController = new ProjectsController(mainList);
    const todosController = new TodosController(mainList);
    const app = new consoleApp(mainList, projectsController, todosController);
    const projectsFactory = new ProjectsFactory();
    const todosFactory = new TodosFactory();
    return {app, projectsFactory, todosFactory};
})();

const project1 = controller.projectsFactory.createProject("Project 1");
const project2 = controller.projectsFactory.createProject("Project 2");

controller.app.addProject(project1);
controller.app.addProject(project2);

const todo1 = controller.todosFactory.createTodo("Todo 1", "Description 1", "2021-12-12", "High", "Incomplete");
const todo2 = controller.todosFactory.createTodo("Todo 2", "Description 2", "2021-12-13", "Low", "Incomplete");

controller.app.addTodoToProject("Project 1", todo1);
controller.app.addTodoToProject("Project 2", todo2);

console.log(controller.app.getAllProjects());
console.log(controller.app.getTodoList("Project 1"));
console.log(controller.app.getTodoFromProject("Project 2", 0));
