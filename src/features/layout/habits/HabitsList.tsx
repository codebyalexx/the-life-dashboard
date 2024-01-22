"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getHabitOfDay, mapHabits } from "@/lib/habits"
import { cn } from "@/lib/utils"
import skip from "@/public/skip.mp3"
import yipee from "@/public/yipee.mp3"
import { deleteHabit, toggleDoneDayString } from "@/src/actions/habit.action"
import { Check, Info, Trash2 } from "lucide-react"
import { Session } from "next-auth"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSound from "use-sound"
import { selectDate } from "../../dateSelector/dateSlice"
import { removeItem, selectHabits, toggleHabitString } from "./habitsSlice"

export const HabitsList = ({ className, session }: {className?: string, session: Session}) => {
    const habits = useSelector(selectHabits)
    const date = new Date(useSelector(selectDate))

    let selectedDayHabits = getHabitOfDay(habits, date)
    let mappedDayHabits = mapHabits(selectedDayHabits, date)

    return (<ul className={className}>
        {mappedDayHabits.length > 0 ? mappedDayHabits.sort((a, b) => a.validated - b.validated).sort((a, b) => a.skipped - b.skipped).map((habit: any) => <HabitElement habit={habit} key={habit.id} session={session} />) : <li className="w-full">
            <p className="flex flex-col items-center justify-center px-8 font-semibold text-center text-foreground"><Info className="mb-2 text-blue-500" /> On dirait bien que vous n&apos;avez pas d&apos;habitudes à réaliser aujourd&apos;hui !</p>
        </li>}
    </ul>)
}

export const HabitElement = ({ habit, session }: {habit:any, session: Session}) => {
    const dispatch = useDispatch()
    const dateAsNumber = useSelector(selectDate)
    const date = new Date(dateAsNumber)
    const [playYipee] = useSound(yipee)
    const [playSkip] = useSound(skip)

    const [active, setActive] = useState(false)
    const {skipped, validated} = habit

    return (<div className="relative w-full mb-2 h-14">
        <div className={cn(
            "absolute left-0 top-0 bottom-0 w-14 bg-green-600 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
            (active && !validated && !skipped) ? "opacity-100 scale-100" : ""
        )} onClick={async () => {
            console.log(date, dateAsNumber);
            dispatch(toggleHabitString({
                str: `v${(date.setHours(0,0,0,0).toFixed())}`,
                habitId: habit.id
            }))
            await toggleDoneDayString({
                habitId: habit.id,
                toggleString: `v${(date.setHours(0,0,0,0).toFixed())}`
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
                    validated ? <p className="flex items-center justify-start w-full text-xs font-normal text-green-500"><Check className="mr-1" /> Complétée</p> : ""
                }
                {
                    skipped ? <p className="flex items-center justify-start w-full text-xs font-normal text-blue-500"><Check className="mr-1" /> Ignorée</p> : ""
                }
            </div>
            <HabitRemover habit={habit} className={active ? "opacity-100" : "opacity-0"} session={session} />
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
                        toggleString: `v${(date.setHours(0,0,0,0).toFixed())}`
                    })
                    dispatch(toggleHabitString({
                        str: `v${(date.setHours(0,0,0,0).toFixed())}`,
                        habitId: habit.id
                    }))
                }

                if (skipped) {
                    await toggleDoneDayString({
                        habitId: habit.id,
                        toggleString: `s${(date.setHours(0,0,0,0).toFixed())}`
                    })
                    dispatch(toggleHabitString({
                        str: `s${(date.setHours(0,0,0,0).toFixed())}`,
                        habitId: habit.id
                    }))
                }
            }}>
                Annuler
            </div> : <div className={cn(
                "w-24 h-full bg-blue-600 text-white flex items-center justify-center rounded-lg cursor-pointer opacity-0 scale-0 transition-all delay-75",
                active ? "opacity-100 scale-100" : ""
            )} onClick={async () => {
                dispatch(toggleHabitString({
                    str: `s${(date.setHours(0,0,0,0).toFixed())}`,
                    habitId: habit.id
                }))
                await toggleDoneDayString({
                    habitId: habit.id,
                    toggleString: `s${(date.setHours(0,0,0,0).toFixed())}`
                })
                setActive(false)
                playSkip()
            }}>
                Passer
            </div>}
        </div>
    </div>)
}

export const HabitRemover = ({ habit, className, session }: {habit: any, className?: string, session: Session }) => {
    const dispatch = useDispatch()
    const {toast} = useToast()
    
    return (<AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant={'ghost'} className={cn(
                "absolute right-2 flex items-center justify-center transition-all delay-75",
                className
            )} onClick={(e) => {
                e.stopPropagation()
            }}>
                <Trash2 size={16} />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression ?</AlertDialogTitle>
            <AlertDialogDescription>
              L&apos;habitude <span className="font-bold underline text-slate-300">{habit.name}</span> sera <span className="font-bold">supprimée</span>, cette action est irréverssible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
                await deleteHabit({
                    userId: session?.user?.id,
                    habitId: habit.id
                })
                
                dispatch(removeItem(habit.id))

                toast({
                    title: 'Mise à jour',
                    description: `L'habitude ${habit.name} a été supprimé`
                })
            }}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )
}