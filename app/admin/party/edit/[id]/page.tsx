// app/admin/edit/[id]/page.tsx

import { getPartyById } from '@/actions/partyActions'
import PartyForm from '@/components/PartyForm'

interface EditPartyPageProps {
    params: { id: string }
}

export default async function EditPartyPage({ params }: EditPartyPageProps) {
    const party = await getPartyById(params.id)

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">🎨 Update a Party</h1>
            <PartyForm party={party ?? undefined} />
        </div>
    )
}
