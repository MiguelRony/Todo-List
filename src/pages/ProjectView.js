import createProjectCard from "./renderProjects";

export const ProjectView = (project) => {
    const projectsList = document.querySelector('.projectsSection');
    projectsList.replaceChildren();
    const projectCard = createProjectCard(project);
    projectsList.appendChild(projectCard);
}

