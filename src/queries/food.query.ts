"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const getFood = async (userId) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const res = await prisma.userFood.findMany({
        where: {
            userId
        },
        select: {
            carbs: true,
            proteins: true,
            fat: true,
            createdAt: true,
        }
    })

    return res
}