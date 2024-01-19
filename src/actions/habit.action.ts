"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type HabitsParameters = {
    userId: string,
    name: string|undefined,
    repeatSchema: string|undefined,
    moment: string|undefined,
    createdAt?: number|Date,
    startAt: number|Date|undefined,
    endsAt: number|Date|undefined
}

export const addHabit = async ({
    userId,
    name=undefined,
    repeatSchema=undefined,
    moment=undefined,
    startAt=undefined,
    endsAt=undefined
}: HabitsParameters) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    console.log(userId, name, repeatSchema, moment, startAt, endsAt);
    

    const insertion = await prisma.userHabit.create({
        data: {
            userId,
            name,
            repeatSchema,
            moment,
            startAt,
            endsAt
        }
    })

    return insertion
}

export const deleteHabit = async ({
    userId,
    habitId
}: {userId: string, habitId: string}) => {
    const session = await getAuthSession()

    if (!session?.user) throw new Error('The session is invalid')

    if (session?.user?.id !== userId) throw new Error('The session user is invalid')

    const deletion = await prisma.userHabit.deleteMany({
        where: {
            userId,
            id: habitId
        }
    })

    return deletion
}