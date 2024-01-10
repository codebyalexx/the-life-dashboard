import { FoodItem, foodSlice } from "@/src/features/layout/food/foodSlice"
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
        date: Date
    }
}

export const store = configureStore({
    reducer: {
        food: foodSlice.reducer
    }
})