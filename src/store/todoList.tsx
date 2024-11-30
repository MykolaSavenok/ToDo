import { makeAutoObservable } from "mobx";
interface Task {
   id: number;
   text: string;
}


class TodoList {
      tasks: Task[] = [];
   
      constructor() {
         makeAutoObservable(this);
         this.loadTasksFromLocalStorage();
      }
   

      addTask(todo: string) {
         if (todo.trim()) {
            this.tasks.push({ id: Date.now(), text: todo });
            this.saveTasksToLocalStorage();
         }
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
      if (storedTasks) {
         try {
            const parsedTasks = JSON.parse(storedTasks);
            if (Array.isArray(parsedTasks)) {
               this.tasks = parsedTasks.map(task => ({
                  id: task.id || Date.now(),
                  text: task.text || "",
               }));
            } else {
               this.tasks = [];
            }
         } catch (error) {
            console.error("Помилка localStorage:", error);
            this.tasks = [];
         }
      } else {
         this.tasks = [];
      }
   }   
}

export default new TodoList();