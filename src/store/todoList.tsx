import { makeAutoObservable } from "mobx";

class TodoList {
   tasks = [];

   constructor() {
      makeAutoObservable(this);
      this.loadTasksFromLocalStorage();
   }

   addTask(todo: string) {
      this.tasks.push({ id: Date.now(), text: todo });
      this.saveTasksToLocalStorage();
   }

   removeTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasksToLocalStorage();
   }

   editTask(id: number, newText: string) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
         task.text = newText;
         this.saveTasksToLocalStorage();
      }
   }

   deleteAllTask() {
      this.tasks = [];
      this.saveTasksToLocalStorage();
   }

   saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
   }

   loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks !== "undefined") {
         const parsedTasks = JSON.parse(storedTasks);
         this.tasks = parsedTasks;
      } else {
         this.tasks = [];
      }
   }
}

export default new TodoList();