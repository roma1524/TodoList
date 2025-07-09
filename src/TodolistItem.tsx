import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    addTask: (title: string) => void
}

export const Todolistitem = ({title, deleteTask, tasks, changeFilter, date, addTask}: PropsType) => {

    const [newTitle, setNewTitle] = useState('')

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== "") {
            addTask(newTitle)
        }
        setNewTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeTaskHandler}
                       onKeyDown={(e) => {
                           if (e.key === "Enter" && newTitle.trim() !== "") {
                               addTaskHandler()
                           }
                       }}
                       value={newTitle}/>
                <button onClick={addTaskHandler} >+</button>
            </div>
            <ul>
                {tasks.length === 0 ? 'Тасок нет' : tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <Button title={'X'} onClick={() => deleteTask(el.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button onClick={() => changeFilter('all')} title={'All'}/>
                <Button onClick={() => changeFilter('active')} title={'Active'}/>
                <Button onClick={() => changeFilter('completed')} title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    )
}