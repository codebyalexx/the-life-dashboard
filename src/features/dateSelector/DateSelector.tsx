"use client"

import { useDispatch, useSelector } from "react-redux"
import { nextDay, previousDay, selectDate } from "./dateSlice"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { frenchMonth, getDateLabel } from "@/lib/date"

export const DateSelector = ({ className }: {className?: string}) => {
    const dispatch = useDispatch()
    const date = new Date(useSelector(selectDate))

    return (<div className={className}>
        <h2 className={'text-2xl font-semibold mb-4 flex items-center justify-between'}>
            <Button variant={'ghost'} onClick={() => {
                dispatch(previousDay())
            }}>
                <ChevronLeft />
            </Button>
            <span className={'block mt-1'}>
                {getDateLabel(date).length > 0 ? <>
                    {getDateLabel(date)}
                    <span className={'ml-2 text-sm text-muted-foreground font-normal'}>{date.getDate()} {frenchMonth[date.getMonth()]} {date.getFullYear()}</span>
                </> : <span>{date.getDate()} {frenchMonth[date.getMonth()]} {date.getFullYear()}</span>}
            </span>
            <Button variant={'ghost'} onClick={() => {
                dispatch(nextDay())
            }}>
                <ChevronRight />
            </Button>
        </h2>
    </div>)
}