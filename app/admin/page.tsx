// app/admin/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { DeletePartyButton } from '@/components/DeleteBtn'

export default async function AdminPage() {

    const parties = await prisma.party.findMany({
        orderBy: { date: 'desc' },
    })

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="mb-6">
                <Link
                    href="/admin/create"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create New Party
                </Link>
            </div>

            {parties.length === 0 ? (
                <p>No parties found.</p>
            ) : (
                <ul className="space-y-4">
                    {parties.map((party) => (
                        <li key={party.id} className="border p-4 rounded-xl shadow">
                            <h2 className="text-xl font-semibold">{party.title}</h2>
                            <p className="text-sm text-gray-600">
                                {new Date(party.date).toLocaleDateString()} at {party.time}
                            </p>
                            <p className="mt-1 text-gray-800">{party.address}</p>

                            <div className="mt-2 flex gap-4 flex-wrap">
                                <Link
                                    href={`/admin/edit/${party.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>

                                <Link
                                    href={`/party/${party.id}`}
                                    className="text-green-600 hover:underline"
                                >
                                    View
                                </Link>
                                <DeletePartyButton id={party.id} />

                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
