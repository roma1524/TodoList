import {v1} from 'uuid'
import { expect, test } from 'vitest'
import type {Todolist} from '../App'
import {todolistsReducer} from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'DELETE_TODOLIST',
        payload: {
            id: todolistId1,
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'ADD_TODOLIST',
        payload: {
            id: v1(),
            title: 'What to 1111',
            filter: 'all'
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to 1111')
})

test('correct todolist title should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id: todolistId1,
            title: 'What to 55555',
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to 55555')
    expect(endState[1].title).toBe('What to buy')
})

test('correct todolist filter should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE_FILTER',
        payload: {
            id: todolistId2,
            filter: 'completed',
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].title).toBe('What to buy')
})