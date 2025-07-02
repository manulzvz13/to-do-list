export default class Todo {
  constructor(title, notes = '', dueDate = null, priority = 'normal', checklist = [], completed = false) {
    this.title = title; // String: The title of the todo item
    this.notes = notes; // String: Additional notes
    this.dueDate = dueDate; // String or Date: Due date (e.g. '2025-07-02')
    this.priority = priority; // String: 'low', 'normal', 'high', etc.
    this.checklist = checklist; // Array of { item: string, done: boolean }
    this.completed = completed; // Boolean: true if the todo is completed
  }

  // Mark the todo as completed
  markCompleted() {
    this.completed = true;
  }

  // Mark the todo as not completed
  markIncomplete() {
    this.completed = false;
  }

  // Add an item to the checklist
  addChecklistItem(item) {
    this.checklist.push({ item, done: false });
  }

  // Toggle a checklist item's done status by index
  toggleChecklistItem(index) {
    if (this.checklist[index]) {
      this.checklist[index].done = !this.checklist[index].done;
    }
  }
}


