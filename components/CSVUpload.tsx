// components/CSVUpload.tsx (Client Component)

'use client'

import { useState } from 'react'

interface CSVUploadProps {
    partyId: string
}

export default function CSVUpload({ partyId }: CSVUploadProps) {
    const [csvFile, setCsvFile] = useState<File | null>(null)

    const uploadCSV = async () => {
        if (!csvFile) return

        const formData = new FormData()
        formData.append('file', csvFile)
        formData.append('partyId', partyId)

        await fetch('/api/guest/upload', {
            method: 'POST',
            body: formData,
        })

        setCsvFile(null)
    }

    return (
        <div className="bg-gray-100 p-4 rounded mb-8">
            <h2 className="text-xl font-semibold mb-2">Import Guests via CSV</h2>
            <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                className="mb-2"
            />
            <button
                onClick={uploadCSV}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload CSV
            </button>
        </div>
    )
}
