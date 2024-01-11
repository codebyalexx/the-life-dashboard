import { StoreType } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
    name: 'date',
    initialState: new Date().getTime(),
    reducers: {
        setDate: (state, action: {payload: Date}) => {
            state = action.payload.getTime()
            return state
        },
        nextDay: (state) => {
            const day = 60 * 60 * 24 * 1000;
            const date = new Date(state)
            state = new Date(date.getTime() + day).getTime()
            return state
        },
        previousDay: (state) => {
            const day = 60 * 60 * 24 * 1000;
            const date = new Date(state)
            state = new Date(date.getTime() - day).getTime()
            return state
        }
    }
})

export const {setDate, nextDay, previousDay} = dateSlice.actions

export const selectDate = (state: StoreType) => state.date