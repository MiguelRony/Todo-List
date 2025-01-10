import todosStyles from '../styles/todos.css';

export const renderTodos = (project, projectCard, preview, controller) => {
    const todosSection = projectCard.querySelector('.projectTodos');
    todosSection.replaceChildren();
    let todos = project.getTodoList();
    if(todos.length === 0){
        const emptyTodoCard = createEmptyTodoCard();
        todosSection.appendChild(emptyTodoCard);
    } else if(todos.length < 4){
        todos.forEach(todo => {
            const todoCard = createTodoCard(todo, controller);
            todoCard.addEventListener('click', (event) => {
                event.stopPropagation();
            });
            todosSection.appendChild(todoCard);
            const deleteCard = todoCard.querySelector('.deleteDiv');
            deleteCard.addEventListener('click', () => {
                project.removeTodo(todo.id);
                renderTodos(project, projectCard, preview, controller);
                controller.app.mainList.projects.StoreInfo();
            });
        });
    } else{
        if (preview) {
            todos = todos.slice(0, 3);
            todos.forEach(todo => {
                const todoCard = createTodoCard(todo, controller);
                todoCard.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
                todosSection.appendChild(todoCard);
                const deleteCard = todoCard.querySelector('.deleteDiv');
                deleteCard.addEventListener('click', () => {
                    project.removeTodo(todo.id);
                    renderTodos(project, projectCard, preview, controller);
                    controller.app.mainList.projects.StoreInfo();
                });
            });
        }else{
            todos.forEach(todo => {
                const todoCard = createTodoCard(todo, controller);
                todoCard.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
                todosSection.appendChild(todoCard);
                const deleteCard = todoCard.querySelector('.deleteDiv');
                deleteCard.addEventListener('click', () => {
                    project.removeTodo(todo.id);
                    renderTodos(project, projectCard, preview, controller);
                    controller.app.mainList.projects.StoreInfo();
                });
            });
        }
    }
    
}

const createTodoCard = (todo, controller) => {
    const todoCard = document.createElement('div');

    // Create checkbox
    const checkBoxDiv = document.createElement('div');
    const checkBox = document.createElement('span');
    checkBox.classList.add('material-icons-outlined');
    if (todo.status === 'Complete') {
        checkBox.textContent = "check_box";
    } else{
        checkBox.textContent = "check_box_outline_blank";
    }

    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.classList.add('checkBoxDiv');
    todoCard.appendChild(checkBoxDiv);

    checkBoxDiv.addEventListener('click', () => {
        if (checkBox.textContent === 'check_box_outline_blank') {
            todo.status = 'Complete';
            checkBox.textContent = 'check_box';
            controller.app.mainList.projects.StoreInfo();
        } else {
            todo.status = 'Incomplete';
            checkBox.textContent = 'check_box_outline_blank';
            controller.app.mainList.projects.StoreInfo();
        }
    });

    // Create todo content
    const todoContent = document.createElement('div');
    todoContent.classList.add('todoContent');
    const title = document.createElement('span');
    title.textContent = todo.title;
    const description = document.createElement('span');
    description.classList.add('description');
    description.textContent = todo.description;

    todoContent.appendChild(title);
    todoContent.appendChild(description);
    todoCard.appendChild(todoContent);

    // Create due date
    const dueDate = document.createElement('div');
    dueDate.classList.add('dueDate');
    dueDate.textContent = todo.dueDate;
    todoCard.appendChild(dueDate);

    // Create delete icon
    const deleteDiv = document.createElement('div');
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-icons-outlined');
    deleteDiv.classList.add('deleteDiv');
    deleteIcon.textContent = 'delete';
    deleteIcon.classList.add('deleteIcon');
    deleteDiv.appendChild(deleteIcon);
    todoCard.appendChild(deleteDiv);

    // Create priority
    const priority = document.createElement('div');
    priority.classList.add('priority', todo.priority);
    todoCard.appendChild(priority);

    todoCard.classList.add('todoCard');
    

    return todoCard;
}

const createEmptyTodoCard = () => {
    const todoCard = document.createElement('div');
    todoCard.classList.add('todoCard');
    todoCard.textContent = "No todos in this project";
    return todoCard;
}