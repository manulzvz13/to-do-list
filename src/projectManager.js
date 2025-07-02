import Project from './project.js';

// Function to create a new project
function createProject(name) {
  return new Project(name);
}

// Function to delete a project by name
function deleteProject(projectsArray, projectName) {
  const index = projectsArray.findIndex(project => project.name === projectName);
  if (index !== -1) {
    projectsArray.splice(index, 1);
    return true;
  }
  return false;
}

export { createProject, deleteProject };
