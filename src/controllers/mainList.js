import {Project, LocalProjectStorage} from './project.js';
import {Todo} from './todo.js';


class MainStorage{
    add(project){}
    get(projectName){}
    remove(projectName){}
    getAll(){}
}


class MainList{
    constructor(mainStorage){
        this.projects = mainStorage;
    }

    addProject(project){
        this.projects.add(project);
    }

    getProject(projectName){
        return this.projects.get(projectName);
    }

    removeProject(projectName){
        this.projects.remove(projectName);
    }

    getAllProjects(){
        return this.projects.getAll();
    }
}

class TestStorage extends MainStorage{
    constructor(){
        super();
        this.projects = [];
    }
    
    add(project){
        if (this.get(project.name) === undefined){
            this.projects.push(project);
            return true;
        }
        return false;
    }

    get(projectName){
        return this.projects.find(project => project.name === projectName);
    }

    remove(projectName){
        this.projects = this.projects.filter(project => project.name !== projectName);
    }

    getAll(){
        return this.projects;
    }
}

class LocalStorage extends MainStorage{
    constructor(){
        super();
        this.projects = [];
        if (localStorage.getItem('projects')){
            JSON.parse(localStorage.getItem('projects')).map(project => {
                console.log(project.name);
                const newProject = new Project(project.name, new LocalProjectStorage());
                project.todos.map(todo => {
                    new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.status);
                    newProject.addTodo(todo);
                });
                this.projects.push(newProject);
            });
        }else{
            this.projects.push(new Project("Default", new LocalProjectStorage()));
            this.StoreInfo();
        }
        
    }

    add(project){
        this.projects.push(project);
        let objects = this.projects.map(object => {
             return object.Stringify();
        });
        localStorage.setItem('projects', JSON.stringify(objects));
        // if (this.get(project.name) === undefined){
            
        //     return true;
        // }
        // return false;
    }

    get(projectName){
        return this.projects.find(project => project.name === projectName);
    }

    remove(projectName){
        this.projects = this.projects.filter(project => project.name !== projectName);
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    getAll(){
        return this.projects;
    }

    StoreInfo(){
        let objects = this.projects.map(object => {
            return object.Stringify();
       });
        localStorage.setItem('projects', JSON.stringify(objects));
    }
}

export {MainList,  TestStorage, LocalStorage};