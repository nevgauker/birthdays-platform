'use client'

import { useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { getGuestByIdAndParty } from '@/actions/guestActions'
import { getPartyById } from '@/actions/partyActions'
import { Party } from '@prisma/client'
import Image from 'next/image'
import { displayDate } from '@/utils/dateFormatters'
import html2canvas from 'html2canvas'

interface PublicPartyClientProps {
    partyId: string
}

export default function PublicPartyClient({ partyId }: PublicPartyClientProps) {
    const { user } = useUser()
    const [authorized, setAuthorized] = useState(false)
    const [checkingGuest, setCheckingGuest] = useState(false)
    const [guestIdInput, setGuestIdInput] = useState('')
    const [party, setParty] = useState<Party | null>(null)
    const mainDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (user?.id) {
            setAuthorized(true)
            fetchParty()
        }
    }, [user])

    const fetchParty = async () => {
        const party = await getPartyById(partyId)
        setParty(party)
    }

    const handleGuestLogin = async () => {
        setCheckingGuest(true)
        const exists = await getGuestByIdAndParty(guestIdInput, partyId)

        if (exists) {
            setAuthorized(true)
            fetchParty()
        } else {
            alert('Guest ID not found or invalid for this party.')
        }

        setCheckingGuest(false)
    }

    const handleGenerateImage = async () => {
        if (!mainDivRef.current) return

        const canvas = await html2canvas(mainDivRef.current)
        const imgData = canvas.toDataURL('image/png')

        const link = document.createElement('a')
        link.href = imgData
        link.download = 'invite_party.png'
        link.click()
    }

    if (!authorized) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">🔒 Access Party</h2>
                <input
                    type="text"
                    placeholder="Enter your Guest ID"
                    value={guestIdInput}
                    onChange={(e) => setGuestIdInput(e.target.value)}
                    className="border w-full px-4 py-2 mb-4 rounded"
                />
                <button
                    onClick={handleGuestLogin}
                    disabled={checkingGuest}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {checkingGuest ? 'Checking...' : 'Enter'}
                </button>
            </div>
        )
    }

    if (!party) {
        return <div className="text-center mt-10">Loading party details...</div>
    }

    return (
        <>
            <div ref={mainDivRef} className="max-w-3xl mx-auto p-6">
                <div className="relative bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-inner mb-6 overflow-hidden" style={{ aspectRatio: '1747/1240' }}>
                    <Image
                        src={party.imageUrl ?? ''}
                        alt={party.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-lg font-semibold px-3 py-1 rounded">
                        {party.title}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-white/80 text-black text-sm px-3 py-1 rounded">
                        {party.address}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/80 text-black text-sm px-3 py-1 rounded">
                        {`${displayDate(party.date)} ${party.time}`}
                    </div>
                </div>
            </div>
            {user?.id && (
                <div className="border-t pt-6 flex justify-center">
                    <button
                        onClick={handleGenerateImage}
                        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                    >
                        📸 Generate Party Image
                    </button>
                </div>
            )}
        </>
    )
}
