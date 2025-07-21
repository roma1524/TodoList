import {RootState} from "../store.ts";
import {TasksState} from "../App.tsx";

export const selectTasks = (state: RootState): TasksState => state.tasks