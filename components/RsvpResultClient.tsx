'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RsvpResultClient() {
    const params = useSearchParams()
    const status = params.get('status')
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

    return <p className="text-lg">{message}</p>
}
