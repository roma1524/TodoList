import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {Todolist} from "@/app/App.tsx";
import { TaskItem } from "./TaskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist: {id, filter}}: Props) => {

    const tasks = useAppSelector(selectTasks)

    let filteredTasks = tasks[id]

    if (filter === 'active') {
        filteredTasks = tasks[id].filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks[id].filter(task => task.isDone)
    }

    return (
        <List>
            {filteredTasks.length === 0 ? 'Тасок нет' : filteredTasks.map(task => {
                return (
                    <TaskItem task={task} todolistId={id}/>
                )
            })}
        </List>
    )
}