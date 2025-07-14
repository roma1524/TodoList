import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";

type PropsType = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolistitem = ({
                                 todolist: {id, filter, title},
                                 deleteTask,
                                 tasks,
                                 changeFilter,
                                 date,
                                 addTask,
                                 changeTaskStatus,
                                 deleteTodolist
}: PropsType) => {

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const addTaskHandler = (title: string) => {
        addTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm createItem={addTaskHandler}/>
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