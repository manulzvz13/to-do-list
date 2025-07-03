// index.js

import { createProject, deleteProject } from './projectManager.js';
import Todo from './todo.js';
import { renderProjects, renderTodos, renderTodoDetails, clearTodoDetails } from './dom.js';
import { saveProjects, loadProjects } from './storage.js';

let projects = loadProjects() || [createProject('Default')];
let selectedProjectIndex = 0;

function rerenderAll() {
  renderProjects(
    projects,
    selectedProjectIndex,
    (index) => { selectedProjectIndex = index; rerenderAll(); },
    (index) => {
      deleteProject(projects, projects[index].name);
      if (selectedProjectIndex >= projects.length) selectedProjectIndex = 0;
      rerenderAll();
    }
  );
  renderTodos(
    projects[selectedProjectIndex],
    (todo, idx) => renderTodoDetails(todo, (updated) => {
      todo.editTitle(updated.title);
      todo.editNotes(updated.notes);
      todo.editDueDate(updated.dueDate);
      todo.editPriority(updated.priority);
      todo.editCompleted(updated.completed);
      rerenderAll();
      clearTodoDetails();
    }),
    (idx) => {
      projects[selectedProjectIndex].removeTodo(idx);
      rerenderAll();
      clearTodoDetails();
    }
  );
  clearTodoDetails();
  saveProjects(projects);
}

document.getElementById('add-project-btn').onclick = () => {
  const name = prompt('Project name?');
  if (name) {
    projects.push(createProject(name));
    selectedProjectIndex = projects.length - 1;
    rerenderAll();
  }
};

document.getElementById('add-todo-btn').onclick = () => {
  const title = prompt('Todo title?');
  if (title) {
    const todo = Todo.createTodo(title);
    projects[selectedProjectIndex].addTodo(todo);
    rerenderAll();
  }
};

rerenderAll();
