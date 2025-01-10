import {Todo} from './todo.js';


class ProjectStorage{
    add(todo){}
    remove(todoId){}
    get(todId){}
    getAll(){}
}


class Project{
    constructor(name, projectStorage){
        this.name = name;
        this.todos = projectStorage;
    }

    addTodo(todo){
        this.todos.add(todo);
    }

    getTodoList(){
        return this.todos.getAll();
    }

    getTodo(todoId){
        return this.todos.get(todoId);
    }

    removeTodo(todoId){
        this.todos.remove(todoId);
    }

    Stringify(){
        return { name: this.name, idCount: this.todos.idGenerator.id, todos: this.todos.Stringify() };
    }
}

class NormalProjectStorage extends ProjectStorage{
    constructor(){
        super();
        this.todos = [];
        this.idGenerator = new IdGenerator(0);
    }

    add(todo){
        todo.id = this.idGenerator.generateId();
        if (this.get(todo.id) === undefined){
            this.todos.push(todo);
            return true;
        }
        return false;
    }

    get(todoId){
        return this.todos.find(todo => todo.id === todoId);
    }

    remove(todoId){
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    getAll(){
        return this.todos;
    }
}

class LocalProjectStorage extends ProjectStorage{
    constructor(){
        super();
        this.todos =  [];
        this.idGenerator = new IdGenerator(0);
    }

    add(todo){
        todo.id = this.idGenerator.generateId();
        this.todos.push(todo);
    }

    get(todoId){
        return this.todos.find(todo => todo.id === todoId);
    }

    remove(todoId){
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    getAll(){
        return this.todos;
    }

    Stringify(){
        return this.todos;
    }
}

const localStorageProjectDecoder = (data) => {
    return data.map(project => {
        return new Project(project.name, localStorageTodoDecoder(project.todos));
    });
}

const localStorageTodoDecoder = (data) => {
    return data.map(todo => {
        return new Todo(todo.id, todo.title, todo.description, todo.dueDate, todo.priority, todo.status);
    });
}


class IdGenerator{
    constructor(idCount){
        this.id = idCount;
    }

    generateId(){
        return this.id++;
    }
}

export {Project, NormalProjectStorage, LocalProjectStorage};