'use client'

import { UserButton } from '@clerk/nextjs'
import { Cog6ToothIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link href="/admin" className="text-xl font-semibold text-blue-600">🎉 Party Admin</Link>

            <div className="flex items-center space-x-4">
                <Link
                    href="/admin/settings"
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    title="Settings"
                >
                    <Cog6ToothIcon className="h-6 w-6 text-gray-700" />
                </Link>
                <UserButton afterSignOutUrl="/" />
            </div>

        </nav>
    )
}
