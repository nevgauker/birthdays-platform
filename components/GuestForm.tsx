'use client'

import { addGuest } from '@/actions/guestActions'
import { useFormStatus } from 'react-dom'

interface GuestFormProps {
    partyId: string
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={pending}
        >
            {pending ? 'Adding...' : 'Add Guest'}
        </button>
    )
}

export default function GuestForm({ partyId }: GuestFormProps) {
    return (
        <form action={addGuest} className="space-y-4 bg-gray-100 p-4 rounded mb-8">
            <h2 className="text-xl font-semibold">Add a Guest</h2>

            <input type="hidden" name="partyId" value={partyId} />

            <input
                className="w-full border p-2 rounded"
                placeholder="Name"
                name="name"
                required
            />
            <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                name="email"
                type="email"
                required
            />
            <input
                className="w-full border p-2 rounded"
                placeholder="Phone (optional)"
                name="phone"
            />
            <SubmitButton />
        </form>
    )
}
