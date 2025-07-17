import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import {Container, CssBaseline, Grid, Paper, Switch, Toolbar} from "@mui/material";
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from "./TodoListItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {
    changeFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {tasksReducer} from "./model/tasks-reducer.ts";

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

type ThemeMode = 'dark' | 'light'

export const App = () => {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (todolistId: string, title: string) => {
        // const newTask = {id: v1(), title, isDone: false}
        // setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // const currentTasks = tasks[todolistId].find((item) => item.id === taskId)
        // if (currentTasks) {
        //     currentTasks.isDone = isDone
        //     setTasks({...tasks})
        // }
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }


    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
    }
    const addTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(changeFilterAC(todolistId, filter))
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
