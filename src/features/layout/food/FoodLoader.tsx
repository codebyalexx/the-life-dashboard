"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setGoal, setItems } from "./foodSlice"

export const FoodLoader = ({ userFood, userGoals }: {userFood: any, userGoals: any}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setItems(userFood.map((item: any) => {
            return {
                ...item,
                createdAt: new Date(item.createdAt).getTime()
            }
        })))
        dispatch(setGoal(userGoals))
    }, [])
    return null
}