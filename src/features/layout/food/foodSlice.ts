import { StoreType } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

export interface FoodItem {
    name: String,
    carbs: number,
    fat: number,
    proteins: number
}

export const foodSlice = createSlice({
    name: 'food',
    initialState: {
        goal: 1800,
        items: []
    },
    reducers: {
        adjustGoal: (state, action) => {
            state.goal = Math.max(1200, Math.min(5000, state.goal + action.payload))
        },
        setGoal: (state, action) => {
            state.goal = action.payload
        }
    }
})

export const { adjustGoal, setGoal } = foodSlice.actions

export const selectGoal = (state: StoreType) => state.food.goal

export const selectTodayFood = (state: StoreType) => state.food.items