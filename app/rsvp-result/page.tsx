// app/rsvp-result/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RsvpResultPage() {
    const params = useSearchParams()
    const status = params.get('status') // "approved" or "rejected"

    const [message, setMessage] = useState('')

    useEffect(() => {
        if (status === 'approved') {
            setMessage('🎉 Thank you for confirming your attendance! We look forward to seeing you.')
        } else if (status === 'rejected') {
            setMessage('😢 Sorry you can’t make it. We hope to see you next time.')
        } else {
            setMessage('Invalid response. Please contact the event organizer.')
        }
    }, [status])

    return (
        <div className="max-w-xl mx-auto text-center mt-20 px-4">
            <h1 className="text-3xl font-bold mb-4">RSVP Response</h1>
            <p className="text-lg">{message}</p>
        </div>
    )
}
