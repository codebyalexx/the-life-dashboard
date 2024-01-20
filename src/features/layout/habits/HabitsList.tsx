"use client"

import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { selectDate } from "../../dateSelector/dateSlice"
import { getHabitOfDay } from "@/lib/habits"
import {  useState } from "react"
import { Check, Info } from "lucide-react"
import useSound from "use-sound"
import yipee from "@/public/yipee.mp3"
import skip from "@/public/skip.mp3"
import { selectHabits, toggleHabitSkipped, toggleHabitValidated } from "./habitsSlice"
import { toggleDoneDayString } from "@/src/actions/habit.action"

export const HabitsList = ({ className }: {className?: string}) => {
    const habits = useSelector(selectHabits)

    const date = new Date(useSelector(selectDate))

    const selectedDayHabits = getHabitOfDay(habits, date)

    return (<ul className={className}>
        {selectedDayHabits.length > 0 ? selectedDayHabits.sort((a, b) => a.validated - b.validated).sort((a, b) => a.skipped - b.skipped).map((habit: any) => <HabitElement habit={habit} key={habit.id} />) : <li className="w-full">
            <p className="text-foreground font-semibold text-center px-8 flex flex-col items-center justify-center"><Info className="mb-2 text-blue-500" /> On dirait bien que vous n&apos;avez pas d&apos;habitudes à réaliser aujourd&apos;hui !</p>
        </li>}
    </ul>)
}

export const HabitElement = ({ habit, props }: {habit:any, props?: any}) => {
    const dispatch = useDispatch()
    const [playYipee] = useSound(yipee)
    const [playSkip] = useSound(skip)

    const [active, setActive] = useState(false)
    const {skipped, validated} = habit

    return (<div className="relative w-full h-14 mb-2">
        <div className={cn(
            "absolute left-0 top-0 bottom-0 w-14 bg-green-600 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
            (active && !validated && !skipped) ? "opacity-100 scale-100" : ""
        )} onClick={async () => {
            dispatch(toggleHabitValidated(habit.id))
            await toggleDoneDayString({
                habitId: habit.id,
                toggleString: `v${(new Date().setHours(0,0,0,0))}`
            })
            setActive(false)
            playYipee()
        }}>
            <Check className="text-xl" />
        </div>

        <div className={cn(
            "bg-black/90 text-white dark:bg-white/10 absolute left-0 top-0 bottom-0 right-0 rounded-lg cursor-pointer flex flex-wrap items-center justify-start pl-3 font-bold transition-all delay-75",
            active ? "right-28" : "",
            (active && !validated && !skipped) ? "left-16 right-28": "",
            (skipped || validated) ? "opacity-50" : ""
        )} onClick={() => {
            setActive(!active)
        }}>
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
            )} onClick={async () => {
                setActive(false)
                if (validated) {
                    await toggleDoneDayString({
                        habitId: habit.id,
                        toggleString: `v${(new Date().setHours(0,0,0,0))}`
                    })
                    dispatch(toggleHabitValidated(habit.id))
                }

                if (skipped) {
                    await toggleDoneDayString({
                        habitId: habit.id,
                        toggleString: `s${(new Date().setHours(0,0,0,0))}`
                    })
                    dispatch(toggleHabitSkipped(habit.id))
                }
            }}>
                Annuler
            </div> : <div className={cn(
                "w-24 h-full bg-blue-600 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
                active ? "opacity-100 scale-100" : ""
            )} onClick={async () => {
                dispatch(toggleHabitSkipped(habit.id))
                await toggleDoneDayString({
                    habitId: habit.id,
                    toggleString: `s${(new Date().setHours(0,0,0,0))}`
                })
                setActive(false)
                playSkip()
            }}>
                Passer
            </div>}
        </div>
    </div>)
}