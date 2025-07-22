import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    value: string
    changeItemTitle: (title: string) => void
}

export const EditableSpan = ({ value, changeItemTitle }: Props) => {

    const [title, setTitle] = useState(value)
    const [editing, setEditing] = useState<boolean>(false)

    const turnOnEditMode = () => {
        setEditing(true)
    }
    const turnOffEditMode = () => {
        setEditing(false)
        changeItemTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHendler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeItemTitle(title)
        }
    }

    return (
        <>
            {editing ?
                (<TextField
                    variant={'outlined'}
                    size={'small'}
                    value={title}
                    autoFocus
                    onBlur={turnOffEditMode}
                    onKeyDown={onKeyDownHendler}
                    onChange={onChangeHandler}
                />)
                :
                (<span onDoubleClick={turnOnEditMode}>{title}</span>)}
        </>
    )
}