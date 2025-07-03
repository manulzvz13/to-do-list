import { createProject } from './projectManager.js';
import Todo from './todo.js';

// Save projects to localStorage
function saveProjects(projects) {
  const data = projects.map(project => ({
    name: project.name,
    todos: project.todos.map(todo => ({
      title: todo.title,
      notes: todo.notes,
      dueDate: todo.dueDate,
      priority: todo.priority,
      checklist: todo.checklist,
      completed: todo.completed,
    })),
  }));
  localStorage.setItem('projects', JSON.stringify(data));
}

// Load projects from localStorage
function loadProjects() {
  const data = JSON.parse(localStorage.getItem('projects'));
  if (!data) return null;
  return data.map(projectObj => {
    const project = createProject(projectObj.name);
    projectObj.todos.forEach(todoObj => {
      const todo = Todo.createTodo(
        todoObj.title,
        todoObj.notes,
        todoObj.dueDate,
        todoObj.priority,
        todoObj.checklist,
        todoObj.completed
      );
      project.addTodo(todo);
    });
    return project;
  });
}

export { saveProjects, loadProjects };
