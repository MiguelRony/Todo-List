
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

export {MainList,  TestStorage};