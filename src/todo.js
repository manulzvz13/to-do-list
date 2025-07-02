export default class Todo {
  constructor(title, notes = '', dueDate = null, priority = 'normal', checklist = [], completed = false) {
    this.title = title;
    this.notes = notes;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.completed = completed;
  }

  markCompleted() {
    this.completed = true;
  }

  markIncomplete() {
    this.completed = false;
  }

  addChecklistItem(item) {
    this.checklist.push({ item, done: false });
  }

  toggleChecklistItem(index) {
    if (this.checklist[index]) {
      this.checklist[index].done = !this.checklist[index].done;
    }
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }

  editNotes(newNotes) {
    this.notes = newNotes;
  }

  editDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  editPriority(newPriority) {
    this.priority = newPriority;
  }

  editCompleted(isCompleted) {
    this.completed = isCompleted;
  }

  editChecklist(newChecklist) {
    this.checklist = newChecklist;
  }

  deleteChecklistItem(index) {
    if (index >= 0 && index < this.checklist.length) {
      this.checklist.splice(index, 1);
    }
  }

  static createTodo(title, notes = '', dueDate = null, priority = 'normal', checklist = [], completed = false) {
    return new Todo(title, notes, dueDate, priority, checklist, completed);
  }

  static deleteTodo(todosArray, index) {
    if (Array.isArray(todosArray) && index >= 0 && index < todosArray.length) {
      todosArray.splice(index, 1);
    }
  }
}

