import { mapHabits } from "@/lib/habits";
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
            const parsedHabits = action.payload.map((item: any) => {
                return {
                    ...item,
                    createdAt: new Date(item.createdAt).getTime(),
                    startAt: new Date(item.createdAt).getTime(),
                    endsAt: new Date(item.createdAt).getTime()
                }
            })
            state.items = mapHabits(parsedHabits)
        },
        addItem: (state: any, action) => {
            const parsedItem = {...action.payload, createdAt: new Date(action.payload.createdAt).getTime()}
            const mappedItem = mapHabits([
                {
                    ...parsedItem
                }
            ])[0]
            state.items = [...state.items, mappedItem]
        },
        removeItem: (state, action: {payload:string}) => {
            state.items = [...state.items.filter((i: any) => i.id !== action.payload)]
        },
        toggleHabitValidated: (state, action: {payload: string}) => {
            state.items = [...state.items.map((i: any) => {
                const newValidated = !i.validated
                if (i.id === action.payload) return {
                    ...i,
                    validated: newValidated,
                    doneDays: newValidated 
                        ? [...i.doneDays, `v${(new Date().setHours(0,0,0,0))}`] 
                        : [...i.doneDays.filter((x: any) => x !== `v${(new Date().setHours(0,0,0,0))}`)]
                }
                return i
            })]
        },
        toggleHabitSkipped: (state, action: {payload: string}) => {
            state.items = [...state.items.map((i: any) => {
                const newSkipped = !i.skipped
                if (i.id === action.payload) return {
                    ...i,
                    skipped: newSkipped,
                    doneDays: newSkipped 
                        ? [...i.doneDays, `s${(new Date().setHours(0,0,0,0))}`] 
                        : [...i.doneDays.filter((x: any) => x !== `s${(new Date().setHours(0,0,0,0))}`)]
                }
                return i
            })]
            
        }
    }
})

export const {setItems, addItem, removeItem, toggleHabitSkipped, toggleHabitValidated} = habitsSlice.actions

export const selectHabits = (state: StoreType) => state.habits.items