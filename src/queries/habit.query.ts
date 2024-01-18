"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const getHabits = async ({
    userId
}: {userId: string}) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const select = await prisma.userHabit.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            repeatSchema: true,
            createdAt: true,
            startAt: true,
            endsAt: true,
            doneDays: {
                select: {
                    id: true,
                    date: true,
                    habitId: true
                }
            },
        }
    })

    return select
}
