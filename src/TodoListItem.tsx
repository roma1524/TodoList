import {FilterValues, Task, Todolist} from "./App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {IconButton, Button, Checkbox} from "@mui/material";
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
// @ts-ignore
import {containerSx, getListItemSx} from './TodoListItem.styles.ts';

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

export const TodoListItem = ({
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
                <IconButton title={'x'} onClick={deleteTodolistHandler}><DeleteIcon/></IconButton>
            </div>
            <CreateItemForm createItem={addTaskHandler}/>
            <List>
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
                        <ListItem key={el.id} className={el.isDone ? 'is-done' : ''} sx={getListItemSx(el.isDone)}>
                            <div>
                                <Checkbox
                                    onChange={changeTaskStatusHandler}
                                    checked={el.isDone}/>
                                <EditableSpan value={el.title} changeItemTitle={changeItemTitle}/>
                            </div>
                            <IconButton onClick={deleteTaskHandler}><DeleteIcon/></IconButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>Completed</Button>
            </Box>
            <div>{date}</div>
        </div>
    )
}