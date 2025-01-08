

export class consoleApp{
    constructor(mainList, projectsController, todosController){
        this.mainList = mainList;
        this.projectsController = projectsController;
        this.todosController = todosController;
    }

    addProject(project){
        this.projectsController.addProject(project);
    }

    getProject(projectName){
        return this.projectsController.getProject(projectName);
    }

    removeProject(projectName){
        this.projectsController.removeProject(projectName);
    }

    getAllProjects(){
        return this.projectsController.getAllProjects();
    }

    addTodoToProject(projectName, todo){
        this.todosController.addTodoToProject(projectName, todo);
    }

    removeTodoFromProject(projectName, todoId){
        this.todosController.removeTodoFromProject(projectName, todoId);
    }

    getTodoList(projectName){
        return this.todosController.getTodoList(projectName);
    }

    getTodoFromProject(projectName, todoId){
        return this.todosController.getTodoFromProject(projectName, todoId);
    }
}