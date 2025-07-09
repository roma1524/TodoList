import './App.css'
import {Todolistitem} from "./TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [filter, setFilter] = useState<FilterValues>('all')
    const [tasks, setTasks] = useState([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ])

    const deleteTask = (taskId: number) => {
        const newTasks = tasks.filter((item) => item.id !== taskId)
        setTasks(newTasks)
    }

    const changeFilter = (filterValues: FilterValues) => {
        setFilter(filterValues)
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
       />
      </div>
  )
}

export default App
