import { FoodItem, foodSlice } from "@/src/features/layout/food/foodSlice"
import { configureStore } from "@reduxjs/toolkit"

export type StoreType = {
    food: {
        goal: number,
        items: FoodItem[]
    }
}

export const store = configureStore({
    reducer: {
        food: foodSlice.reducer
    }
})