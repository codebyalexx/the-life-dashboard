import { StoreType } from "@/lib/store";
import { Store, createSlice } from "@reduxjs/toolkit";

export type FoodItem = {
    name: String,
    carbs: number,
    fat: number,
    proteins: number
}

export const foodSlice = createSlice({
    name: 'food',
    initialState: {
        goal: {
            calories: 1800,
            carbs: 0,
            fat: 0,
            proteins: 0
        },
        items: []
    },
    reducers: {
        adjustCaloriesGoal: (state, action) => {
            state.goal.calories = Math.max(1200, Math.min(5000, state.goal.calories + action.payload))
        },
        adjustCarbsGoal: (state, action) => {
            state.goal.carbs = Math.max(0, Math.min(1000, state.goal.carbs + action.payload))
        },
        adjustFatGoal: (state, action) => {
            state.goal.fat = Math.max(0, Math.min(1000, state.goal.fat + action.payload))
        },
        adjustProteinsGoal: (state, action) => {
            state.goal.proteins = Math.max(0, Math.min(1000, state.goal.proteins + action.payload))
        },
        setGoal: (state, action) => {
            state.goal = action.payload
        },
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItem: (state: any, action) => {
            state.items = [...state.items, {...action.payload}]
        },
        removeItem: (state, action: {payload:string}) => {
            state.items = [...state.items.filter((i: any) => i.id !== action.payload)]
        }
    }
})

export const { adjustCaloriesGoal, adjustCarbsGoal, adjustFatGoal, adjustProteinsGoal, setGoal, setItems } = foodSlice.actions

export const selectGoal = (state: StoreType) => state.food.goal
export const selectCaloriesGoal = (state: StoreType) => state.food.goal.calories
export const selectCarbsGoal = (state: StoreType) => state.food.goal.carbs
export const selectFatGoal = (state: StoreType) => state.food.goal.fat
export const selectProteinsGoal = (state: StoreType) => state.food.goal.proteins
export const selectTodayFood = (state: StoreType) => state.food.items