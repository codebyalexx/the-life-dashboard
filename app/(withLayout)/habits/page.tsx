import { DateSelector } from "@/src/features/dateSelector/DateSelector";
import { HabitsList } from "@/src/features/layout/habits/HabitsList";
import { getAuthSession } from "@/lib/auth";
import { getHabits } from "@/src/queries/habit.query";
import { HabitsAdder } from "@/src/features/layout/habits/HabitsAdder";
import { Separator } from "@/components/ui/separator";

export default async function Habits() {
    const session = await getAuthSession()
    const habits = await getHabits({
        userId: session?.user?.id
    })

    return (<div>
        <DateSelector className="mb-4" />
        <HabitsList habits={habits} className="mb-4" />
        <Separator className="mb-4" />
        <HabitsAdder className="mb-4" />
    </div>)
}