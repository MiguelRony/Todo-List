
class ProjectStorage{
    add(todo){}
    remove(todoId){}
    get(todId){}
    getAll(){}
}


export default class Project{
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
}

class NormalProjectStorage extends ProjectStorage{
    constructor(){
        super();
        this.todos = [];
        this.idGenerator = new IdGenerator();
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

class IdGenerator{
    constructor(){
        this.id = 0;
    }

    generateId(){
        return this.id++;
    }
}

export {Project, NormalProjectStorage};