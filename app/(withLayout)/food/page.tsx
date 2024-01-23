import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { DateSelector } from "@/src/features/dateSelector/DateSelector";
import { FoodAdder } from "@/src/features/layout/food/FoodAdder";
import { FoodCaloriesPanel } from "@/src/features/layout/food/FoodCaloriesPanel";
import { FoodList } from "@/src/features/layout/food/FoodList";
import { FoodLoader } from "@/src/features/layout/food/FoodLoader";
import { getFood, getGoals } from "@/src/queries/food.query";

export default async function Food() {
    const session = await getAuthSession()
    const userFood = await getFood(session?.user?.id)
    const userGoals = await getGoals(session?.user?.id)
    
    return (<div className={'px-4'}>
        <FoodLoader userFood={userFood} userGoals={userGoals} />
        <DateSelector />
        <FoodCaloriesPanel session={session} />
        <Separator className="my-4" />
        <FoodAdder session={session} />
        <Separator className="my-4" />
        <h3 className="mb-2 text-lg font-semibold">Liste des aliments</h3>
        <FoodList session={session} />
    </div>)
}