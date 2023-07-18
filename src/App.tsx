import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType= {
    id: string
    title: string
    filter:FilterValuesType
}
function App() {

    // let[todolists,setTodolists]=useState<Array<todolistsType>>([
    //     {id:v1(),title:'What to learn',filter:'all'},
    //     {id:v1(),title:'What to buy',filter:'all'},
        
    // ])

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    let todolistID1=v1();
    let todolistID2=v1();
    
    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    
    let [tasks, setTasks] = useState({
        [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    
const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistID))
    delete tasks[todolistID]
}

    function removeTask(todolistID: string,taskid: string) {
        setTasks({...tasks, [todolistID] : tasks[todolistID].filter(el => el.id !==taskid) })
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDoneValue: boolean) {


        setTasks({...tasks, [todolistID]: tasks [todolistID].map (el => el.id === taskId ? {...el, isDone: isDoneValue}: el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        }

    //     setTasks([...tasks]);
    // }

    function changeFilter(todolistID: string, value: FilterValuesType) {
       // setFilter(value);
       setTodolists(todolists.map(el => el.id === todolistID ? {... el, filter : value}  :el))
    }
    

   //const newArr = [0, 1]

   
    return (
        <div className="App">
            {todolists.map((t)=> {
                let tasksForTodolist = tasks[t.id];

                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                }
            
              
                return (
           <Todolist 
                      key={t.id}
                      todolistID={t.id}
                      title={t.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={t.filter}
                      removeTodolist={removeTodolist}
            />
                )
            })}
            
        </div>
    );
}

export default App;
