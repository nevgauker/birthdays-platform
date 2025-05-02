import { generateRsvpLinks } from "./linksGenerator"

export function generateRsvpEmail({
    guestName,
    partyName,
    guestId,
    partyId,
    baseUrl,
}: {
    guestName: string
    partyName: string
    guestId: string
    partyId: string
    baseUrl: string
}) {
    const { acceptLink, declineLink } = generateRsvpLinks({ guestId, partyId, baseUrl })

    const text = `
Hi ${guestName},

You're invited to ${partyName}!

Please confirm your attendance by clicking one of the options below:

✅ Yes, I'll attend: ${acceptLink}

❌ No, I can't make it: ${declineLink}

Hope to see you there!
`

    const html = `
  <div style="font-family: sans-serif; line-height: 1.5">
    <p>Hi <strong>${guestName}</strong>,</p>
    <p>You're invited to <strong>${partyName}</strong>!</p>
    <p>Please confirm your attendance:</p>
    <p>
      <a href="${acceptLink}" style="background: #16a34a; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">✅ Yes, I'll attend</a>
    </p>
    <p>
      <a href="${declineLink}" style="background: #dc2626; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">❌ No, I can't make it</a>
    </p>
    <p>Hope to see you there!</p>
  </div>
`

    return { text, html }
}
