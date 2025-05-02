'use client'

import { getPartyTitleById } from "@/actions/partyActions"
import { sendRsvpEmail } from "@/actions/sendRsvpEmail"
import { Guest } from "@prisma/client"
import { useTransition } from "react"


interface GuestRowProps {
    guest: Guest
    partyTitle: string
}
function GuestRow({ guest, partyTitle }: GuestRowProps) {
    const [isPending, startTransition] = useTransition()


    const handleSendEmail = () => {
        startTransition(() => {
            sendRsvpEmail({ 'partyId': guest.partyId, 'guestId': guest.id, 'guestName': guest.name, 'to': guest.email, 'partyName': partyTitle })
                .then(() => alert(`RSVP email sent to ${guest.email}`))
                .catch(() => alert(`Failed to send email to ${guest.email}`))
        })
    }

    return (
        <li className="border p-2 rounded">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm text-gray-500">{guest.id}</div>
                    <strong>{guest.name}</strong> - {guest.email} {guest.phone && `(${guest.phone})`}
                </div>
                <div className="text-right space-y-1">
                    <div>{guest.didRespond ? '✅ Responded' : '❌ Not Responded'}</div>
                    <div>{guest.didConfirm ? '🎉 Attending' : '❌ Not Attending'}</div>
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={handleSendEmail}
                            disabled={isPending}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            {isPending ? 'Sending...' : 'Send RSVP Email'}
                        </button>
                        <button className="text-red-500 hover:underline text-sm">Delete</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

interface GuestListProps {
    guests: Guest[]
    partyTitle: string
}

export default function GuestList({ guests, partyTitle }: GuestListProps) {

    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Guest List</h2>
            <ul className="space-y-2">
                {guests.map((guest: Guest) => (
                    <GuestRow key={guest.id} guest={guest} partyTitle={partyTitle} />
                ))}
            </ul>
        </div>
    )
}
