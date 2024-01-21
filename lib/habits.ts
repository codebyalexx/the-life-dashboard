export const getHabitOfDay = (habits: any, date: Date) => {
    const alwaysShow = ["Daily", "Weekly", "Monthly"]
    const daysArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return habits.filter((habit: any) => {
        if (alwaysShow.includes(habit.repeatSchema))
            return true

        if (habit.repeatSchema === daysArray[
            getDayIndexWithMonday(date)
        ]) 
            return true

        return false
    })
}

export const getDayIndexWithMonday = (date: Date) => {
    const dayIndex = date.getDay()
    if (dayIndex === 1) return 0
    return {
        0: 6,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5
    }[dayIndex] || -1
}

export const isHabitWeekValidated = (habit: any, date: Date) => {
    const DAY = 1
    
    const week = new Array()
    date.setDate(date.getDate() - getDayIndexWithMonday(date))

    for (let i = 0; i < 7 ;i++) {
        week.push(new Date(date))
        date.setDate(date.getDate() + DAY)
    }

    for (const day of week) {
        const strings = [
            `s${(day.setHours(0,0,0,0).toFixed())}`,
            `v${(day.setHours(0,0,0,0).toFixed())}`
        ]

        if (habit.doneDays.some((x: {date: string}) => strings.includes(x.date)))
            return true
    }

    return false
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