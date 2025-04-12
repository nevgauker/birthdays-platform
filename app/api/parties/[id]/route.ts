// app/api/parties/[id]/route.ts
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const party = await prisma.party.findUnique({ where: { id: params.id } })
    return NextResponse.json(party)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json()

    const updated = await prisma.party.update({
        where: { id: params.id },
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

    return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.party.delete({
        where: { id: params.id },
    })

    return NextResponse.json({ success: true })
}

