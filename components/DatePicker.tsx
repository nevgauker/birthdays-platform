'use client'

type Props = {
    value: string
    onChange: (val: string) => void
}

export const DatePicker = ({ value, onChange }: Props) => (
    <div>
        <label className="block font-medium text-gray-700">Date</label>
        <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
        />
    </div>
)
