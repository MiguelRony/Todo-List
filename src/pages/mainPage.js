import mainPage from '../styles/mainPage.css';

const MainPage = () => {
    const content = document.getElementById('content');
    const mainPage = document.createElement('div');
    mainPage.id = 'mainPage';
    
    const header = createHeader();
    const sideBar = createSideBar();
    const main = createMainSection();
    const footer = createFooter();

    mainPage.appendChild(header);
    mainPage.appendChild(sideBar);
    mainPage.appendChild(main);
    mainPage.appendChild(footer);
    content.appendChild(mainPage);
}

const createSideBar = () =>{
    const sideBar = document.createElement('div');
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
    
    sideBar.appendChild(newTodo);

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
    main.classList.add('main');
    return main;
}

export default MainPage;