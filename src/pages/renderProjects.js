import projects from '../styles/projects.css';
import { renderTodos } from './renderTodos';

export const renderProjects = (projects, mainContent) => {

    const projectList = mainContent.querySelector('.projectsSection');
    projectList.replaceChildren();
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectList.appendChild(projectCard);
    });
}

const createProjectCard = (project) => {
    const projectCard = document.createElement('div');
    const projectTodos = document.createElement('div');

    projectTodos.classList.add('projectTodos');

    

    projectCard.classList.add('projectCard');
    projectCard.textContent = project.name;
    projectCard.appendChild(projectTodos);
    renderTodos(project, projectCard, true);
    return projectCard;
}