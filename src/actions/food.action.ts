"use server"

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type UserFoodSelector = {
    userId: string,
    name: string,
    calories: number,
    carbs: number,
    fat: number,
    proteins: number,
    createdAt: Date
}

export const addFood = async ({
    userId,
    name='Unnamed',
    calories=0,
    carbs=0,
    fat=0,
    proteins=0,
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
            displayType: (calories > 0) ? 0 : 1
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