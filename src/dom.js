import { createProject, deleteProject } from './projectManager.js';
import Todo from './todo.js';

const projectListContainer = document.getElementById('project-list');
const todoListContainer = document.getElementById('todo-list');
const todoDetailsContainer = document.getElementById('todo-details');

let projects = []; // This should be loaded from localStorage or initialized with a default project
let selectedProjectIndex = 0;

// Render all projects in the sidebar
function renderProjects() {
  projectListContainer.innerHTML = '';
  projects.forEach((project, index) => {
    const projectBtn = document.createElement('button');
    projectBtn.textContent = project.name;
    projectBtn.className = 'project-btn';
    if (index === selectedProjectIndex) projectBtn.classList.add('active');
    projectBtn.onclick = () => {
      selectedProjectIndex = index;
      renderProjects();
      renderTodos();
      clearTodoDetails();
    };
    projectListContainer.appendChild(projectBtn);

    // Delete project button (except for default)
    if (project.name !== 'Default') {
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.className = 'delete-project-btn';
      delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteProject(projects, project.name);
        if (selectedProjectIndex >= projects.length) selectedProjectIndex = 0;
        renderProjects();
        renderTodos();
        clearTodoDetails();
      };
      projectBtn.appendChild(delBtn);
    }
  });
}

// Render all todos for the selected project
function renderTodos() {
  todoListContainer.innerHTML = '';
  const project = projects[selectedProjectIndex];
  project.todos.forEach((todo, idx) => {
    const todoDiv = document.createElement('div');
    todoDiv.className = `todo-item priority-${todo.priority}`;
    todoDiv.innerHTML = `
      <span>${todo.title}</span>
      <span>${todo.dueDate ? todo.dueDate : ''}</span>
      <button class="expand-todo-btn">Details</button>
      <button class="delete-todo-btn">🗑️</button>
    `;
    // Expand details
    todoDiv.querySelector('.expand-todo-btn').onclick = () => {
      renderTodoDetails(todo, idx);
    };
    // Delete todo
    todoDiv.querySelector('.delete-todo-btn').onclick = () => {
      project.removeTodo(idx);
      renderTodos();
      clearTodoDetails();
    };
    todoListContainer.appendChild(todoDiv);
  });
}

// Show and edit details for a single todo
function renderTodoDetails(todo, todoIndex) {
  todoDetailsContainer.innerHTML = `
    <h3>Edit Todo</h3>
    <label>Title: <input id="edit-title" value="${todo.title}"></label><br>
    <label>Notes: <textarea id="edit-notes">${todo.notes}</textarea></label><br>
    <label>Due Date: <input id="edit-dueDate" type="date" value="${todo.dueDate || ''}"></label><br>
    <label>Priority: 
      <select id="edit-priority">
        <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
        <option value="normal" ${todo.priority === 'normal' ? 'selected' : ''}>Normal</option>
        <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
      </select>
    </label><br>
    <label>Completed: <input id="edit-completed" type="checkbox" ${todo.completed ? 'checked' : ''}></label><br>
    <button id="save-todo-btn">Save</button>
  `;

  document.getElementById('save-todo-btn').onclick = () => {
    todo.editTitle(document.getElementById('edit-title').value);
    todo.editNotes(document.getElementById('edit-notes').value);
    todo.editDueDate(document.getElementById('edit-dueDate').value);
    todo.editPriority(document.getElementById('edit-priority').value);
    todo.editCompleted(document.getElementById('edit-completed').checked);
    renderTodos();
    clearTodoDetails();
  };
}

function clearTodoDetails() {
  todoDetailsContainer.innerHTML = '';
}

// Example: Add event listeners for adding projects and todos
document.getElementById('add-project-btn').onclick = () => {
  const name = prompt('Project name?');
  if (name) {
    projects.push(createProject(name));
    renderProjects();
  }
};

document.getElementById('add-todo-btn').onclick = () => {
  const title = prompt('Todo title?');
  if (title) {
    const todo = Todo.createTodo(title);
    projects[selectedProjectIndex].addTodo(todo);
    renderTodos();
  }
};

// Initial render
renderProjects();
renderTodos();
clearTodoDetails();

export { renderProjects, renderTodos, renderTodoDetails };
