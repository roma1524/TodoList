import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

export type Props = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: Props) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && taskTitle.trim() !== "") {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            createItem(taskTitle)
        } else {
            setError('Title is required')
        }
        setTaskTitle('')
    }

    return (
        <div>
            <TextField
                label={'Enter a title'}
                variant={'outlined'}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={onChangeTaskHandler}
                onKeyDown={createTaskOnEnterHandler}
                value={taskTitle}/>
            <IconButton color={'primary'} onClick={addTaskHandler}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
}