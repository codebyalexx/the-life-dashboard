export const frenchMonth = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
]

export const isSameDay = (dateOne: Date, dateTwo: Date) => {
    return dateOne.setHours(0,0,0,0) == dateTwo.setHours(0,0,0,0)
}

export const getDateLabel = (date: Date) => {
    const day = 60 * 60 * 24 * 1000;

    const today = new Date()
    const yesterday = new Date(today.getTime() - day)
    const tomorrow = new Date(today.getTime() + day)

    if (isSameDay(date, today)) {
        return "Aujourd'hui"
    } else if (isSameDay(date, yesterday)) {
        return "Hier"
    } else if (isSameDay(date, tomorrow)) {
        return "Demain"
    } else return ""
}