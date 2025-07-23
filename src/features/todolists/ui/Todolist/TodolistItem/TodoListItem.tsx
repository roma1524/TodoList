import {Todolist} from "@/app/App.tsx";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
// @ts-ignore
import {containerSx, getListItemSx} from './TodoListItem.styles.ts';
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {addTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {FilterButtons} from "@/features/todolists/ui/Todolist/TodolistItem/FilterButtons/FilterButtons.tsx";
import {TodolistTitle} from "@/features/todolists/ui/Todolist/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import { Tasks } from "./Tasks/Tasks.tsx";

type PropsType = {
    todolist: Todolist
    date?: string
}

export const TodoListItem = ({
                                 todolist,
                                 date,
                             }: PropsType) => {

    const dispatch = useAppDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskAC({todolistId: todolist.id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createItem={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
            <div>{date}</div>
        </div>
    )
}