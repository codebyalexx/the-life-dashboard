"use client";

import {cn} from "@/lib/utils";
import {Progress} from "@/components/ui/progress";
import GoalDrawer from "./GoalDrawer";
import { useSelector } from "react-redux";
import { selectGoal, selectTodayFood } from "./foodSlice";
import { getTotalCaloriesFromCaloriesFood, getTodayFood, getTotalCaloriesFromNutriments, getTotalNutriments } from "@/lib/food";

export const FoodCaloriesPanel = ({ session, userFood, userGoals, props, className }: any) => {
    const rGoal = useSelector(selectGoal)
    const rFood = useSelector(selectTodayFood)

    // Calc food
    const todayFood = getTodayFood(rFood)
    const nutrimentsFood = [...todayFood.filter((f: any) => f.displayType === 1)]
    const caloriesFood = [...todayFood.filter((f: any) => f.displayType === 0)]
    const totalNutriments = getTotalNutriments(nutrimentsFood)
    const totalCalories = getTotalCaloriesFromNutriments(totalNutriments) + getTotalCaloriesFromCaloriesFood(caloriesFood)

    return (<div {...props} className={cn('rounded-lg bg-black/5 dark:bg-white/15', className)}>
        <div className={'p-3 py-5'}>
            <div className={'flex flex-row items-end justify-between mb-1'}>
                <h3 className={'text-3xl font-bold mr-4'}>{totalCalories} <span className={'text-sm font-normal text-muted-foreground'}>Kcal</span></h3>
                <p className={'text-sm font-medium'}><GoalDrawer session={session} /> Goal {rGoal.calories} kcal</p>
            </div>
            <Progress value={(totalCalories/rGoal.calories)*100} className={'w-full'} />
        </div>
        <div className={'w-full p-3 py-5 bg-black/10 dark:bg-white/5 rounded-b-lg'}>
            <ul className={'grid grid-cols-3 gap-10'}>
                <li>
                    <h4 className={'font-semibold text-sm'}>Glucides</h4>
                    <p className={'font-medium text-sm text-foreground/80 mb-1'}>{totalNutriments.carbs} g <span className={'text-muted-foreground'}>/ {rGoal.carbs} g</span></p>
                    <Progress value={(totalNutriments.carbs/rGoal.carbs)*100} className={'w-full h-1'} />
                </li>
                <li>
                    <h4 className={'font-semibold text-sm'}>Lipides</h4>
                    <p className={'font-medium text-sm text-foreground/80 mb-1'}>{totalNutriments.fat} g <span className={'text-muted-foreground'}>/ {rGoal.fat} g</span></p>
                    <Progress value={(totalNutriments.fat/rGoal.fat)*100} className={'w-full h-1'} />
                </li>
                <li>
                    <h4 className={'font-semibold text-sm'}>Protéines</h4>
                    <p className={'font-medium text-sm text-foreground/80 mb-1'}>{totalNutriments.proteins} g <span className={'text-muted-foreground'}>/ {rGoal.proteins} g</span></p>
                    <Progress value={(totalNutriments.proteins/rGoal.proteins)*100} className={'w-full h-1'} />
                </li>
            </ul>
        </div>
    </div>)
}