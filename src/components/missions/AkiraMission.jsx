import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowUpRight } from 'lucide-react'


function AkiraMission({ mission, character }) {

  const [code, setCode] = useState('')
  const [modal, setModal] = useState(null)
  const [successStep, setSuccessStep] = useState(1)
  const [rewardClaimed, setRewardClaimed] = useState(false)

  function addNumber(number) {

    if (code.length >= 4) {
      return
    }

    setCode((previousCode) =>
      previousCode + number
    )

  }

  function removeNumber() {

    setCode((previousCode) =>
      previousCode.slice(0, -1)
    )
  }

  function clearCode() {
    setCode('')

  }

  function completeMission() {

    const storedProgress =
      JSON.parse(
        localStorage.getItem('progress')
      ) || {}

    const characterProgress =
      storedProgress[character.id] || {
        xp: 0,
        completedMissions: [],
        unlockedTitles: []

      }


    if (
      characterProgress.completedMissions.includes(
        mission.id
      )
    ) {

      setRewardClaimed(true)
      return

    }

    setRewardClaimed(false)

    const xpReward =
      parseInt(
        String(mission.rewards).replace(/\D/g, ''),
        10
      ) || 0

    const updatedCharacterProgress = {

      xp:
        characterProgress.xp +
        xpReward,

      completedMissions: [
        ...characterProgress.completedMissions,
        mission.id
      ],

      unlockedTitles: [
        ...characterProgress.unlockedTitles,
        mission.title
      ]

    }

    const updatedProgress = {

      ...storedProgress,

      [character.id]:
        updatedCharacterProgress

    }

    localStorage.setItem(
      'progress',
      JSON.stringify(updatedProgress)
    )

  }


  function verifyCode() {

    if (code.length !== 4) {

      toast.error(
        'ENTER COMPLETE ACCESS CODE',
        {
          style: {
            background: '#BA0739',
            borderRadius: '0',
            border: '1px solid black',
          },
        }
      )

      return
    }

    const correctCode = '4972'

    if (code === correctCode) {

      completeMission()
      setSuccessStep(1)
      setModal('success')

    }

    else {

      setModal('error')
    }

  }

  function closeError() {
    setModal(null)
    setCode('')

  }

  function nextSuccessStep() {

    if (successStep < 3) {

      setSuccessStep(
        (previousStep) =>
          previousStep + 1
      )

    }

    else {
      setModal(null)
    }

  }

  return (

    <div>

      <div className="mt-10">
        <p className="mt-5">

          Reconstruct the access code and recover
          the hidden record before it disappears again.

        </p>
      </div>

      <div className="mt-10 inline-block max-w-full">
        <h2>
          // ACCESS RECORD
        </h2>

        <div className="mt-5 border-2 border-black bg-[#303030] text-white">
          <div className="bg-black p-2">
            <span className="text-primary">
              x
            </span>
          </div>


          <div className="p-5 md:p-10 text-xs bg-secondary">
            <p>
              // RECOVERED ACCESS RECORD
            </p>

            <p className="mt-5">
              EVENT ID // GH-031
              <br />
              TIME // 03:31:13
              <br />
              LOCATION // SECTOR 09
              <br />
              USER // UNKNOWN
              <br />
              AUTH METHOD // ACCESS CODE
            </p>

            <p className="mt-5">
              CODE LENGTH // 04
              <br />
              CODE // ----
            </p>

            <p className="mt-5">
              RECOVERY STATUS // PARTIAL
            </p>
          </div>

        </div>

      </div>

      <div className="mt-10">
        <h2>
          // DATA FRAGMENTS
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">

          <div className="border-2 border-black p-4">
            <p>
              FRAGMENT // A
              <br />
              POSITION // 03
              <br />
              VALUE // 7
            </p>
          </div>

          <div className="border-2 border-black p-4">
            <p>
              FRAGMENT // B
              <br />
              POSITION // 01
              <br />
              VALUE // 4
            </p>
          </div>

          <div className="border-2 border-black p-4">
            <p>
              FRAGMENT // C
              <br />
              POSITION // 04
              <br />
              VALUE // 2
            </p>
          </div>

          <div className="border-2 border-black p-4">
            <p>
              FRAGMENT // D
              <br />
              POSITION // 02
              <br />
              VALUE // 9
            </p>
          </div>

        </div>

      </div>

      <div className="mt-10 inline-block max-w-full">

        <h2>
          // KEYPAD
        </h2>

        <div className="border-2 border-black p-5 mt-5">
          <p>
            // CODE RECOVERY
          </p>

          <p className="mt-5">
            ENTER RECONSTRUCTED ACCESS CODE
          </p>

          <div className="grid grid-cols-4 gap-1 mt-5">

            {[0, 1, 2, 3].map((index) => (

              <div
                key={index}
                className="border border-black h-10 flex items-center justify-center"
              >

                {code[index] || '—'}

              </div>

            ))}

          </div>

          <div className="grid grid-cols-3 gap-3 mt-10 max-w-60">

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
              (number) => (

                <button
                  key={number}
                  onClick={() =>
                    addNumber(
                      String(number)
                    )
                  }
                  className="
                    cursor-pointer
                    transition-all ease duration-300
                    hover:translate-y-0.5
                    hover:text-primary
                  "
                >
                  [ {number} ]
                </button>

              )
            )}

            <button
              onClick={removeNumber}
              className="
                cursor-pointer
                transition-all ease duration-300
                hover:translate-y-0.5
                hover:text-primary
              "
            >

              [ X ]
            </button>

            <button
              onClick={() =>
                addNumber('0')
              }
              className="
                cursor-pointer
                transition-all ease duration-300
                hover:translate-y-0.5
                hover:text-primary
              "
            >

              [ 0 ]
            </button>

            <button
              onClick={clearCode}
              className="
                cursor-pointer
                transition-all ease duration-300
                hover:translate-y-0.5
                hover:text-primary
              "
            >

              [ C ]
            </button>

          </div>

        </div>

        <button
          className="primary w-full flex justify-center items-center gap-2 mt-5"
          onClick={verifyCode}
        >

          Verify Code
          <ArrowUpRight />
        </button>

      </div>


      {modal === 'error' && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-[#BA0739] border-2 border-black p-6 md:p-15 w-full max-w-150">
            <h1>
              CODE REJECTED //
            </h1>

            <h2 className="mt-10">
              AUTHENTICATION SEQUENCE
              <br />
              INVALID.
            </h2>

            <p className="mt-10">
              Review recovered fragments
              <br />
              and reconstruct the sequence.
            </p>

            <button
              className="primary flex justify-center items-center gap-2 mt-5"
              onClick={closeError}
            >
              Try Again
              <ArrowUpRight />
            </button>

          </div>

        </div>

      )}

      {modal === 'success' && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99 p-5">

          <div className="bg-[#4DBD08] border-2 border-black p-6 md:p-15 w-full max-w-175">

            {successStep === 1 && (

              <>
                <h1>
                  VERIFYING CODE...
                </h1>

                <div className="mt-10">
                  <h2>
                    POSITION 01 // MATCH
                    <br />
                    POSITION 02 // MATCH
                    <br />
                    POSITION 03 // MATCH
                    <br />
                    POSITION 04 // MATCH
                  </h2>
                </div>

                <div className="flex items-center gap-5 mt-10">
                  <div className="w-full h-5 bg-black">
                  </div>
                  <h2>
                    100%
                  </h2>
                </div>

                <h2 className="mt-10">
                  ACCESS CODE CONFIRMED ✓
                </h2>
              </>

            )}

            {successStep === 2 && (

              <>
                <h1>
                  // HIDDEN RECORD RECOVERED
                </h1>

                <h2 className="mt-10">
                  ACCESS EVENT // CONFIRMED
                  <br />
                  TIME // 03:31:13
                  <br />
                  LOCATION // SECTOR 09
                  <br />
                  NETWORK // MAINTENANCE
                  <br />
                  IDENTITY // ID 003
                </h2>

                <h2 className="mt-10">
                  SUBJECT MATCH //
                </h2>

                <h1 className="mt-5">
                  AKIRA
                </h1>

              </>

            )}

            {successStep === 3 && (

              <>
                <h1>
                  The code wasn't used to enter
                  Sector // 09.
                </h1>

                <h1 className="mt-10">
                  It was used to leave it.
                </h1>

                <hr className="my-10 border-black" />

                <p>
                  MISSION STATUS // COMPLETE
                </p>

                <p className="mt-5">

                  XP // {
                    rewardClaimed
                      ? '+0 XP // ALREADY CLAIMED'
                      : mission.rewards
                  }
                </p>

                <p className="mt-5">
                  TITLE // {mission.title}
                  <br />

                  {
                    rewardClaimed
                      ? 'ALREADY UNLOCKED'
                      : 'TITLE UNLOCKED'
                  }

                </p>

              </>

            )}

            <div className="flex justify-center">

              {successStep < 3 ? (
                <button
                  className="primary mt-10"
                  onClick={nextSuccessStep}
                >

                  Next {successStep}/3
                </button>

              ) : (

                <NavLink
                  to="/missions"
                  className="link flex justify-center items-center gap-2 mt-5"
                >

                  Return To Missions
                  <ArrowUpRight />
                </NavLink>

              )}

            </div>

          </div>

        </div>

      )}


    </div>

  )

}


export default AkiraMission