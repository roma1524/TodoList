import {Todolist} from '../../App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTask')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})


export const todolistsReducer = createReducer(initialState, (builder) => {
    builder.addCase(deleteTodolistAC, (state, action) => {
       return state.filter(t => t.id !== action.payload.id)
    })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ ...action.payload, filter: 'all' })
        })
})

/*
export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            const newTodolist: Todolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: "all",
            };
            return [...state, newTodolist];
        }
        case 'DELETE_TODOLIST': {
            return state.filter(t => t.id !== action.payload.id);
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t);
        }
        case 'CHANGE_FILTER' : {
            return state.map(td => td.id === action.payload.id ? {...td, filter: action.payload.filter} : td)
        }
        default:
            return state
    }
}

export const createTodolistAC = (title: string) => {
    return {type: 'ADD_TODOLIST', payload: {title, id: v1()}} as const
}
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE_TODOLIST',
        payload: {
            id: todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE_TODOLIST_TITLE', payload: {id: todolistId, title}} as const
}
export const changeFilterAC = (todolistId: string, filter: FilterValues) => {
    return {type: 'CHANGE_FILTER', payload: {id: todolistId, filter}} as const
}

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type changeFilterAction = ReturnType<typeof changeFilterAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | ChangeTodolistTitleAction | changeFilterAction*/

