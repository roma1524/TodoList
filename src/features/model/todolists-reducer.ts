import {FilterValues, Todolist} from '../../app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTask')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{
    id: string,
    title: string
}>('todolists/changeTodolistTitle')
export const changeFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/changeFilter')

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        const findEl = state.findIndex(t => t.id === action.payload.id)
        if (findEl !== -1) {
         state.splice(findEl, 1)
        }
    })
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const findEl = state.findIndex(t => t.id === action.payload.id)
            if (findEl !== -1) {
                state[findEl].title = action.payload.title
            }
        })
        .addCase(changeFilterAC, (state, action) => {
            const findEl = state.find(t => t.id === action.payload.id)
            if (findEl) {
                findEl.filter = action.payload.filter
            }
        })
})


