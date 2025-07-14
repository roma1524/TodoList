import './App.css'
import {Todolistitem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter} : td))
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const currentTasks = tasks[todolistId].find((item) => item.id === taskId)
        if (currentTasks) {
            currentTasks.isDone = isDone
            setTasks({...tasks})
        }
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(td => td.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const tdId = v1()
        const newTodolist: Todolist = {id: tdId, title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [tdId]: []})
    }

    return (
        <div className="app">

            <CreateItemForm createItem={addTodolist}/>

            {todolists.map(td => {

                let filteredTasks = tasks[td.id]
                if (td.filter === 'active') {
                    filteredTasks = tasks[td.id].filter(task => task.isDone === false)
                }
                if (td.filter === 'completed') {
                    filteredTasks = tasks[td.id].filter(task => task.isDone === true)
                }

                return (
                    <Todolistitem key={td.id}
                                  todolist={td}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                    />
                )
            })}
        </div>
    )
}

export default App
