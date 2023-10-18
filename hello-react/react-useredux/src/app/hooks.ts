import { createSlice } from "@reduxjs/toolkit";


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        name: 'frank',
    },
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload
        }
    }
})


export const { changeName } = appSlice.actions
export const selectName = (state: any) => state.app.name
export const appReducer =  appSlice.reducer