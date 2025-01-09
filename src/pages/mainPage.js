import mainPage from '../styles/mainPage.css';

const MainPage = () => {
    const content = document.getElementById('content');
    const mainPage = document.createElement('div');
    mainPage.id = 'mainPage';
    
    const header = createHeader();
    const main = createMainSection();
    const footer = createFooter();

    mainPage.appendChild(header);
    mainPage.appendChild(main);
    mainPage.appendChild(footer);
    content.appendChild(mainPage);

    return { header, main, footer}
}

const createSideBar = () =>{
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

    const projectList = document.createElement('div');
    const projectIcon = document.createElement('span');
    const projectContent = document.createElement('span');
    projectIcon.classList.add('material-icons-outlined');
    projectIcon.textContent = 'format_list_bulleted';
    projectList.appendChild(projectIcon);
    projectContent.textContent = 'Projects';
    projectList.appendChild(projectContent);
    projectList.classList.add('sideBarItem');
    
    

    
    sideBar.appendChild(newTodo);
    sideBar.appendChild(projectList);
    return sideBar;
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

const createMainSection = () => {
    const main = document.createElement('main');
    const sideBar = createSideBar();

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