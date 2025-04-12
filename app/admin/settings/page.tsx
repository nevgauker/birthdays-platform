'use client'

import { useState } from 'react'

export default function AutomationSettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [rsvpReminders, setRsvpReminders] = useState(true)
    const [socialSharing, setSocialSharing] = useState(false)
    const [calendarIntegration, setCalendarIntegration] = useState(true)
    const [eventAnalytics, setEventAnalytics] = useState(true)

    const handleSave = () => {
        // Logic to save settings, e.g., update user settings in the database
        console.log('Automation settings saved')
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">Automation Settings</h1>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    {/* Email Notifications */}
                    <div>
                        <label className="block font-medium text-gray-700">
                            Enable Email Notifications
                        </label>
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="mr-2"
                        />
                    </div>

                    {/* RSVP Reminders */}
                    <div>
                        <label className="block font-medium text-gray-700">
                            Enable RSVP Reminders
                        </label>
                        <input
                            type="checkbox"
                            checked={rsvpReminders}
                            onChange={() => setRsvpReminders(!rsvpReminders)}
                            className="mr-2"
                        />
                    </div>

                    {/* Social Media Sharing */}
                    <div>
                        <label className="block font-medium text-gray-700">
                            Enable Social Media Sharing
                        </label>
                        <input
                            type="checkbox"
                            checked={socialSharing}
                            onChange={() => setSocialSharing(!socialSharing)}
                            className="mr-2"
                        />
                    </div>

                    {/* Calendar Integration */}
                    <div>
                        <label className="block font-medium text-gray-700">
                            Enable Calendar Integration
                        </label>
                        <input
                            type="checkbox"
                            checked={calendarIntegration}
                            onChange={() => setCalendarIntegration(!calendarIntegration)}
                            className="mr-2"
                        />
                    </div>

                    {/* Event Analytics */}
                    <div>
                        <label className="block font-medium text-gray-700">
                            Enable Event Analytics
                        </label>
                        <input
                            type="checkbox"
                            checked={eventAnalytics}
                            onChange={() => setEventAnalytics(!eventAnalytics)}
                            className="mr-2"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Save Settings
                </button>
            </form>
        </div>
    )
}
