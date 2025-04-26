'use server'

import { prisma } from '@/lib/db'
import { Guest } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const guestSchema = z.object({
    partyId: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
})

export async function addGuest(formData: FormData) {
    const data = {
        partyId: formData.get('partyId'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    }

    const parsed = guestSchema.safeParse(data)
    if (!parsed.success) {
        console.error(parsed.error)
        throw new Error('Invalid form data')
    }

    const { partyId, name, email, phone } = parsed.data

    await prisma.guest.create({
        data: {
            partyId,
            name,
            email,
            phone,
        },
    })

    revalidatePath(`/admin/${partyId}/guests`)
}



export async function getGuestsByPartyId(partyId: string) {
    if (!partyId) {
        throw new Error('Party ID is required')
    }

    try {
        const guests = await prisma.guest.findMany({
            where: { partyId },
            orderBy: { createdAt: 'desc' },
        })

        return guests
    } catch (error) {
        console.error('Error fetching guests:', error)
        throw new Error('Failed to fetch guests')
    }
}

