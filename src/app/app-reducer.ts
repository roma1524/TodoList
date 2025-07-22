import {createAction, createReducer} from "@reduxjs/toolkit"

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const changeThemeModeAC = createAction<{newThemeMode: ThemeMode}>('app/changeThemeMode')

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            state.themeMode = action.payload.newThemeMode
        })
})

export type ThemeMode = 'dark' | 'light'