import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";

type PropsType = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const Todolistitem = ({
                                 todolist: {id, filter, title},
                                 deleteTask,
                                 tasks,
                                 changeFilter,
                                 date,
                                 addTask,
                                 changeTaskStatus
}: PropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(id, taskTitle)
        } else {
            setError('Title is required')
        }
        setTaskTitle('')
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && taskTitle.trim() !== "") {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       onChange={onChangeTaskHandler}
                       onKeyDown={createTaskOnEnterHandler}
                       value={taskTitle}/>
                <button onClick={addTaskHandler} >+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks.length === 0 ? 'Тасок нет' : tasks.map(el => {

                    const deleteTaskHandler = () => {
                        deleteTask(id, el.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, el.id, e.target.checked)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done': ''}>
                            <input type="checkbox"
                                   onChange={changeTaskStatusHandler}
                                   checked={el.isDone}/>
                            <span>{el.title}</span>
                            <Button title={'X'} onClick={deleteTaskHandler}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterHandler('all')} title={'All'}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilterHandler('active')} title={'Active'}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilterHandler('completed')} title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    )
}