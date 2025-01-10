import mainPage from '../styles/mainPage.css';
import { renderProjects } from './renderProjects';
import { ProjectView } from './ProjectView';
import { format } from 'date-fns';

const MainPage = (controller) => {
    const content = document.getElementById('content');
    const mainPage = document.createElement('div');
    mainPage.id = 'mainPage';
    
    const header = createHeader();
    const main = createMainSection(controller);
    const footer = createFooter();

    mainPage.appendChild(header);
    mainPage.appendChild(main);
    mainPage.appendChild(footer);
    content.appendChild(mainPage);

    return { header, main, footer}
}

const createSideBar = (controller, main) =>{
    const sideBar = document.createElement('div');
    // Create new todo button
    const newTodo = document.createElement('div');
    const iconDiv = document.createElement('div');
    const contentDiv = document.createElement('div');
    const addIcon = document.createElement('span');

    addIcon.classList.add('material-symbols-outlined');
    addIcon.textContent = "add_circle";
    sideBar.classList.add('sideBar', 'active');
    iconDiv.appendChild(addIcon);
    contentDiv.textContent =' New Todo';
    newTodo.classList.add('newTodo');
    newTodo.appendChild(iconDiv);
    newTodo.appendChild(contentDiv);

    newTodo.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        const dialog = document.createElement('dialog');
        dialog.classList.add('dialog');

        createNewTodoForm(controller, dialog, overlay);
    });

    //Create button 'new Project'
    const newProject = document.createElement('div');
    const contentDivProject = document.createElement('div');
    const addIconProject = document.createElement('span');
    const iconDivProject = document.createElement('div');

    addIconProject.classList.add('material-symbols-outlined');
    addIconProject.textContent = "add_circle";
    sideBar.classList.add('sideBar', 'active');
    iconDivProject.appendChild(addIconProject);
    contentDivProject.textContent =' New Project';
    newProject.classList.add('newProject');
    newProject.appendChild(iconDivProject);
    newProject.appendChild(contentDivProject);

    newProject.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        const dialog = document.createElement('dialog');
        dialog.classList.add('dialog');

        createNewProjectForm(controller, dialog, overlay);
    });


    const projectList = document.createElement('div');
    const projectIcon = document.createElement('span');
    const projectContent = document.createElement('span');
    projectIcon.classList.add('material-icons-outlined');
    projectIcon.textContent = 'format_list_bulleted';
    projectList.appendChild(projectIcon);
    projectContent.textContent = 'Projects';
    projectList.appendChild(projectContent);
    projectList.classList.add('sideBarItem');
    
    projectList.addEventListener('click', () => {
        renderProjects(controller.app.getAllProjects(), main, controller);
    });

    
    sideBar.appendChild(newTodo);
    sideBar.appendChild(newProject);
    sideBar.appendChild(projectList);
    return sideBar;
}

const createNewTodoForm = (controller, dialog, overlay) => {
    const form = document.createElement('form');
    form.autocomplete = 'off';
    form.classList.add('dialogTodoForm');
    form.method = 'dialog';
    form.id = 'newTodoForm';

    const titleGroup = document.createElement('div');
    titleGroup.classList.add('formGroup');
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    titleLabel.htmlFor = 'title';
    const title = document.createElement('input');
    title.id = 'title';
    title.name = 'title';
    title.placeholder = 'Title';
    title.required = true;
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(title);

    const descriptionGroup = document.createElement('div');
    descriptionGroup.classList.add('formGroup');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description';
    descriptionLabel.htmlFor = 'description';
    const description = document.createElement('textarea');
    description.id = 'description';
    description.name = 'description';
    description.placeholder = 'Description';
    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(description);
    
    const dueDateGroup = document.createElement('div');
    dueDateGroup.classList.add('formGroup');
    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date';
    dueDateLabel.htmlFor = 'dueDate';
    const dueDate = document.createElement('input');
    dueDate.id = 'dueDate';
    dueDate.name = 'dueDate';
    dueDate.type = 'date';
    dueDate.required = true;
    dueDateGroup.appendChild(dueDateLabel);
    dueDateGroup.appendChild(dueDate);

    const priorityGroup = document.createElement('div');
    priorityGroup.classList.add('formGroup');
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority';
    const priority = document.createElement('select');
    priority.id = 'priority';
    priority.name = 'priority';
    const high = document.createElement('option');
    high.value = 'High';
    high.textContent = 'High';
    const medium = document.createElement('option');
    medium.value = 'Medium';
    medium.textContent = 'Medium';
    const low = document.createElement('option');
    low.value = 'Low';
    low.textContent = 'Low';
    priority.appendChild(high);
    priority.appendChild(medium);
    priority.appendChild(low);
    priority.required = true;
    priorityGroup.appendChild(priorityLabel);
    priorityGroup.appendChild(priority);

    const projectGroup = document.createElement('div');
    projectGroup.classList.add('formGroup');
    const projectLabel = document.createElement('label');
    projectLabel.htmlFor = 'project';
    projectLabel.textContent = 'Project';
    const projectSelect = document.createElement('select');
    projectSelect.id = 'project';
    projectSelect.name = 'project';
    const projects = controller.app.getAllProjects();
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.name;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
    projectGroup.appendChild(projectLabel);
    projectGroup.appendChild(projectSelect);

    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Add';
    submit.classList.add('formBtn');
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.classList.add('formBtn');
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', () => {
        dialog.close();
        overlay.style.display = 'none';
    });

    form.appendChild(titleGroup);
    form.appendChild(descriptionGroup);
    form.appendChild(dueDateGroup);
    form.appendChild(priorityGroup);
    form.appendChild(projectGroup);
    form.appendChild(submit);
    form.appendChild(cancel);
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
    overlay.style.display = 'block';

    form.addEventListener('submit', (e) => {
        const [year, month, day] = form.elements.dueDate.value.split('-');
        const todo = controller.todosFactory.createTodo(
            form.elements.title.value, 
            form.elements.description.value, 
            format(new Date(year, month - 1, day), "EEE dd, MM, yyyy"), 
            form.elements.priority.value, 
            'Incomplete');
        controller.app.addTodoToProject(form.elements.project.value, todo);
        ProjectView(controller.app.getProject(form.elements.project.value), controller);
        dialog.close();
        overlay.style.display = 'none';
    });
}

const createNewProjectForm = (controller, dialog, overlay) => {
    const form = document.createElement('form');
    form.autocomplete = 'off';
    form.classList.add('dialogProjectForm');
    form.method = 'dialog';
    form.id = 'newProjectForm';

    const nameGroup = document.createElement('div');
    nameGroup.classList.add('formGroup');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name';
    nameLabel.htmlFor = 'name';
    const name = document.createElement('input');
    name.id = 'name';
    name.name = 'name';
    name.placeholder = 'Name';
    name.required = true;
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(name);


    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Add';
    submit.classList.add('formBtn');
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.classList.add('formBtn');
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', () => {
        dialog.close();
        overlay.style.display = 'none';
    });

    form.appendChild(nameGroup);
    form.appendChild(submit);
    form.appendChild(cancel);
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
    overlay.style.display = 'block';

    form.addEventListener('submit', (e) => {
        const project = controller.projectsFactory.createProject(form.elements.name.value);
        controller.app.addProject(project);
        ProjectView(project, controller);
        dialog.close();
        overlay.style.display = 'none';
    });
}

const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const hiddenMenu = document.createElement('div');
    const menuIcon = document.createElement('span');

    menuIcon.classList.add('material-icons-round');
    menuIcon.textContent = 'menu';
    hiddenMenu.classList.add('hiddenMenu');

    hiddenMenu.addEventListener('click', () => {
        const sideBar = document.querySelector('.sideBar');
        sideBar.classList.toggle('active');
        sideBar.classList.toggle('inactive');
    });

    hiddenMenu.appendChild(menuIcon);
    header.appendChild(hiddenMenu);

    return header;
}

const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    return footer;
}

const createMainSection = (controller) => {
    const main = document.createElement('main');
    const sideBar = createSideBar(controller, main);

    main.appendChild(sideBar);

    const projectsSection = createProjectsSection();

    main.appendChild(projectsSection);
    main.classList.add('main');
    return main;
}

const createProjectsSection = () => {
    const projectsSection = document.createElement('div');
    projectsSection.classList.add('projectsSection');
    return projectsSection;
}

export default MainPage;