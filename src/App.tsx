import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";

function App() {
  let [tasks, setTask] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "ReactJS", isDone: false },
  ]);

  const removeTask = (taskId: number) => {
    setTask(tasks.filter((el) => el.id !== taskId));
  };

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
