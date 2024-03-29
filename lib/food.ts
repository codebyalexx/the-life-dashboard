import { isSameDay } from "./date"

export const getFoodOfDay = (userFood: any, date: Date) => {
    return userFood.filter((food: any) => {
        const foodDate = new Date(food.createdAt)
        return isSameDay(foodDate, date)
    })
}

export const getTotalNutriments = (userFood: any) => {
    return {
        carbs: userFood.reduce((acc: number, current: any) => acc + current.carbs, 0),
        fat: userFood.reduce((acc: number, current: any) => acc + current.fat, 0),
        proteins: userFood.reduce((acc: number, current: any) => acc + current.proteins, 0)
    }
}

export const getTotalCaloriesFromNutriments = ({ carbs, fat, proteins }: {
    carbs: number, fat: number, proteins: number
}) => 0 + carbs *4 + fat * 9 + proteins * 4

export const getTotalCaloriesFromCaloriesFood = (userFood: any) => {
    return userFood.reduce((acc: number, current: any) => acc + current.calories, 0) as number
}