export const getHabitOfDay = (habits: any, date: Date) => {
    return habits.filter((habit: any) => {
        if (habit.repeatSchema === "Daily") return true
        return false
    })
}