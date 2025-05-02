import { Suspense } from 'react'
import RsvpResultClient from '@/components/RsvpResultClient'

export default function RsvpResultPage() {
    return (
        <div className="max-w-xl mx-auto text-center mt-20 px-4">
            <h1 className="text-3xl font-bold mb-4">RSVP Response</h1>
            <Suspense fallback={<p>Loading response...</p>}>
                <RsvpResultClient />
            </Suspense>
        </div>
    )
}
