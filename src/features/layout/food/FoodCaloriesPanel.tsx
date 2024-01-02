"use client";

import {cn} from "@/lib/utils";
import {Progress} from "@/components/ui/progress";
import {useState} from "react";
import GoalDrawer from "./GoalDrawer";

export const FoodCaloriesPanel = ({ props, className }: any) => {
    return (<div {...props} className={cn('rounded-lg bg-black/5 dark:bg-white/15', className)}>
        <div className={'p-3 py-5'}>
            <div className={'flex flex-row items-end justify-between mb-1'}>
                <h3 className={'text-3xl font-bold mr-4'}>1500 <span className={'text-sm font-normal text-muted-foreground'}>Kcal</span></h3>
                <p className={'text-sm font-medium'}><GoalDrawer /> Goal 1800 kcal</p>
            </div>
            <Progress value={(15/18)*100} className={'w-full'} />
        </div>
        <div className={'w-full p-3 py-5 bg-black/10 dark:bg-white/5 rounded-b-lg'}>
            <ul className={'grid grid-cols-3 gap-10'}>
                <li>
                    <h4 className={'font-semibold text-sm'}>Glucides</h4>
                    <p className={'font-medium text-sm text-foreground/80 mb-1'}>200 g <span className={'text-muted-foreground'}>/ 250 g</span></p>
                    <Progress value={(20/25)*100} className={'w-full h-1'} />
                </li>
                <li>
                    <h4 className={'font-semibold text-sm'}>Lipides</h4>
                    <p className={'font-medium text-sm text-foreground/80 mb-1'}>50 g <span className={'text-muted-foreground'}>/ 60 g</span></p>
                    <Progress value={(50/60)*100} className={'w-full h-1'} />
                </li>
                <li>
                    <h4 className={'font-semibold text-sm'}>Protéines</h4>
                    <p className={'font-medium text-sm text-foreground/80 mb-1'}>100 g <span className={'text-muted-foreground'}>/ 120 g</span></p>
                    <Progress value={(100/120)*100} className={'w-full h-1'} />
                </li>
            </ul>
        </div>
    </div>)
}