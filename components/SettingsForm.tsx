'use client'

import { updateUserSettings } from '@/actions/userSettings'
import { UserSetting } from '@prisma/client'
import { useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'


export default function SettingsForm({ settings }: { settings: UserSetting }) {
    const [webhook, setWebhook] = useState(settings.webhook || '')
    const [rsvpReminders, setRsvpReminders] = useState<string>(settings.rsvpReminders || 'Off')


    const { user } = useUser()
    const [isPending, startTransition] = useTransition()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!user?.id) return


        startTransition(() => {
            updateUserSettings(user.id, { webhook, rsvpReminders })
                .then(() => alert('Settings saved!'))
                .catch(() => alert('Failed to save settings'))
        })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <label className="block mb-2 font-semibold" htmlFor="webhook">
                Webhook URL
            </label>
            <input
                id="webhook"
                type="text"
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                placeholder="https://example.com/webhook"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            {/* RSVP Reminder Switch */}
            <div className='mb-2'>
                <label className="block font-semibold mb-1">RSVP Reminders</label>
                <div className="flex space-x-4">
                    {['Off', '1', '3'].map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setRsvpReminders(option as 'Off' | '1' | '3')}
                            className={`px-4 py-2 rounded border ${rsvpReminders === option
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Save
            </button>
        </form>
    )
}
