import { DateSelector } from "@/src/features/dateSelector/DateSelector";
import { HabitsList } from "@/src/features/layout/habits/HabitsList";
import { getAuthSession } from "@/lib/auth";
import { getHabits } from "@/src/queries/habit.query";
import { HabitsAdder } from "@/src/features/layout/habits/HabitsAdder";
import { Separator } from "@/components/ui/separator";
import { HabitsLoader } from "@/src/features/layout/habits/HabitsLoader";

export default async function Habits() {
    const session = await getAuthSession()
    const habits = await getHabits({
        userId: session?.user?.id
    })

    return (<div>
        <HabitsLoader userHabits={habits} />
        <DateSelector className="mb-4" />
        <HabitsList className="mb-4" />
        <Separator className="mb-4" />
        <HabitsAdder session={session} className="mb-4" />
    </div>)
}