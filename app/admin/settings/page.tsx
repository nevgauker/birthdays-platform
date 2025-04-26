// app/settings/page.tsx

import { getOrCreateUserSettings } from '@/actions/userSettings'
import SettingsForm from '@/components/SettingsForm'
import { auth } from '@clerk/nextjs/server'

export default async function SettingsPage() {

    const { userId } = await auth()

    if (!userId) {
        return <div className="p-6">Unauthorized</div>
    }

    const settings = await getOrCreateUserSettings(userId)


    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>
            <SettingsForm settings={settings} />
        </div>
    )
}
