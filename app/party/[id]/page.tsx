// // app/party/[id]/page.tsx
// import { prisma } from '@/lib/db'
// import Image from 'next/image'

// export default async function PartyInvitationPage({ params }: { params: { id: string } }) {
//     const party = await prisma.party.findUnique({
//         where: { id: params.id },
//     })

//     if (!party) {
//         return <p className="text-center mt-10 text-red-600">Party not found 😢</p>
//     }

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow">
//             {party.imageUrl && (
//                 <div className="mb-6">
//                     <Image
//                         src={party.imageUrl}
//                         alt="Party Image"
//                         width={800}
//                         height={400}
//                         className="rounded-xl object-cover w-full h-64"
//                     />
//                 </div>
//             )}

//             <h1 className="text-3xl font-bold mb-2">{party.title}</h1>
//             <p className="text-gray-600 mb-4">
//                 {new Date(party.date).toLocaleDateString()} at {party.time}
//             </p>
//             <p className="text-lg mb-4 whitespace-pre-line">{party.description}</p>

//             <div className="mb-4">
//                 <span className="font-semibold">Location: </span>{party.address}
//             </div>

//             {party.rsvpLink && (
//                 <a
//                     href={party.rsvpLink}
//                     target="_blank"
//                     className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                     RSVP Here
//                 </a>
//             )}
//         </div>
//     )
// }

// app/party/[id]/page.tsx

import { getPartyById } from '@/actions/partyActions'
import { displayDate } from '@/utils/dateFormatters'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function PublicPartyPage({ params }: { params: { id: string } }) {
    const party = await getPartyById(params.id)

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

