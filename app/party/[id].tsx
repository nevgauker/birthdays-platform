
import { getPartyById } from '@/actions/partyActions'
import { PageProps } from '@/lib/types'
import { displayDate } from '@/utils/dateFormatters'
import Image from 'next/image'
import { notFound } from 'next/navigation'


interface PublicPartyPageProps {
    params: PageProps
}

export default async function PublicPartyPage({ params }: PublicPartyPageProps) {
    const { id } = await params
    const party = await getPartyById(id)

    if (!party) return notFound()

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="relative bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-inner mb-6 overflow-hidden" style={{ aspectRatio: '1747/1240' }}>

                <Image
                    src={party.imageUrl ?? ''}
                    alt={party.title}
                    fill
                    className="object-cover"
                />

                {/* Name - top left */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-lg font-semibold px-3 py-1 rounded">
                    {party.title}
                </div>

                {/* Address - bottom right */}
                <div className="absolute bottom-2 right-2 bg-white/80 text-black text-sm px-3 py-1 rounded">
                    {party.address}
                </div>
                {/* Date & time - bottom left */}
                <div className="absolute bottom-2 left-2 bg-white/80 text-black text-sm px-3 py-1 rounded">
                    {`${displayDate(party.date)} ${party.time}`}
                </div>
            </div>
        </div>
    )
}

