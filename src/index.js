import  { ProjectsController, TodosController } from "./controllers/controllers.js";
import { MainList, TestStorage } from "./controllers/mainList.js";
import { Project, NormalProjectStorage } from "./controllers/project.js";
import { Todo } from "./controllers/todo.js";
import { consoleApp } from "./controllers/consoleApp.js";
import { renderProjects } from "./pages/renderProjects.js";
import { ProjectView } from "./pages/ProjectView.js";

import mainPage from "./pages/mainPage.js";

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

const defaultProject = controller.projectsFactory.createProject("Default");
const project1 = controller.projectsFactory.createProject("Project 1");
const project2 = controller.projectsFactory.createProject("Project 2");
const project3 = controller.projectsFactory.createProject("Project 3");

controller.app.addProject(defaultProject);
controller.app.addProject(project1);
controller.app.addProject(project2);
controller.app.addProject(project3);

const todo1 = controller.todosFactory.createTodo("Todo 1", "Description 1", "2021-12-12", "High", "Incomplete");
const todo2 = controller.todosFactory.createTodo("Todo 2", "Description 2", "2021-12-13", "Low", "Complete");
const todo3 = controller.todosFactory.createTodo("Todo 3", "Description 3", "2021-12-14", "Medium", "Incomplete");
const todo4 = controller.todosFactory.createTodo("Todo 2", "Description 2", "2021-12-13", "Low", "Complete");
const todo5 = controller.todosFactory.createTodo("Todo 3", "Description 3", "2021-12-14", "Medium", "Incomplete");
const todo6 = controller.todosFactory.createTodo("Todo 2", "Description 2", "2021-12-13", "Low", "Complete");
const todo7 = controller.todosFactory.createTodo("Todo 3", "Description 3", "2021-12-14", "Medium", "Incomplete");

controller.app.addTodoToProject("Project 1", todo1);
controller.app.addTodoToProject("Project 2", todo2);
controller.app.addTodoToProject("Project 2", todo3);
controller.app.addTodoToProject("Project 1", todo4);
controller.app.addTodoToProject("Project 2", todo5);
controller.app.addTodoToProject("Project 2", todo6);
controller.app.addTodoToProject("Project 1", todo7);


const mainContent = mainPage(controller);
const defProject = controller.app.getProject("Default");
ProjectView(defProject);
// renderProjects(controller.app.getAllProjects(), mainContent.main);