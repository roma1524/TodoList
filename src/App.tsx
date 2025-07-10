import './App.css'
import {Todolistitem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('all')
    const [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ])

    const deleteTask = (taskId: string) => {
        const newTasks = tasks.filter((item) => item.id !== taskId)
        setTasks(newTasks)
    }

    const changeFilter = (filterValues: FilterValues) => {
        setFilter(filterValues)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([...tasks, newTask])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const currentTasks = tasks.find((item) => item.id === taskId)
        if (currentTasks) {
            currentTasks.isDone = isDone
            setTasks([...tasks])
        }
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone === true)
    }

  return (
      <div className="app">
       <Todolistitem title={'What to learn'}
                     tasks={filteredTasks}
                     deleteTask={deleteTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeTaskStatus={changeTaskStatus}
                     filter={filter}
       />
      </div>
  )
}

export default App
