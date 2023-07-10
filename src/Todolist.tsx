import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import S from './Todolist.module.css'
import {CheckBox} from "./components/CheckBox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckBoxStatus: (taskID: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const [buttonName, setButtonName] = useState('all')

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is REQUIRED!')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }


    const tsarFoo = (value: FilterValuesType) => {
        props.changeFilter(value)
        setButtonName(value)
    }

    const posrednikFoo = (tiD:string,NewisDone:boolean) => {props.changeCheckBoxStatus(tiD,NewisDone)}

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? S.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={S.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    // const changeCheckBoxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeCheckBoxStatus(t.id, e.currentTarget.checked)
                    // }
                     // const changeCheckBoxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeCheckBoxStatus(t.id, e.currentTarget.checked)
                    // }

                    return <li key={t.id} className={t.isDone ? S.isDone : ''}>
                        {/*<input type="checkbox" checked={t.isDone} onChange={changeCheckBoxStatusHandler}/>*/}
                        <CheckBox isDone={t.isDone} callBack={(newIsDone)=>posrednikFoo(t.id,newIsDone)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? S.activeFilter : ''} onClick={() => tsarFoo('all')}>All</button>
            <button className={buttonName === 'active' ? S.activeFilter : ''} onClick={() => tsarFoo('active')}>Active
            </button>
            <button className={buttonName === 'completed' ? S.activeFilter : ''}
                    onClick={() => tsarFoo('completed')}>Completed 
            </button>
        </div>
    </div>
}
