import './App.css'
import {TodoListItem} from "../features/todolists/TodolistItem/TodoListItem.tsx";
import {CreateItemForm} from "../common/components/CreateItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import {Container, CssBaseline, Grid, Paper, Switch, Toolbar} from "@mui/material";
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from "../features/todolists/TodolistItem/TodoListItem.styles.ts";
import {NavButton} from "../common/components/NavButton/NavButton.ts";
import {ThemeProvider} from '@mui/material/styles'
import {
    changeFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../features/model/todolists-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../features/model/todolists-selectors.ts";
import {selectTasks} from "../features/model/tasks-selectors.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../features/model/tasks-reducer.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {changeThemeModeAC} from "./app-reducer.ts";
import {getTheme} from "../common/theme/theme.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksState = Record<string, Task[]>
export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({newThemeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC({todolistId, title}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    const addTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeFilterAC({id: todolistId, filter}))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm createItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(td => {

                            let filteredTasks = tasks[td.id]
                            if (td.filter === 'active') {
                                filteredTasks = tasks[td.id].filter(task => task.isDone === false)
                            }
                            if (td.filter === 'completed') {
                                filteredTasks = tasks[td.id].filter(task => task.isDone === true)
                            }

                            return (
                                <Grid key={td.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <TodoListItem key={td.id}
                                                      todolist={td}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      changeFilter={changeFilter}
                                                      addTask={addTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      changeTaskTitle={changeTaskTitle}
                                                      deleteTodolist={deleteTodolist}
                                                      changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App
