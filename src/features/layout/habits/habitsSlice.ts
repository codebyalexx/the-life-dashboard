import { StoreType } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

export type HabitItem = {
    id: String,
    name: String,
    repeatSchema: String,
    doneDays: HabitDay[],
    createdAt: Date|number,
    startAt: Date|number|null,
    endsAt: Date|number|null,
}

export type HabitDay = {
    id: String,
    date: String,
    habitId: String 
}

export const habitsSlice = createSlice({
    name: 'habits',
    initialState: {
        items: []
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload.map((item: any) => {
                return {
                    ...item,
                    createdAt: new Date(item.createdAt).getTime(),
                    startAt: new Date(item.createdAt).getTime(),
                    endsAt: new Date(item.createdAt).getTime()
                }
            })
        },
        addItem: (state: any, action) => {
            state.items = [...state.items, {...action.payload, createdAt: new Date(action.payload.createdAt).getTime()}]
        },
        removeItem: (state, action: {payload:string}) => {
            state.items = [...state.items.filter((i: any) => i.id !== action.payload)]
        },
    }
})

export const {setItems, addItem, removeItem} = habitsSlice.actions

export const selectHabits = (state: StoreType) => state.habits.items