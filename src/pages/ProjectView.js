import createProjectCard from "./renderProjects";

export const ProjectView = (project, controller) => {
    const projectsList = document.querySelector('.projectsSection');
    projectsList.replaceChildren();
    const projectCard = createProjectCard(project, controller);
    projectsList.appendChild(projectCard);
}

