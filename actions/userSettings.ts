'use server'

import { prisma } from '@/lib/db'

export async function getOrCreateUserSettings(userId: string) {
    if (!userId) throw new Error('User ID is required')

    try {
        const existingSettings = await prisma.userSetting.findUnique({
            where: { userId },
        })

        if (existingSettings) {
            return existingSettings
        }

        const newSettings = await prisma.userSetting.create({
            data: {
                userId,
                webhook: null,
                rsvpReminders: "Off",
            },
        })

        return newSettings
    } catch (error) {
        console.error('Error fetching/creating user settings:', error)
        throw new Error('Failed to retrieve user settings')
    }
}

export async function updateUserSettings(userId: string, data: { webhook: string; rsvpReminders: string }) {
    try {
        const mappedData = {
            ...data,
        }
        const settings = await prisma.userSetting.upsert({
            where: { userId },
            update: mappedData,
            create: {
                userId,
                ...mappedData,
            },
        })
        return settings
    } catch (error) {
        console.error('Error updating settings:', error)
        throw new Error('Could not update user settings')
    }
}

