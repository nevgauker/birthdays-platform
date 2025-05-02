export function generateRsvpLinks({
    guestId,
    partyId,
    baseUrl,
}: {
    guestId: string
    partyId: string
    baseUrl: string // e.g. "https://yourdomain.com"
}) {
    const acceptLink = `${baseUrl}/api/guest/rsvp/approve?guestId=${guestId}&partyId=${partyId}&response=true`
    const declineLink = `${baseUrl}/api/guest/rsvp/reject?guestId=${guestId}&partyId=${partyId}&response=false`

    return { acceptLink, declineLink }
}
