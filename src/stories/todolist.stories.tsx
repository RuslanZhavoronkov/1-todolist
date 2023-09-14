

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistAPI.getTodolists()
            .then((response) => {
               setState(response.data)
            }, (err): void => { })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.createTodolist('React')
        .then((response) => {
           setState(response.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '0f33246d-d211-4827-8dab-f2a1a7297b96'
       todolistAPI.deleteTodolist(id)
        .then((response) => {
           setState(response.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '0f33246d-d211-4827-8dab-f2a1a7297b96'
       todolistAPI.updateTodolistTitle(id, 'HTML')
        .then((response) => {
           setState(response.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

