import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/app/App.tsx";
import styles from './TodolistTitle.module.css'

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist:{id, title}}: Props) => {

    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    return (
        <div className={styles.container}>
            <EditableSpan value={title} changeItemTitle={changeTodolistTitle}/>
            <IconButton title={'x'} onClick={deleteTodolist}><DeleteIcon/></IconButton>
        </div>
    )
}