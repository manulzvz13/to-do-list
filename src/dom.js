// dom.js

function renderProjects(projects, selectedProjectIndex, onSelect, onDelete) {
  const projectListContainer = document.getElementById('project-list');
  projectListContainer.innerHTML = '';
  projects.forEach((project, index) => {
    const projectBtn = document.createElement('button');
    projectBtn.textContent = project.name;
    projectBtn.className = 'project-btn';
    if (index === selectedProjectIndex) projectBtn.classList.add('active');
    projectBtn.onclick = () => onSelect(index);
    projectListContainer.appendChild(projectBtn);

    if (project.name !== 'Default') {
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.className = 'delete-project-btn';
      delBtn.onclick = (e) => {
        e.stopPropagation();
        onDelete(index);
      };
      projectBtn.appendChild(delBtn);
    }
  });
}

function renderTodos(project, onExpand, onDelete, onAdd) {
  const todoListContainer = document.getElementById('todo-list');
  todoListContainer.innerHTML = '';

  project.todos.forEach((todo, idx) => {
    const todoDiv = document.createElement('div');
    todoDiv.className = `todo-item priority-${todo.priority}`;
    todoDiv.innerHTML = `
      <span>${todo.title}</span>
      <span>${todo.dueDate ? todo.dueDate : ''}</span>
      <button class="expand-todo-btn">Details</button>
      <button class="delete-todo-btn">🗑️</button>
    `;
    todoDiv.querySelector('.expand-todo-btn').onclick = () => onExpand(todo, idx);
    todoDiv.querySelector('.delete-todo-btn').onclick = () => onDelete(idx);
    todoListContainer.appendChild(todoDiv);
  });

  // Add the "Add Todo" button at the end of the todo list
  const addBtn = document.createElement('button');
  addBtn.id = 'add-todo-btn';
  addBtn.textContent = 'Add Todo';
  addBtn.onclick = onAdd;
  todoListContainer.appendChild(addBtn);
}

function renderTodoDetails(todo, onSave) {
  const todoDetailsContainer = document.getElementById('todo-details');
  todoDetailsContainer.classList.add('active');
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
    const updated = {
      title: document.getElementById('edit-title').value,
      notes: document.getElementById('edit-notes').value,
      dueDate: document.getElementById('edit-dueDate').value,
      priority: document.getElementById('edit-priority').value,
      completed: document.getElementById('edit-completed').checked,
    };
    onSave(updated);
  };
}

function clearTodoDetails() {
  const todoDetailsContainer = document.getElementById('todo-details');
  todoDetailsContainer.classList.remove('active');
  todoDetailsContainer.innerHTML = '';
}

export { renderProjects, renderTodos, renderTodoDetails, clearTodoDetails };
