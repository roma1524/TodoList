import './App.css'
import {Todolistitem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [todolists, setTodolists] = useState<Todolist[]>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ])
    const [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ])

    const deleteTask = (taskId: string) => {
        const newTasks = tasks.filter((item) => item.id !== taskId)
        setTasks(newTasks)
    }

    const changeFilter = (tdId: string, filter: FilterValues) => {
        const newTodolists = todolists.map(todolist => {
            return todolist.id === tdId ? { ...todolist, filter } : todolist
        })
        setTodolists(newTodolists)
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



  return (
      <div className="app">
          {todolists.map(td => {

              let filteredTasks = tasks
              if (td.filter === 'active') {
                  filteredTasks = tasks.filter(task => task.isDone === false)
              }
              if (td.filter === 'completed') {
                  filteredTasks = tasks.filter(task => task.isDone === true)
              }

              return (
                  <Todolistitem key={td.id}
                                todolist={td}
                                tasks={filteredTasks}
                                deleteTask={deleteTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                  />
              )
          })}
      </div>
  )
}

export default App
