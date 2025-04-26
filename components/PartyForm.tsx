'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { createParty } from '@/actions/partyActions'
import Image from 'next/image'
import { DatePicker } from '@/components/DatePicker'
import { TimePicker } from '@/components/TimePicker'
import { Party } from '@prisma/client'

const partySchema = z.object({
    title: z.string().min(1),
    address: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    time: z.string().min(1),
    imageUrl: z.string().optional(),
    rsvpLink: z.string().url().optional(),
})


interface PartyFormProps {
    party?: Party
}

export default function PartyForm({ party }: PartyFormProps) {
    const router = useRouter()

    const [title, setTitle] = useState(party?.title ?? 'Birthday Bash 🎉')
    const [address, setAddress] = useState(party?.address ?? '123 Party St, Fun City')
    const [description, setDescription] = useState(party?.description ?? '')
    const [date, setDate] = useState(party?.date.toString() ?? '')
    const [time, setTime] = useState(party?.time ?? '')
    const [imageUrl, setImageUrl] = useState(party?.imageUrl ?? '/images/1.png')
    const [rsvpLink, setRsvpLink] = useState(party?.rsvpLink ?? undefined)
    const [editingTitle, setEditingTitle] = useState(false)
    const [editingAddress, setEditingAddress] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(title, address, description, date, time, imageUrl, rsvpLink)

        const validation = partySchema.safeParse({
            title, address, description, date, time, imageUrl, rsvpLink,
        })

        if (!validation.success) {
            alert('Please fill in all required fields correctly.')
            return
        }

        const newParty = await createParty(validation.data)
        if (newParty) {
            alert('Party created successfully!')
            router.push('/admin')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Postcard */}
            <div className="relative bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-inner mb-6 overflow-hidden" style={{ aspectRatio: '1747/1240' }}>
                {/* Editable Title */}
                <div
                    className="absolute top-4 left-4 text-xl font-bold text-pink-600 cursor-pointer z-10"
                    onClick={() => setEditingTitle(true)}
                >
                    {editingTitle ? (
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => setEditingTitle(false)}
                            autoFocus
                            className="border-b border-pink-300 bg-transparent focus:outline-none"
                        />
                    ) : (
                        title
                    )}
                </div>

                {/* Editable Address */}
                <div
                    className="absolute bottom-4 right-4 text-sm text-gray-700 italic cursor-pointer z-10"
                    onClick={() => setEditingAddress(true)}
                >
                    {editingAddress ? (
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            onBlur={() => setEditingAddress(false)}
                            autoFocus
                            className="border-b border-gray-400 bg-transparent text-right focus:outline-none"
                        />
                    ) : (
                        address
                    )}
                </div>

                {/* Background Image */}
                <Image
                    src={imageUrl}
                    alt="Postcard"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Image Selector */}
            <div className="flex justify-center gap-4 mb-6">
                {['/images/1.png', '/images/2.png', '/images/3.png'].map((img, i) => (
                    <button key={i} type="button" onClick={() => setImageUrl(img)} className="border-2 border-gray-300 rounded-lg p-1 hover:scale-105 transition">
                        <Image src={img} alt={`Image ${i + 1}`} width={100} height={100} className="rounded-lg" />
                    </button>
                ))}
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <DatePicker value={date} onChange={setDate} />
                <TimePicker value={time} onChange={setTime} />

                <div>
                    <label className="block font-medium text-gray-700">RSVP Link</label>
                    <input
                        type="url"
                        value={rsvpLink}
                        onChange={(e) => setRsvpLink(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {party ? 'Update Party' : 'Create Party'}
                </button>
            </div>
        </form>
    )
}
