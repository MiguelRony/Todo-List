import todosStyles from '../styles/todos.css';

export const renderTodos = (project, projectCard, preview) => {
    const todosSection = projectCard.querySelector('.projectTodos');
    todosSection.replaceChildren();
    let todos = project.getTodoList();
    if(todos.length === 0){
        const emptyTodoCard = createEmptyTodoCard();
        todosSection.appendChild(emptyTodoCard);
    } else if(todos.length < 2){
        todos.forEach(todo => {
            const todoCard = createTodoCard(todo);
            todosSection.appendChild(todoCard);
        });
    } else{
        if (preview) {
            todos = todos.slice(0, 2);
            todos.forEach(todo => {
                const todoCard = createTodoCard(todo);
                todosSection.appendChild(todoCard);
            });
        }else{
            todos.forEach(todo => {
                const todoCard = createTodoCard(todo);
                todosSection.appendChild(todoCard);
            });
        }
    }
    
}

const createTodoCard = (todo) => {
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
            checkBox.textContent = 'check_box';
        } else {
            checkBox.textContent = 'check_box_outline_blank';
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