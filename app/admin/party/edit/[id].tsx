// app/admin/edit/[id]/page.tsx

import { getPartyById } from '@/actions/partyActions'
import PartyForm from '@/components/PartyForm'
import { PageProps } from '@/lib/types'

interface EditPartyPageProps {
    params: PageProps
}
export default async function EditPartyPage({ params }: EditPartyPageProps) {

    const { id } = await params

    const party = await getPartyById(id)

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">🎨 Update a Party</h1>
            <PartyForm party={party ?? undefined} />
        </div>
    )
}
