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
                didConfirm: true,
            },
        })
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

        return NextResponse.redirect(`${baseUrl}/rsvp-result?status=approved`)

        // return NextResponse.json({ success: true, message: 'RSVP approved. See you there!' })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Could not update RSVP status' }, { status: 500 })
    }
}
