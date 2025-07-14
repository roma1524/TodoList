import {ChangeEvent, useState} from "react";
import {Button} from "./Button.tsx";

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

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
            <input className={error ? 'error' : ''}
                   onChange={onChangeTaskHandler}
                   onKeyDown={createTaskOnEnterHandler}
                   value={taskTitle}/>
            <Button onClick={addTaskHandler} title={'+'}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}