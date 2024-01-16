"use client"

import { cn } from "@/lib/utils"
import { useSelector } from "react-redux"
import { selectDate } from "../../dateSelector/dateSlice"
import { getHabitOfDay } from "@/lib/habits"
import { MouseEventHandler, useState } from "react"
import { Check } from "lucide-react"

export const HabitsList = ({ habits }: {habits: any}) => {
    const date = new Date(useSelector(selectDate))

    const selectedDayHabits = getHabitOfDay(habits, date)

    return (<ul>
        {selectedDayHabits.map((habit: any) => <HabitElement habit={habit} key={habit.id} />)}
    </ul>)
}

export const HabitElement = ({ habit, props }: {habit:any, props?: any}) => {
    const [active, setActive] = useState(false)
    const [skipped, setSkipped] = useState(false)
    const [validated, setValidated] = useState(false)

    const onValidate = () => {
        setActive(false)
        setValidated(true)
    }
    const onSkip = () => {
        setActive(false)
        setSkipped(true)
    }
    const onUndo = () => {
        setActive(false)
        if (validated) setValidated(false)
        if (skipped) setSkipped(false)
    }

    return (<div className="relative w-full h-14">
        <div className={cn(
            "absolute left-0 top-0 bottom-0 w-14 bg-green-600 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
            (active && !validated && !skipped) ? "opacity-100 scale-100" : ""
        )} onClick={onValidate}>
            <Check className="text-xl" />
        </div>

        <div className={cn(
            "bg-gray-800 absolute left-0 top-0 bottom-0 right-0 rounded-lg cursor-pointer flex flex-wrap items-center justify-start pl-3 font-bold transition-all delay-75",
            active ? "right-28" : "",
            (active && !validated && !skipped) ? "left-16 right-28": "",
            (skipped || validated) ? "opacity-50" : ""
        )} onClick={() => setActive(!active)}>
            <div>
                <span className="m-0">{habit.name}</span>
                {
                    validated ? <p className="w-full text-xs font-normal text-green-500 flex items-center justify-start"><Check className="mr-1" /> Complétée</p> : ""
                }
                {
                    skipped ? <p className="w-full text-xs font-normal text-blue-500 flex items-center justify-start"><Check className="mr-1" /> Ignorée</p> : ""
                }
            </div>
        </div>

        <div className={cn(
            "absolute right-0 top-0 bottom-0 w-[6.5rem] flex items-center justify-between opacity-0 scale-0 transition-all delay-75",
            active ? "opacity-100 scale-100" : ""
        )}>
            {(validated || skipped) ? <div className={cn(
                "w-24 h-full bg-orange-500 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
                active ? "opacity-100 scale-100" : ""
            )} onClick={onUndo}>
                Annuler
            </div> : <div className={cn(
                "w-24 h-full bg-blue-600 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
                active ? "opacity-100 scale-100" : ""
            )} onClick={onSkip}>
                Passer
            </div>}
        </div>
    </div>)
}