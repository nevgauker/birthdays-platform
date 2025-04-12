// app/(main)/create/page.tsx

import PartyForm from "@/components/PartyForm";

export default function CreatePartyPage() {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">🎨 Create a Party</h1>
            <PartyForm />
        </div>
    )
}