import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type PropsType = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: number) => void
    changeFilter: (filter: FilterValues) => void
}

export const Todolistitem = ({title, deleteTask, tasks, changeFilter, date}: PropsType) => {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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