import { mainList, testStorage } from "./mainList.js";
import { project, normalProjectStorage } from "./project.js";
import { Todo } from "./todo.js";

class ProjectsController{
    constructor(projectsList){
        this.projectsList = projectsList;
    }

    init(){
        this.projectsList.getAllProjects();
    }

    addProject(project){
        this.projectsList.addProject(project);
    }

    getProject(projectName){
        return this.projectsList.getProject(projectName);
    }

    removeProject(projectName){
        this.projectsList.removeProject(projectName);
    }

    getAllProjects(){
        return this.projectsList.getAllProjects();
    }

}

class TodosController{
    constructor(projectsList){
        this.projectsList = projectsList;
    }

    addTodoToProject(projectName, todo){
        const project = this.projectsList.getProject(projectName);
        project.addTodo(todo);
        this.projectsList.projects.StoreInfo();
    }

    removeTodoFromProject(projectName, todoId){
        const project = this.projectsList.getProject(projectName);
        project.removeTodo(todoId);
        this.projectsList.projects.StoreInfo();
    }

    getTodoList(projectName){
        const project = this.projectsList.getProject(projectName);
        return project.getTodoList();
    }

    getTodoFromProject(projectName, todoId){
        const project = this.projectsList.getProject(projectName);
        return project.getTodo(todoId);
    }
}

export { ProjectsController, TodosController };