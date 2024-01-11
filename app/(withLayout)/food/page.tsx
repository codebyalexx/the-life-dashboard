import React from "react";
import {FoodCaloriesPanel} from "@/src/features/layout/food/FoodCaloriesPanel";
import { FoodAdder } from "@/src/features/layout/food/FoodAdder";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { getFood, getGoals } from "@/src/queries/food.query";
import { FoodLoader } from "@/src/features/layout/food/FoodLoader";
import { FoodList } from "@/src/features/layout/food/FoodList";
import { DateSelector } from "@/src/features/dateSelector/DateSelector";

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
        <h3 className="text-lg font-semibold mb-2">Liste des aliments</h3>
        <FoodList session={session} />
    </div>)
}