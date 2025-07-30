import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Task} from "@/app/App.tsx";
import {getListItemSx} from "@/features/ui/Todolist/TodolistItem/TodoListItem.styles.ts";

type Props = {
    task: Task;
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {

    const dispatch = useAppDispatch()

    const changeItemTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }
    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.target.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatus}))
    }
    return (
        <ListItem key={task.id} className={task.isDone ? 'is-done' : ''} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox
                    onChange={changeTaskStatus}
                    checked={task.isDone}/>
                <EditableSpan value={task.title} changeItemTitle={changeItemTitle}/>
            </div>
            <IconButton onClick={deleteTask}><DeleteIcon/></IconButton>
        </ListItem>
    )
}