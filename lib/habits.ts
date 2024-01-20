export const getHabitOfDay = (habits: any, date: Date) => {
    return habits.filter((habit: any) => {
        if (habit.repeatSchema === "Daily") return true
        return false
    })
}

export const mapHabits = (habits: any) => {
    return habits.map((habit: any) => {
        return {
            ...habit,
            skipped: habit.doneDays?.some((x: any) => x.date === `s${(new Date().setHours(0,0,0,0))}`) || false,
            validated: habit.doneDays?.some((x: any) => x.date === `v${(new Date().setHours(0,0,0,0))}`) || false
        }
    })
}