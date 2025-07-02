import Todo from './todo.js';

export default class Project {
  constructor(name) {
    this.name = name; // String: The name of the project
    this.todos = [];  // Array of Todo objects
  }

  // Add a new Todo to the project
  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new Error('addTodo expects a Todo object');
    }
  }

  // Remove a Todo by its index
  removeTodo(index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
  }

  // Get all todos (optionally filter by completed status)
  getTodos(completed = null) {
    if (completed === null) {
      return this.todos;
    }
    return this.todos.filter(todo => todo.completed === completed);
  }
}



