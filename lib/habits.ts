export const getHabitOfDay = (habits: any, date: Date) => {
    return habits.filter((habit: any) => {
        if (habit.repeatSchema === "Daily") return true
        return false
    })
}

export const mapHabits = (habits: any, date: Date) => {
    return habits.map((habit: any) => {
        return {
            ...habit,
            skipped: habit.doneDays?.some((x: any) => x.date === `s${(date.setHours(0,0,0,0).toFixed())}`) || false,
            validated: habit.doneDays?.some((x: any) => x.date === `v${(date.setHours(0,0,0,0).toFixed())}`) || false
        }
    })
}