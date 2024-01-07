export const getTodayFood = (userFood: any) => {
    return userFood.filter((food: any) => {
        const todaysDate = new Date();
        const foodDate = new Date(food.createdAt)
        return foodDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)
    })
}

export const getTotalNutriments = (userFood: any) => {
    return {
        carbs: userFood.reduce((acc: number, current: any) => acc + current.carbs, 0),
        fat: userFood.reduce((acc: number, current: any) => acc + current.fat, 0),
        proteins: userFood.reduce((acc: number, current: any) => acc + current.proteins, 0)
    }
}

export const getTotalCalories = ({ carbs, fat, proteins }: {
    carbs: number, fat: number, proteins: number
}) => 0 + carbs *4 + fat * 9 + proteins * 4