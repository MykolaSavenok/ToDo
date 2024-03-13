import React, { useState } from "react";
import './App.scss';
import { observer } from "mobx-react-lite";
import todoList from "./store/todoList";

const App: React.FC = observer(() => {
   const [input, setInput] = useState<string>('');
   const [editingTask, setEditingTask] = useState<number | null>(null);
   const [editInput, setEditInput] = useState<string>('');
   const [theme, setTheme] = useState<string>('dark');

   const addTask = () => {
      if (input.trim() !== '') {
         todoList.addTask(input);
         setInput('');
      }
   };

   const editTask = (id: number, task: string) => {
      setEditingTask(id);
      setEditInput(task);
   };

   const saveEditing = () => {
      if (editingTask !== null && editInput.trim() !== '') {
         todoList.editTask(editingTask, editInput);
         setEditingTask(null);
         setEditInput('');
      }
   };

   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addTask();
      };
   };

   const cancelEditing = () => {
      setEditingTask(null);
      setEditInput('');
   }

   const deleteTask = (id: number) => {
      todoList.removeTask(id);
   };

   const deleteTasks = () => {
      todoList.deleteAllTask();
   };

   const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
   }

   return (
      <>
         <div className={`wrapper ${theme === 'dark' ? 'dark' : 'light'}`}>
            <div className="container">
               <div onClick={toggleTheme} className="theme">
                  {theme === 'dark' ? (
                     <>
                        <img src="static/images/moon.png" alt="theme" />
                     </>
                  ) : (
                     <>
                        <img src="static/images/sunn.png" alt="theme" />
                     </>
                  )}
               </div>
               <section className="main">
                  <h1 className="main__title">Todo list</h1>
                  <div className="main__add">
                     <input
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setInput(e.target.value)}
                        value={input} type="text"
                        placeholder="Enter your task"
                     />
                     <button onClick={() => addTask()}>Add</button>
                  </div>
                  <div className="main__body">
                     <div className={todoList.tasks.length === 0 ? "main__body-column hidden" : "main__body-column"}>
                        {todoList.tasks.map((task) => (
                           <div className={`main__body-item ${theme === 'dark' ? 'dark' : 'light'}`} key={task.id}>
                              {editingTask === task.id ? (
                                 <input
                                    type="text"
                                    value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                 />
                              ) : (
                                 <p>{task.text}</p>
                              )}
                              <div>
                                 {editingTask === task.id ? (
                                    <>
                                       <button onClick={saveEditing}>Save</button>
                                       <button onClick={cancelEditing}>Cancel</button>
                                    </>
                                 ) : (
                                    <>
                                       <img onClick={() => editTask(task.id, task.text)} src="static/images/edit.png" alt="edit" />
                                       <img onClick={() => deleteTask(task.id)} src="static/images/trash.png" alt="delete" />
                                    </>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="main__btn"><button onClick={() => deleteTasks()}>Delete All</button></div>
                  </div>
               </section>
            </div>
         </div>
      </>
   )
})

export default App;