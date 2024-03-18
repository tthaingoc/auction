import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    data : number,
    title : string
}

const initialState : CounterState = {
    data : 96,
    title : 'Assignment Group PRN231'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increament: (state, action) => {
            state.data += action.payload
        },
        decreament: (state, action) => {
            state.data -= action.payload
        }
    }
})
export const {increament, decreament} = counterSlice.actions;