import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const guestId = searchParams.get('guestId')

    if (!guestId) {
        return NextResponse.json({ error: 'Missing guest ID' }, { status: 400 })
    }

    try {
        await prisma.guest.update({
            where: { id: guestId },
            data: {
                didRespond: true,
                didConfirm: false,
            },
        })
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

        return NextResponse.redirect(`${baseUrl}/rsvp-result?status=rejected`)


        // return NextResponse.json({ success: true, message: 'RSVP declined. Sorry you can’t make it.' })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Could not update RSVP status' }, { status: 500 })
    }
}
