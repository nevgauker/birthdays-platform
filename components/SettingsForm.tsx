'use client'

import { updateUserSettings } from '@/actions/userSettings'
import { UserSetting } from '@prisma/client'
import { useState, useTransition } from 'react'
import { useUser } from '@clerk/nextjs'

export default function SettingsForm({ settings }: { settings: UserSetting }) {
    const [webhook, setWebhook] = useState(settings.webhook || '')
    const rsvpStr = settings.rsvpReminders as 'Off' | '1' | '3'
    const [rsvpReminders, setRsvpReminders] = useState<'Off' | '1' | '3'>(rsvpStr || 'Off')
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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
            {/* Webhook Section */}
            <div>
                <label className="block mb-2 font-semibold" htmlFor="webhook">
                    Webhook URL
                </label>
                <input
                    id="webhook"
                    type="text"
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                    placeholder="https://example.com/webhook"
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-2"
                />
                <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded mt-2">
                    <p className="mb-2 font-semibold">📦 Webhook Payload Example:</p>
                    <pre className="bg-gray-200 p-2 rounded overflow-x-auto text-xs">
                        {`{
  "action": "send_invite_to_all",
  "data": [
    {
      "id": "guest123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
    }
  ]
}`}
                    </pre>
                    <ul className="mt-2 list-disc list-inside text-xs text-gray-700">
                        <li><strong>action</strong>: What action is being triggered (e.g., send invite to one guest, or to all unconfirmed guests).</li>
                        <li><strong>data</strong>: A list of guest objects (each with id, name, email, home, and didConfirm).</li>
                    </ul>
                </div>
            </div>

            {/* RSVP Reminder Switch */}
            <div>
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

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
                disabled={isPending}
            >
                {isPending ? 'Saving...' : 'Save Settings'}
            </button>
        </form>
    )
}
