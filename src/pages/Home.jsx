import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import transmissionImage from '../assets/characters/Transmission_001_Characters_Discovery.png'
import hiroImage from '../assets/characters/Hiro.png'
import yokoImage from '../assets/characters/Yoko.png'
import akiraImage from '../assets/characters/Akira.png'


function Home() {

  const transmissionText = `
SUBJECT 01 // UNKNOWN Record origin null. Access trace missing. Sector 07. ID 002 // Profile fragment recovered 32%. Affiliation unlisted. Source not found. Sector 09 // Camera feed interrupted. 47 second blackout. ID 003 detected. Trace lost. Archive node inconsistency detected. Three entities present with no upload event. Record integrity 41%. Origin // UNLISTED Status // ACTIVE Source // UNKNOWN Trace failed. No account. No creation event. No external source. Data returned after deletion. Missing fragment 02 Unauthorized movement. Access log corrupted. Signal unstable Identity map incomplete. Recovery process still running. //
`

  function corruptText(text, intensity = 0.20) {

    const symbols = [
      '#', '@', '%', '&', '?', '/', '$', '*', '!', '^', '-'
    ]

    return text
      .split('')
      .map((char) => {

        if (
          char === ' ' ||
          Math.random() > intensity
        ) {
          return char
        }

        return symbols[
          Math.floor(Math.random() * symbols.length)
        ]

      })
      .join('')

  }

  const [corruptedTransmission, setCorruptedTransmission] =
    useState(transmissionText)

  useEffect(() => {

    let speed = 180
    let timeout

    function animateCorruption() {

      setCorruptedTransmission(
        corruptText(transmissionText)
      )

      speed = Math.max(35, speed - 4)

      timeout = setTimeout(
        animateCorruption,
        speed
      )

    }

    animateCorruption()

    return () => clearTimeout(timeout)

  }, [])

  return (

    <div>


      {/* INTRO */}

      <div className="flex p-6 md:p-20">

        <div>

          <span className="text-[42px] md:text-[80px] font-bold">
            UNLISTED®
          </span>

          <div>

            <img
              src={transmissionImage}
              alt="Characters"
              className="w-full h-auto"
            />

          </div>

          <p>

            Three identities appeared where no record of them should exist.
            No files. No origin. No history. They were simply there — buried
            somewhere inside the archive as if they had always belonged to it.
            Every attempt to trace their source returned nothing, yet fragments
            connected to them continue to surface: corrupted records, missing
            timestamps, intercepted signals and traces that should not exist.
            Their names are Akira, Hiro and Yoko. Beyond that, almost everything
            remains unknown. The archive holds what was left behind. Explore
            their recovered profiles, follow the fragments and uncover the
            events hidden between the missing records. Something happened here.
            The archive remembers more than it should.

          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-5">

            <NavLink to="/characters">

              <button className="primary flex items-center gap-1">
                The Archive
                <ArrowUpRight />
              </button>

            </NavLink>

            <NavLink to="/transmissions">
              <button className="secondary flex items-center gap-1">
                Latest Transmission
                <ArrowUpRight />
              </button>
            </NavLink>

          </div>

        </div>

      </div>


      {/* IDENTITIES */}

      <div className="flex p-6 md:p-20">

        <div className="w-full">

          <h1>
            02 - 03 IDENTITIES FOUND
          </h1>

          <h2 className="mt-10">
            // UNLISTED PROFILES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">

            <div>

              <h3>
                ID // 001
              </h3>

              <img
                src={hiroImage}
                alt="Hiro"
                className="w-full border-2 hover:translate-y-1 hover:border-[#C5E300] transition-all duration-300 hover:cursor-pointer"
              />

              <p className="mt-2">
                IDENTITY // UNKNOWN
                <br />
                ORIGIN // UNLISTED
              </p>

            </div>

            <div>

              <h3>
                ID // 002
              </h3>

              <img
                src={yokoImage}
                alt="Yoko"
                className="w-full border-2 hover:translate-y-1 hover:border-[#C5E300] transition-all duration-300 hover:cursor-pointer"
              />

              <p className="mt-2">
                IDENTITY // UNKNOWN
                <br />
                ORIGIN // UNLISTED
              </p>

            </div>

            <div>

              <h3>
                ID // 003
              </h3>

              <img
                src={akiraImage}
                alt="Akira"
                className="w-full border-2 hover:translate-y-1 hover:border-[#C5E300] transition-all duration-300 hover:cursor-pointer"
              />

              <p className="mt-2">
                IDENTITY // UNKNOWN
                <br />
                ORIGIN // UNLISTED
              </p>

            </div>


          </div>

          <NavLink to="/characters">

            <button className="primary w-full flex justify-center items-center gap-2 mt-5">

              Access All Profiles
              <ArrowUpRight />

            </button>

          </NavLink>

        </div>

      </div>


      {/* ABOUT THE WORLD */}

      <div className="flex p-6 md:p-20">

        <div>

          <h1>
            03 - ABOUT THE WORLD
          </h1>

          <h2 className="mt-10">
            WHAT EXISTS HERE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">

            <div>

              <span className="font-bold text-primary">
                TRANSMISSIONS
              </span>

              <p className="mt-2">

                Recovered fragments, intercepted messages and unexplained
                events documenting what continues to happen inside the archive.
                Each transmission reveals another piece of information, from
                newly detected anomalies to records that were never supposed
                to exist. Some may provide answers. Others may only create
                more questions.

              </p>

            </div>

            <div>

              <span className="font-bold text-primary">
                CHARACTERS
              </span>

              <p className="mt-2">

                Three unidentified profiles appeared inside the archive without
                any known origin, history or trace of how they arrived. Their
                identities — Akira, Hiro and Yoko — are known, but much of their
                data remains incomplete or corrupted. Explore their recovered
                records and uncover the fragments still attached to each of them.

              </p>

            </div>

            <div>

              <span className="font-bold text-primary">
                MISSIONS
              </span>

              <p className="mt-2">

                Interactive investigations connected to the three unidentified
                profiles. Examine corrupted records, reconstruct missing
                information, follow traces and interact with the archive to
                recover what was lost. Every mission reveals another fragment
                of the story and brings you closer to understanding what happened.

              </p>

            </div>

            <div>

              <span className="font-bold text-primary">
                PROFILE
              </span>

              <p className="mt-2">

                Your personal record inside the archive. Follow your progression
                as you investigate its contents, complete missions and recover
                information hidden throughout the system. Your XP, completed
                missions and unlocked titles are stored here, creating a record
                of everything you have uncovered along the way.

              </p>

            </div>

          </div>

        </div>

      </div>


      {/* LATEST TRANSMISSION */}

      <div className="flex p-6 md:p-20">

        <div>

          <h1 className="mb-10">
            04 — LATEST TRANSMISSION
          </h1>


          <h2 className="mb-5">

            TRANSMISSION // 001
            <br />
            RECOVERED 19.09.26 - 03:17

          </h2>

          <span className="text-2xl font-bold">
            WE FOUND THREE.
          </span>

          <p className="mt-5">

            Three profiles appeared in the archive overnight.
            None of them belong there.

          </p>

          <p className="mt-5 break-normal">

            {corruptedTransmission}

          </p>

          <NavLink to="/transmissions">

            <button className="primary w-full flex justify-center items-center gap-2 mt-5">

              Open Transmission
              <ArrowUpRight />

            </button>

          </NavLink>

        </div>

      </div>


      {/* ENTER THE SYSTEM */}

      <div className="flex p-6 md:p-20">

        <div className="w-full">

          <h1 className="mb-10">
            05 - ENTER THE SYSTEM
          </h1>

          <div className="mb-5 w-full flex flex-col sm:flex-row sm:justify-between gap-2 text-primary">

            <span>
              NO ACTIVE PROFILE
            </span>

            <span>
              MISSIONS 0/3 // TITLES 0/3 // XP 000
            </span>

          </div>

          <h2 className="mb-5">
            YOUR ACCESS
          </h2>

          <p>

            Select one of the three recovered identities to establish your
            access to the archive. Each profile contains fragments of
            information connected to events that were never supposed to
            exist within the system. Records are incomplete, traces have
            disappeared, and parts of their history remain corrupted or
            entirely missing. Your role is to investigate what remains and
            recover what the archive can no longer reconstruct on its own.

          </p>

          <p className="mt-5">

            Once inside, you will gain access to missions linked to each
            identity. Examine recovered data, follow traces across the
            archive, reconstruct missing information and interact with
            corrupted records to determine what happened. Some answers
            will be hidden in plain sight. Others will require you to
            understand the fragments left behind and connect information
            scattered throughout the system.

          </p>

          <p className="mt-5">

            Every completed mission becomes part of your own record.
            Successful investigations grant XP, unlock titles and update
            your progression inside the archive. Your profile keeps track
            of what you have recovered, which missions you have completed
            and how far you have progressed through UNLISTED®.

          </p>

          <p className="mt-5">

            Three identities appeared without an origin. Three records
            should not exist. Their traces are already inside the system.

          </p>

          <p className="mt-5 font-bold">
            Choose an identity. Enter the archive. Find out why.
          </p>

          <NavLink to="/characters">

            <button className="primary w-full flex justify-center items-center gap-2 mt-5">

              Choose Your Character
              <ArrowUpRight />

            </button>

          </NavLink>

        </div>

      </div>


      {/* TITLES TEASER */}

      <div className="flex p-6 md:p-20">

        <div>

          <h1 className="mb-10">
            06 — TITLES TEASER
          </h1>

          <h2 className="mb-5">
            // LOCKED ARCHIVE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-20">

            <span>
              [?]
              <br />
              UNKNOWN
              <br />
              LOCKED
            </span>

            <span>
              [?]
              <br />
              UNKNOWN
              <br />
              LOCKED
            </span>

            <span>
              [?]
              <br />
              UNKNOWN
              <br />
              LOCKED
            </span>

          </div>

          <p className="mt-5">

            Some records can only be recovered by completing missions.

          </p>

        </div>

      </div>


    </div>

  )

}


export default Home