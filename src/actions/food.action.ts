"use server"

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type UserFoodSelector = {
    userId: string,
    carbs: number,
    fat: number,
    proteins: number
}

export const addFood = async ({
    userId,
    carbs,
    fat,
    proteins
}: UserFoodSelector) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const insertion = await prisma.userFood.create({
        data: {
            userId,
            carbs,
            fat,
            proteins
        }
    })

    return insertion
}