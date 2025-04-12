'use server'
import { prisma } from "@/lib/db"
import { Party } from "@prisma/client"


interface PartyData {
    title: string
    address: string
    description: string
    date: string
    time: string
    imageUrl?: string
    rsvpLink?: string
}

export async function createParty({
    title,
    address,  // Make sure to use 'address'
    description,
    date,
    time,
    imageUrl,
    rsvpLink,
}: PartyData) {

    try {
        const newParty = await prisma.party.create({
            data: {
                title,
                address,  // Updated to 'address'
                description,
                date: new Date(date),
                time,
                imageUrl,
                rsvpLink,
            },
        })

        return newParty
    } catch (error) {
        console.error('Error creating party:', error)
        throw new Error('There was an error creating the party')
    }
}


export async function editParty({
    title,
    address,  // Make sure to use 'address'
    description,
    date,
    time,
    imageUrl,
    rsvpLink,
}: PartyData) {

}



export async function getPartyById(id: string) {
    try {
        const party = await prisma.party.findUnique({
            where: { id }
        })

        if (!party) {
            throw new Error('Party not found')
        }

        return party as Party

    } catch (err) {
        console.error('Error fetching party by ID:', err)
        return null
    }
}