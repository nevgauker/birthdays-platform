// app/admin/[partyId]/guests/page.tsx (Server Component)

import { getGuestsByPartyId } from '@/actions/guestActions'
import { getPartyTitleById } from '@/actions/partyActions'
import GuestForm from '@/components/GuestForm'
import GuestList from '@/components/GuestList'
import { PageProps } from '@/lib/types'

interface GuestsPageProps {
    params: PageProps
}
export default async function GuestsPage({ params }: GuestsPageProps) {
    const { id } = await params
    // Fetch guests on the server side
    const guests = await getGuestsByPartyId(id)
    const partyTitle = await getPartyTitleById(id)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🎉 Manage Guests</h1>

            {/* Manual Add Guest Form */}
            <GuestForm partyId={id} />

            {/* Guest List */}
            <GuestList guests={guests} partyTitle={partyTitle ?? ''} />

        </div>
    )
}
