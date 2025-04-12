import Navbar from '@/components/Navbar'
import { auth } from '@clerk/nextjs/server'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    auth() // Protect the route on the server

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
