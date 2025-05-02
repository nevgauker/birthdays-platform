import { PageProps } from '@/lib/types'

interface PublicPartyPageProps {
    params: PageProps
}

import PublicPartyClient from '@/components/PublicPartyClient'

interface PublicPartyPageProps {
    params: PageProps
}

export default async function PublicPartyPage({ params }: PublicPartyPageProps) {

    const { id } = await params
    return <PublicPartyClient partyId={id} />
}


