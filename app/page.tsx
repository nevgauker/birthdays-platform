'use client'

import Image from 'next/image'
import React from 'react'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen min-w-screen">
      {/* Background Image */}

      <Image
        src="/images/bg.png"
        alt="Background"
        fill
        priority
        className="object-cover z-0"

      />



      {/* Hero Section */}
      <section className="text-white text-center py-20 px-6 z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to PartyPlanner!</h1>
        <p className="mt-4 text-xl">Create, plan, and manage unforgettable birthday parties.</p>
        <a
          href="/admin"
          className="mt-6 inline-block bg-yellow-400 text-blue-600 font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition hover:bg-yellow-300"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 text-white z-10 relative">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">Easy Event Creation</h2>
            <p className="mt-4">
              Quickly set up your event with our easy-to-use tools and start inviting your guests!
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">Personalized Invitations</h2>
            <p className="mt-4">
              Create custom invitations that make your event stand out.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold">Track RSVPs</h2>
            <p className="mt-4">
              Monitor who’s coming and manage your guest list efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section id="cta" className="text-white text-center py-20 px-6 z-10 relative">
        <h2 className="text-3xl font-bold">Ready to Plan Your Perfect Party?</h2>
        <p className="mt-4 text-lg">Join now and start creating your events with ease.</p>
        <a
          href="/signup"
          className="mt-6 inline-block bg-yellow-400 text-blue-600 font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition hover:bg-yellow-300"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  )
}
