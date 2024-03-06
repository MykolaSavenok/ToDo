import React, { useEffect, useState } from "react";
import './App.scss';

const App: React.FC = () => {
   const [input, setInput] = useState<string>('');
   const [editingIndex, setEditingIndex] = useState<number | null>(null);
   const [editInput, setEditInput] = useState<string>('');
   const [theme, setTheme] = useState<string>('dark');
   const [tasks, setTasks] = useState<string[]>(() => {
      const storedTasks = localStorage.getItem('tasks');
      return storedTasks ? JSON.parse(storedTasks) : [];
   });

   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
   }, [tasks]);

   function addTask() {
      if (input.trim() !== '') {
         setTasks([...tasks, input]);
         setInput('');
      }
   };

   function editTask(index: number, task: string) {
      setEditingIndex(index);
      setEditInput(task);
   };

   function saveEditing() {
      if (editingIndex !== null && editInput.trim() !== '') {
         const updateTasks = [...tasks];
         updateTasks[editingIndex] = editInput;
         setTasks(updateTasks);
         setEditingIndex(null);
         setEditInput('');
      }
   };

   function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
         addTask();
      };
   };

   function cancelEditing() {
      setEditingIndex(null);
      setEditInput('');
   }

   function deleteTask(index: number) {
      const updateTasks = tasks.filter((_, i) => i !== index);
      setTasks(updateTasks);
   };

   function deleteTasks() {
      setTasks([]);
   };

   function toggleTheme() {
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
                  )}</div>
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
                     <div className={tasks.length === 0 ? "main__body-column hidden" : "main__body-column"}>
                        {tasks.map((task, index) => (
                           <div className={`main__body-item ${theme === 'dark' ? 'dark' : 'light'}`} key={index}>
                              {editingIndex === index ? (
                                 <input
                                    type="text"
                                    value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                 />
                              ) : (
                                 <p>{task}</p>
                              )}
                              <div>
                                 {editingIndex === index ? (
                                    <>
                                       <button onClick={saveEditing}>Save</button>
                                       <button onClick={cancelEditing}>Cancel</button>
                                    </>
                                 ) : (
                                    <>
                                       <img onClick={() => editTask(index, task)} src="static/images/edit.png" alt="edit" />
                                       <img onClick={() => deleteTask(index)} src="static/images/trash.png" alt="delete" />
                                    </>
                                 )}

                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="main__btn"><button onClick={() => deleteTasks()}>Dellete All</button></div>
                  </div>
               </section>
            </div>
         </div>
      </>
   )
}

export default App;