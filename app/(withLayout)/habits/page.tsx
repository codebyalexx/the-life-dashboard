import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { DateSelector } from "@/src/features/dateSelector/DateSelector";
import { HabitsAdder } from "@/src/features/layout/habits/HabitsAdder";
import { HabitsList } from "@/src/features/layout/habits/HabitsList";
import { HabitsLoader } from "@/src/features/layout/habits/HabitsLoader";
import { getHabits } from "@/src/queries/habit.query";

export default async function Habits() {
    const session = await getAuthSession()
    const habits = await getHabits({
        userId: session?.user?.id
    })

    return (<div>
        <HabitsLoader userHabits={habits} />
        <DateSelector className="mb-4" />
        <HabitsList className="mb-4" session={session} />
        <Separator className="mb-4" />
        <HabitsAdder session={session} className="mb-4" />
    </div>)
}