import React from "react";
import {frenchMonth} from "@/lib/date";
import {FoodCaloriesPanel} from "@/src/features/layout/food/FoodCaloriesPanel";
import { FoodAdder } from "@/src/features/layout/food/FoodAdder";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { getFood, getGoals } from "@/src/queries/food.query";
import { FoodLoader } from "@/src/features/layout/food/FoodLoader";

export default async function Food() {
    const session = await getAuthSession()
    const userFood = await getFood(session?.user?.id)
    const userGoals = await getGoals(session?.user?.id)

    const date = new Date()
    
    return (<div className={'px-4'}>
        <FoodLoader userFood={userFood} userGoals={userGoals} />
        <h2 className={'text-2xl font-semibold mb-4'}>
            Calories
            <span className={'block mt-1'}>
                d&apos;Aujourd&apos;hui&nbsp;&nbsp;
                <span className={'text-sm text-muted-foreground font-normal'}>{date.getDate()} {frenchMonth[date.getMonth()]} {date.getFullYear()}</span>
            </span>
        </h2>
        <FoodCaloriesPanel session={session} />
        <Separator className="my-4" />
        <FoodAdder session={session} />
        <Separator className="my-4" />
        <h3 className="text-lg font-semibold mb-2">Liste des aliments (aujourd&apos;hui)</h3>
    </div>)
}