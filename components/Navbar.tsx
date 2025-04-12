'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link href="/admin" className="text-xl font-semibold text-blue-600">🎉 Party Admin</Link>
            <UserButton afterSignOutUrl="/" />
        </nav>
    )
}
