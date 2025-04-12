// app/party/[id]/page.tsx
import { prisma } from '@/lib/db'
import Image from 'next/image'

export default async function PartyInvitationPage({ params }: { params: { id: string } }) {
    const party = await prisma.party.findUnique({
        where: { id: params.id },
    })

    if (!party) {
        return <p className="text-center mt-10 text-red-600">Party not found 😢</p>
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow">
            {party.imageUrl && (
                <div className="mb-6">
                    <Image
                        src={party.imageUrl}
                        alt="Party Image"
                        width={800}
                        height={400}
                        className="rounded-xl object-cover w-full h-64"
                    />
                </div>
            )}

            <h1 className="text-3xl font-bold mb-2">{party.title}</h1>
            <p className="text-gray-600 mb-4">
                {new Date(party.date).toLocaleDateString()} at {party.time}
            </p>
            <p className="text-lg mb-4 whitespace-pre-line">{party.description}</p>

            <div className="mb-4">
                <span className="font-semibold">Location: </span>{party.address}
            </div>

            {party.rsvpLink && (
                <a
                    href={party.rsvpLink}
                    target="_blank"
                    className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    RSVP Here
                </a>
            )}
        </div>
    )
}
