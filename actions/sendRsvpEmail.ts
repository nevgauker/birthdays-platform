// app/actions/sendRsvpEmail.ts
'use server'

import { resend } from '@/lib/resend'
import { generateRsvpEmail } from '@/utils/generateRsvpEmail'

export async function sendRsvpEmail({
    to,
    guestName,
    guestId,
    partyId,
    partyName,
}: {
    to: string
    guestName: string
    guestId: string
    partyId: string
    partyName: string
}) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const { html, text } = generateRsvpEmail({
        guestName,
        partyName,
        guestId,
        partyId,
        baseUrl,
    })

    try {
        const result = await resend.emails.send({
            from: 'Parties Bot <onboarding@resend.dev>',
            to,
            subject: `You're invited to ${partyName}!`,
            text,
            html,
        })

        return { success: true, result }
    } catch (error) {
        console.error('Failed to send RSVP email:', error)
        return { success: false, error }
    }
}
