import React, { ChangeEvent, useCallback } from "react"
import { TaskType } from "./Todolist"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "./EditableSpan"
import { Delete } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer"

export type SuperTaskProps = {

    task: TaskType
    todolistId: string

}



export const SuperTaskWithRedux: React.FC<SuperTaskProps> = React.memo((props) => {

const dispatch = useDispatch()



    console.log('Super Task')
    const onClickHandler = ()=> dispatch(removeTaskAC(props.task.id, props.todolistId))


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId));
    }


    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    }

    return (


        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>


    )
})
