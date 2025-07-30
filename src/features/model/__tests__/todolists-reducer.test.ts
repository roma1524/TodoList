import {beforeEach, expect, test} from 'vitest'
import type {Todolist} from '../../../app/App.tsx'
import {
    changeFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from '../todolists-reducer.ts'
import {nanoid} from "@reduxjs/toolkit";

let todolistId1: string
let todolistId2: string
let startState: Todolist[]

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

   startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be deleted', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, createTodolistAC('What to 1111'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to 1111')
})

test('correct todolist title should be changed', () => {

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, 'What to 55555'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to 55555')
    expect(endState[1].title).toBe('What to buy')
})

test('correct todolist filter should be changed', () => {

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, 'completed'))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].title).toBe('What to buy')
})