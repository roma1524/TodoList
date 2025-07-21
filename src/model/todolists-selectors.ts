import {RootState} from "../store.ts";
import {Todolist} from "../App.tsx";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists