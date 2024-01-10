"use server"

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type UserFoodSelector = {
    userId: string,
    name: string|undefined,
    calories: number|undefined,
    carbs: number|undefined,
    fat: number|undefined,
    proteins: number|undefined,
    createdAt: Date
}

export const addFood = async ({
    userId,
    name=undefined,
    calories=undefined,
    carbs=undefined,
    fat=undefined,
    proteins=undefined,
    createdAt=new Date()
}: UserFoodSelector) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const insertion = await prisma.userFood.create({
        data: {
            userId,
            name,
            calories,
            carbs,
            fat,
            proteins,
            createdAt,
            displayType: (carbs !== undefined && fat !== undefined && proteins !== undefined) ? 1 : 0
        }
    })
    return insertion
}

export const updateUserGoal = async ({userId, goalName, goalValue}: {userId: string, goalName: string, goalValue: number}) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const res = await prisma.userGoals.update({
        where: {
            userId
        },
        data: {
            [goalName]: goalValue
        }
    })

    return res
}

export const deleteFood = async({ userId, id}: {userId: string, id: string}) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const res = await prisma.userFood.delete({
        where: {
            userId,
            id
        }
    })

    return res
}