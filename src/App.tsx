import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeCheckBoxStatus = (taskID: string, newIsDone: boolean) => {
           setTasks(tasks.map(el=>el.id===taskID ? {...el,isDone:newIsDone} : el))
    }

    // const changeCheckBoxStatus2 = (taskID: string, taskID2: string, newIsDone: boolean) => {
    //     setTasks(tasks.map(el=>el.id===taskID ? {...el,isDone:newIsDone} : el))
    // }
    // const changeCheckBoxStatus3 = (taskID: string, newIsDone: boolean,taskID222: string,taskID22: string,) => {
    //     setTasks(tasks.map(el=>el.id===taskID ? {...el,isDone:newIsDone} : el))
    // }


    // const changeCheckBoxStatus = (taskID:string,newIsDone:boolean) => {
    //     let currentTask=tasks.find(el=>el.id===taskID)
    //     if(currentTask){
    //         currentTask.isDone=newIsDone
    //         setTasks([...tasks])
    //     }
    // }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeCheckBoxStatus={changeCheckBoxStatus}
            />
        </div>
    );
}

export default App;
