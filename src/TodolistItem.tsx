import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type PropsType = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolistitem = ({
                                 todolist: {id, filter, title},
                                 deleteTask,
                                 tasks,
                                 changeFilter,
                                 date,
                                 addTask,
                                 changeTaskStatus,
                                 deleteTodolist,
                                 changeTodolistTitle,
                                 changeTaskTitle
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
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={'container'}>
                <EditableSpan value={title} changeItemTitle={changeTodolistTitleHandler}/>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm createItem={addTaskHandler}/>
            <ul>
                {tasks.length === 0 ? 'Тасок нет' : tasks.map(el => {
                    const changeItemTitle = (title: string) => {
                        changeTaskTitle(id, el.id, title)
                    }
                    const deleteTaskHandler = () => {
                        deleteTask(id, el.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, el.id, e.target.checked)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={changeTaskStatusHandler}
                                   checked={el.isDone}/>
                            <EditableSpan value={el.title} changeItemTitle={changeItemTitle}/>
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