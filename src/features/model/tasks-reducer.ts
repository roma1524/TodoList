import type {TasksState} from '../../App.tsx'
import {createReducer} from "@reduxjs/toolkit";
import {createTodolistAC} from "./todolists-reducer.ts";

const initialState: TasksState = {}

// export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')

export const tasksReducer = createReducer(initialState, (builder) => {
    builder.addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
    })
})

/*export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'ADD_TASK' : {
            return {...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]}
        }
        case 'DELETE_TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        }
        case "ADD_TODOLIST":
            return { ...state, [action.payload.id]: [] };
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD_TASK', payload: {todolistId, title }} as const;
}
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'DELETE_TASK', payload: {todolistId, taskId }} as const;
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE_TASK_STATUS', payload: {todolistId, taskId, isDone }} as const;
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE_TASK_TITLE', payload: {todolistId, taskId, title }} as const;
}

type addTaskAction = ReturnType<typeof addTaskAC>
type deleteTaskAction = ReturnType<typeof deleteTaskAC>
type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | addTaskAction | deleteTaskAction | changeTaskStatusAction | changeTaskTitleAction
*/

