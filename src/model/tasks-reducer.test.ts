import {beforeEach, expect, test} from 'vitest'
import type {TasksState} from '../App'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {addTaskAC, deleteTaskAC, tasksReducer} from "./tasks-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC('todolistId2', '2')
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})

test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        addTaskAC('todolistId2', 'juice')
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(3)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('bread')
    expect(endState.todolistId2[0].isDone).toBe(false)
})