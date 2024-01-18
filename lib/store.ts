import { dateSlice } from "@/src/features/dateSelector/dateSlice"
import { FoodItem, foodSlice } from "@/src/features/layout/food/foodSlice"
import { HabitItem, habitsSlice } from "@/src/features/layout/habits/habitsSlice"
import { configureStore } from "@reduxjs/toolkit"

export type StoreType = {
    food: {
        goal: {
            calories: number,
            carbs: number,
            fat: number,
            proteins: number
        },
        items: FoodItem[],
    },
    date: number,
    habits: {
        items: HabitItem[]
    }
}

export const store = configureStore({
    reducer: {
        food: foodSlice.reducer,
        date: dateSlice.reducer,
        habits: habitsSlice.reducer
    }
})