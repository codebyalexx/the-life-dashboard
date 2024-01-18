"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { HabitItem, setItems } from "./habitsSlice"

export const HabitsLoader = ({ userHabits }: {userHabits: HabitItem[]}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setItems(userHabits.map((item: any) => {
            return {
                ...item,
                createdAt: new Date(item.createdAt).getTime(),
                startAt: new Date(item.startAt).getTime(),
                endsAt: new Date(item.endsAt).getTime()
            }
        })))
    }, [dispatch, userHabits])
    return null
}