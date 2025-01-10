import projects from '../styles/projects.css';
import { renderTodos } from './renderTodos';
import { ProjectView } from './ProjectView';

export const renderProjects = (projects, mainContent, controller) => {

    const projectList = mainContent.querySelector('.projectsSection');
    projectList.replaceChildren();
    projects.forEach(project => {
        const projectCard = createProjectCard(project, controller);
        projectList.appendChild(projectCard);
    });
}

const createProjectCard = (project, controller) => {
    const projectCard = document.createElement('div');
    const projectTodos = document.createElement('div');

    projectTodos.classList.add('projectTodos');

    projectCard.addEventListener('click', () => {
        ProjectView(project, controller);
    });
    

    projectCard.classList.add('projectCard');
    projectCard.textContent = project.name;
    projectCard.appendChild(projectTodos);
    renderTodos(project, projectCard, true, controller);
    return projectCard;
}

export default createProjectCard;