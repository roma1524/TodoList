import type {TasksState} from '../../App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const addTaskAC = createAction<{todolistId: string, title: string}>('tasks/addTask')
export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, (builder) => {
    builder.addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
    })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(addTaskAC, (state, action) => {
            const newTask = {title: action.payload.title, isDone: false, id: nanoid()}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(deleteTaskAC, (state, action) => {
            const findIn = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            if (findIn !== -1) {
                state[action.payload.todolistId].splice(findIn, 1)
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const findIn = state[action.payload.todolistId].find(el => el.id === action.payload.taskId)
            if (findIn) {
                findIn.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const findIn = state[action.payload.todolistId].find(el => el.id === action.payload.taskId)
            if (findIn) {
                findIn.title = action.payload.title
            }
        })
})
