// app/api/parties/route.ts
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const data = await req.json()

        const newParty = await prisma.party.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                time: data.time,
                address: data.address,
                imageUrl: data.imageUrl || null,
                rsvpLink: data.rsvpLink || null,
            },
        })

        return NextResponse.json(newParty, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error creating party' }, { status: 500 })
    }
}
