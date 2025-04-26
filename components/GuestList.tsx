// components/GuestList.tsx (Client Component)

'use client'

import { Guest } from "@prisma/client"

interface GuestListProps {
    guests: Guest[]
}


function GuestRow({ guest }: { guest: Guest }) {
    return (
        <li className="border p-2 rounded">
            <div className="flex justify-between">
                <div>
                    <strong>{guest.name}</strong> - {guest.email} {guest.phone && `(${guest.phone})`}
                </div>
                <div>
                    {guest.didConfirm ? 'Confirmed' : 'Not Confirmed'}
                    <button className="text-red-500 hover:text-red-700">Delete</button>
                </div>

            </div>
        </li>
    )
}

export default function GuestList({ guests }: GuestListProps) {
    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Guest List</h2>
            <ul className="space-y-2">
                {guests.map((guest: Guest) => (
                    <GuestRow key={guest.id} guest={guest} /> // Use the GuestRow component for each guest
                ))}
            </ul>
        </div>
    )
}
