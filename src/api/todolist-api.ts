import axios from "axios"


const instance = axios.create({  //делает копию аксиос с настройками
    baseURL: 'https://social-network.samuraijs.com/api/1.1/', 
    withCredentials:true
})

type TodolistType = {
    id: string,
   title: string,
   addedDate: Date,
   order: number
}

// type CreateTodolistType = {
//     resultCode: number
//     messages: string[],
//     data: {
//       item: TodolistType
//     }
// }

// type DeleteTodolistType = {
    
//         resultCode: number
//         messages: string[],
//         data: {}
    
// }

// type UpdateTodolistType =  {
//     resultCode: number
//     messages: string[]
//     data: {}
// }



type ResponseType<T={}> = {
    fieldsErrors: string[]
    resultCode: number
    messages: string[],
    data: T
}


export const todolistAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string){
      return  instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title: title})
    },

    deleteTodolist(id:string){
       return instance.delete<ResponseType>(`todo-lists/${id}`)
    },

    updateTodolistTitle(id: string, title:string){
        return instance.put<ResponseType>(`todo-lists/${id}`,{title: title})
    }
    
}

//ДЗ сделать CRUD операцию на таски put передавать только (title)