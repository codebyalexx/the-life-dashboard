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
        items: [],
        date: new Date().getTime()
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
            state.items = action.payload.map((item: any) => {
                return {
                    ...item,
                    createdAt: new Date(item.createdAt).getTime()
                }
            })
        },
        addItem: (state: any, action) => {
            state.items = [...state.items, {...action.payload, createdAt: new Date(action.payload.createdAt).getTime()}]
        },
        removeItem: (state, action: {payload:string}) => {
            state.items = [...state.items.filter((i: any) => i.id !== action.payload)]
        },
        setDay: (state, action: {payload: Date}) => {
            state.date === action.payload.getTime()
        },
        nextDay: (state) => {
            const day = 60 * 60 * 24 * 1000;
            const date = new Date(state.date)
            state.date = new Date(date.getTime() + day).getTime()
        },
        previousDay: (state) => {
            const day = 60 * 60 * 24 * 1000;
            const date = new Date(state.date)
            state.date = new Date(date.getTime() - day).getTime()
        }
    },
})

export const { adjustCaloriesGoal, adjustCarbsGoal, adjustFatGoal, adjustProteinsGoal, setGoal, setItems, addItem, removeItem, setDay, nextDay, previousDay } = foodSlice.actions

export const selectGoal = (state: StoreType) => state.food.goal
export const selectCaloriesGoal = (state: StoreType) => state.food.goal.calories
export const selectCarbsGoal = (state: StoreType) => state.food.goal.carbs
export const selectFatGoal = (state: StoreType) => state.food.goal.fat
export const selectProteinsGoal = (state: StoreType) => state.food.goal.proteins
export const selectTodayFood = (state: StoreType) => state.food.items
export const selectDate = (state: StoreType) => state.food.date