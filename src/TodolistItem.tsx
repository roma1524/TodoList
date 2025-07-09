import {FC} from "react";
import {Task} from "./App.tsx";

type PropsType = {
    title: string
    tasks: Task[]
    date?: string
}

export const Todolistitem: FC<PropsType> = props => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.length === 0 ? 'Тасок нет' : props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{props.date}</div>
        </div>
    )
}