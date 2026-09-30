import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'

function YokoMission({
  mission,
  character
}) {

  const [openRecord, setOpenRecord] =
    useState(null)

  const [reviewedRecords, setReviewedRecords] =
    useState([])

  const [selectedAnswer, setSelectedAnswer] =
    useState('')

  const [showError, setShowError] =
    useState(false)

  const [showSuccess, setShowSuccess] =
    useState(false)

  const [rewardClaimed, setRewardClaimed] =
    useState(false)

  const records = [

    {
      id: 1,
      name: 'ACCESS LOG',
      content:
        `ACCESS LOG // 01
__________________

TIME // 02:16:04
SUBJECT // YOKO

ACCESS CARD // NONE
PASSCODE // NONE
BIOMETRIC // NONE

ACCESS STATUS // GRANTED`
    },

    {
      id: 2,
      name: 'CAMERA LOG',
      content:
        `CAMERA LOG // 02
____________________

02:15:42 // YOKO DETECTED
02:15:58 // SIGNAL LOST
02:16:16 // SIGNAL RESTORED

BLACKOUT DURATION // 18 SEC`
    },

    {
      id: 3,
      name: 'SYSTEM LOG',
      content:
        `SYSTEM LOG // 03
____________________

02:15:59 // SECURITY INTERRUPTION

SOURCE // INTERNAL
ACTION // MANUAL OVERRIDE
DURATION // 18 SEC

ACCESS CONTROL // DISABLED`
    }

  ]

  function handleOpenRecord(record) {

    setOpenRecord(record)

    if (
      !reviewedRecords.includes(record.id)
    ) {

      setReviewedRecords([
        ...reviewedRecords,
        record.id
      ])

    }

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
      characterProgress
        .completedMissions
        .includes(mission.id)
    ) {

      setRewardClaimed(true)
      setShowSuccess(true)

      toast.success(
        'MISSION COMPLETE // REWARDS ALREADY CLAIMED',
        {
          style: {
            background: '#4DBD08',
            borderRadius: '0',
            border: '1px solid black',
          },
        }
      )

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

    setShowSuccess(true)

    toast.success(
      `MISSION COMPLETE // +${xpReward} XP // ${mission.title} UNLOCKED`,
      {
        style: {
          background: '#4DBD08',
          borderRadius: '0',
          border: '1px solid black',
        },
      }
    )

  }

  function handleSubmit() {

    if (reviewedRecords.length < 3) {
      toast.error(
        'REVIEW ALL RECORDS TO CONTINUE',
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

    if (!selectedAnswer) {

      toast.error(
        'SELECT AN ANALYSIS',
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

    if (
      selectedAnswer === 'manual-override'
    ) {
      completeMission()
    }

    else {
      setShowError(true)

    }

  }

  const allRecordsReviewed =
    reviewedRecords.length === 3

  return (

    <>

      <div className="mt-10">

        <p>
          Yoko entered Sector // 06 without any registered
          authorization.
          <br />
          <br />
          Inspect the recovered records and determine how
          access was obtained.
        </p>

        <div className="mt-10">
          <h2>
            // RECOVERED RECORDS
          </h2>

          <div className="mt-5 flex flex-col items-start">

            {records.map((record) => (

              <button
                key={record.id}
                onClick={() =>
                  handleOpenRecord(record)
                }
                className="link hover:text-primary hover:underline transition-all"
              >

                0{record.id}
                {' // '}
                {record.name}
                {' '}

                <ArrowUpRight
                  className="inline"
                />
              </button>

            ))}
          </div>

        </div>

        {/* EVIDENCE */}

        <div className="mt-10">

          <h2>
            // EVIDENCE REVIEWED //

            {' '}

            <span className="text-primary">
              [{reviewedRecords.length}/3]
            </span>
          </h2>

          {!allRecordsReviewed && (

            <p className="mt-5 opacity-50">
              REVIEW ALL RECORDS TO CONTINUE.
            </p>

          )}

        </div>

        {/* ANALYSIS */}

        <div className="mt-10">

          <h2>
            // SUBMIT ANALYSIS
          </h2>

          <p className="mt-5">
            How did Yoko access Sector // 06?
          </p>

          <div
            className={
              allRecordsReviewed
                ? 'mt-5 flex flex-col gap-2'
                : 'mt-5 flex flex-col gap-2 opacity-40 pointer-events-none'
            }
          >

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="analysis"
                value="stolen-card"

                checked={
                  selectedAnswer ===
                  'stolen-card'
                }

                onChange={(event) =>
                  setSelectedAnswer(
                    event.target.value
                  )
                }
              />

              Stolen access card

            </label>


            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="analysis"
                value="biometric"

                checked={
                  selectedAnswer ===
                  'biometric'
                }

                onChange={(event) =>
                  setSelectedAnswer(
                    event.target.value
                  )
                }
              />

              Biometric authorization

            </label>


            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="analysis"
                value="manual-override"

                checked={
                  selectedAnswer ===
                  'manual-override'
                }

                onChange={(event) =>
                  setSelectedAnswer(
                    event.target.value
                  )
                }
              />

              Manual override

            </label>


            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="analysis"
                value="unknown"

                checked={
                  selectedAnswer ===
                  'unknown'
                }

                onChange={(event) =>
                  setSelectedAnswer(
                    event.target.value
                  )
                }
              />

              Unknown credentials

            </label>

          </div>


          <button
            className={`
              primary
              flex
              items-center
              gap-1
              mt-5
              ${!allRecordsReviewed
                ? 'opacity-40 cursor-not-allowed'
                : ''
              }
            `}

            onClick={handleSubmit}
            disabled={!allRecordsReviewed}
          >

            Submit
            <ArrowUpRight />

          </button>

        </div>

      </div>


      {/* RECORD MODAL */}

      {openRecord && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-secondary border-2 border-black p-6 md:p-10 w-full max-w-md flex flex-col">

            <pre className="font-display text-xs whitespace-pre-wrap overflow-x-auto">

              {openRecord.content}

            </pre>

            <button
              className="primary flex items-center gap-1 mt-10"

              onClick={() =>
                setOpenRecord(null)
              }
            >

              Close Record
              <ArrowUpRight />

            </button>

          </div>

        </div>

      )}

      {/* WRONG ANSWER */}

      {showError && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-[#BA0739] border-2 border-black p-6 md:p-10 w-full max-w-md">

            <h1>
              ANALYSIS
              <br />
              REJECTED //
              <br />
              REVIEW THE
              <br />
              RECORDS
            </h1>

            <button
              className="primary flex items-center gap-1 mt-10"
              onClick={() =>
                setShowError(false)
              }
            >

              Close
              <ArrowUpRight />

            </button>

          </div>

        </div>

      )}

      {/* SUCCESS */}

      {showSuccess && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-[#4DBD08] border-2 border-black p-6 md:p-10 w-full max-w-md">

            <h1>
              ANALYSIS
              <br />
              CONFIRMED //
              <br />
              ACCESS METHOD
              <br />
              RECOVERED

            </h1>


            <div className="mt-10">

              <p>
                MISSION // COMPLETE
              </p>


              <p>

                XP //{' '}

                {
                  rewardClaimed
                    ? '+0 XP'
                    : mission.rewards
                }

              </p>

              <p>

                TITLE //{' '}
                {mission.title}

              </p>

              {rewardClaimed && (

                <p>
                  REWARDS // ALREADY CLAIMED
                </p>

              )}

            </div>

            <NavLink
              to="/missions"
              className="link flex items-center gap-2 mt-10"
            >

              Return To Missions
              <ArrowUpRight />

            </NavLink>

          </div>

        </div>

      )}

    </>

  )

}


export default YokoMission