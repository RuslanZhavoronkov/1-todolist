import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton, List, ListItem } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>< DeleteIcon/></IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <ListItem 
                    sx={{p:"0 30px"}} //pading
                    key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            size={'small'}
                            color={'secondary'}
                            onChange={onChangeHandler}
                            checked={t.isDone} />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton
                            size={'small'}

                            onClick={onClickHandler}>x</IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <Button
                variant={'contained'}
                size={'small'}
                disableElevation
                color={props.filter === 'all' ? "secondary" : "primary"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                sx={{ mr: '2px' }}
                variant={'contained'}
                size={'small'}
                disableElevation
                color={props.filter === 'active' ? "secondary" : "primary"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={'contained'}
                size={'small'}
                disableElevation
                color={props.filter === 'completed' ? "secondary" : "primary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


