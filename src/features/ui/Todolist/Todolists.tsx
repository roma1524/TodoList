import {Grid, Paper} from "@mui/material";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/model/todolists-selectors.ts";
import {TodoListItem} from "@/features/ui/Todolist/TodolistItem/TodoListItem.tsx";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(td => {
                return (
                    <Grid key={td.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodoListItem key={td.id} todolist={td}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}