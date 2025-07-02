import Project from './project.js';

// Delete a project by its name
function deleteProject(projectsArray, projectName) {
  const index = projectsArray.findIndex(project => project.name === projectName);
  if (index !== -1) {
    projectsArray.splice(index, 1);
    return true; // Successfully deleted
  }
  return false; // Project not found
}

export {deleteProject};