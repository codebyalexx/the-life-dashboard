"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const getFood = async (userId: string) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const res = await prisma.userFood.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            calories: true,
            displayType: true,
            carbs: true,
            proteins: true,
            fat: true,
            createdAt: true,
        }
    })

    return res
}

export const getGoals = async (userId: string) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const res = await prisma.userGoals.findUnique({
        where: {
            userId
        },
        select: {
            calories: true,
            carbs: true,
            fat: true,
            proteins: true
        }
    })

    if (res === null) {
        const insert = await prisma.userGoals.create({
            data: {
                userId,
            }
        })

        return insert
    }

    return res
}
