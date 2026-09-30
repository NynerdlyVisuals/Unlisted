import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'sonner'


function Typewriter({
  text,
  speed = 20,
  onComplete
}) {

  const [displayedText, setDisplayedText] =
    useState('')

  const onCompleteRef =
    useRef(onComplete)


  useEffect(() => {

    onCompleteRef.current =
      onComplete

  }, [onComplete])


  useEffect(() => {

    setDisplayedText('')

    let index = 0

    const interval = setInterval(() => {

      index++

      setDisplayedText(
        text.slice(0, index)
      )

      if (index >= text.length) {

        clearInterval(interval)

        if (onCompleteRef.current) {
          onCompleteRef.current()
        }

      }

    }, speed)

    return () =>
      clearInterval(interval)

  }, [text, speed])


  return (
    <span className="whitespace-pre-line">

      {displayedText}

      <span className="animate-pulse">
        _
      </span>

    </span>

  )

}

function HiroMission({
  mission,
  character
}) {

  const [step, setStep] =
    useState('boot')

  const [input, setInput] =
    useState('')

  const [terminalReady, setTerminalReady] =
    useState(false)

  const [
    initializationTextDone,
    setInitializationTextDone
  ] = useState(false)

  const [
    loadingProgress,
    setLoadingProgress
  ] = useState(0)

  const [
    loadingDone,
    setLoadingDone
  ] = useState(false)

  const [
    rewardClaimed,
    setRewardClaimed
  ] = useState(false)

  useEffect(() => {

    setTerminalReady(false)

  }, [step])


  useEffect(() => {

    if (
      step !== 'initialized' ||
      !initializationTextDone
    ) {
      return
    }

    setLoadingProgress(0)
    setLoadingDone(false)

    const interval =
      setInterval(() => {

        setLoadingProgress(
          (previousProgress) => {

            if (
              previousProgress >= 100
            ) {

              clearInterval(interval)

              setTimeout(() => {
                setLoadingDone(true)
              }, 400)

              return 100

            }

            return previousProgress + 4

          }
        )

      }, 80)

    return () =>
      clearInterval(interval)

  }, [
    step,
    initializationTextDone
  ])

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


  function handleCommand() {

    if (!terminalReady) {
      return
    }

    const command =
      input
        .trim()
        .toUpperCase()

    if (
      step === 'boot' &&
      command === 'ENTER'
    ) {

      setInitializationTextDone(false)
      setLoadingProgress(0)
      setLoadingDone(false)
      setStep('initialized')

    }

    else if (
      step === 'initialized' &&
      command === 'HELP'
    ) {

      setStep('help')

    }

    else if (
      step === 'help' &&
      command === 'SCAN'
    ) {

      setStep('scan')

    }

    else if (
      step === 'scan' &&
      command === 'HELP'
    ) {

      setStep('help')

    }

    else if (
      step === 'scan' &&
      command === 'TRACE 02'
    ) {

      completeMission()
      setStep('success')

    }

    else {

      toast.error(
        'TRACE INCONSISTENT',
        {
          style: {
            background: '#BA0739',
            borderRadius: '0',
            border: '1px solid black',
          },
        }
      )

    }

    setInput('')

  }


  const bootText =
    `UNLISTED ARCHIVE TERMINAL
TRACE SYSTEM // v1.04

--------------------------------

SYSTEM BOOT // COMPLETE
ARCHIVE CONNECTION // ESTABLISHED
TRACE MODULE // ONLINE

Loading subject record...

SUBJECT // ${character.name.toUpperCase()}
ID // 00${character.id}
LAST KNOWN LOCATION // SECTOR ${character.sector}

WARNING //
Movement data between 19:03 and 21:17
could not be recovered from the primary archive.

Residual fragments have been detected
in the local trace system.

OBJECTIVE //
Identify the missing movement record
and restore ${character.name}'s trace.

Type ENTER to initialize recovery protocol.`

  const initializationText =
    `> INITIALIZING RECOVERY PROTOCOL...

Connecting to archive node // 07...
Scanning residual memory...
Checking corrupted sectors...`

  const initializationCompleteText =
    `SCAN COMPLETE.

3 recoverable fragments detected.
1 fragment matches the missing interval.

Type HELP to display available commands.`

  const helpText =
    `> HELP

AVAILABLE COMMANDS //

SCAN
Displays recovered trace fragments.

TRACE [ID]
Attempts to restore a recovered fragment.

HELP
Displays available commands.

Type SCAN to inspect recovered fragments.`

  const scanText =
    `> SCAN

RECOVERED FRAGMENTS //

01 // 19:14 // SECTOR 07
SUBJECT STILL PRESENT

02 // 20:48 // GATE 09
SUBJECT DETECTED

03 // 21:17 // SECTOR 12
ALREADY PRESENT IN MAIN RECORD

--------------------------------

KNOWN TRACE //

19:03 // SECTOR 07
--:-- // RECORD MISSING
21:17 // SECTOR 12

SYSTEM //
One recovered fragment completes
the missing movement interval.

Use TRACE [ID] to restore it.`

  const successText =
    `> TRACE 02

Validating fragment // 02...
Comparing timestamps...
Checking location continuity...

MATCH CONFIRMED

TRACE RESTORED //

19:03 // SECTOR 07
20:48 // GATE 09
21:17 // SECTOR 12

MISSION STATUS // COMPLETE

--------------------------------

MISSION COMPLETE

XP // ${rewardClaimed ? '+0 XP' : mission.rewards}

${character.name.toUpperCase()} RECORD RECOVERY
${rewardClaimed ? '67% // NO CHANGE' : '41% to 67%'}

TITLE //
${mission.title}
${rewardClaimed ? 'ALREADY UNLOCKED' : 'TITLE UNLOCKED'}`

  return (

    <div className="mt-10 border-2 max-w-full overflow-hidden">

      <div className="bg-black/90 p-2">
        <span className="text-red-600">
          x
        </span>
      </div>


      <div className="p-5 md:p-10 text-xs bg-black text-green-600 min-h-125 overflow-x-auto">

        {step === 'boot' && (

          <Typewriter
            text={bootText}
            speed={12}
            onComplete={() =>
              setTerminalReady(true)
            }
          />

        )}

        {step === 'initialized' && (

          <div>
            <Typewriter
              text={initializationText}
              speed={18}
              onComplete={() =>
                setInitializationTextDone(true)
              }
            />

            {initializationTextDone && (

              <div className="flex items-center gap-2 mt-5">
                <div className="w-full h-4 border border-current">
                  <div
                    className="h-full bg-current transition-all duration-100"
                    style={{
                      width: `${loadingProgress}%`
                    }}
                  >
                  </div>
                </div>

                <span>
                  {loadingProgress}%
                </span>
              </div>

            )}

            {loadingDone && (

              <div className="mt-5">
                <Typewriter
                  text={
                    initializationCompleteText
                  }
                  speed={18}
                  onComplete={() =>
                    setTerminalReady(true)
                  }
                />

              </div>

            )}

          </div>

        )}


        {step === 'help' && (

          <Typewriter
            text={helpText}
            speed={15}
            onComplete={() =>
              setTerminalReady(true)
            }
          />

        )}

        {step === 'scan' && (

          <Typewriter
            text={scanText}
            speed={12}
            onComplete={() =>
              setTerminalReady(true)
            }
          />

        )}

        {step === 'success' && (

          <div>

            <Typewriter
              text={successText}
              speed={15}
            />

            <NavLink
              to="/missions"
              className="link flex items-center gap-2 mt-10"
            >

              Return To Missions →
            </NavLink>

          </div>

        )}

        {
          step !== 'success' &&
          terminalReady && (

            <div className="flex items-center gap-2 mt-5">

              <span>
                &gt;
              </span>

              <input
                value={input}

                onChange={(event) =>
                  setInput(event.target.value)
                }

                onKeyDown={(event) => {

                  if (event.key === 'Enter') {
                    handleCommand()
                  }

                }}

                className="bg-transparent outline-none w-full text-current min-w-0"
                autoFocus
              />

            </div>

          )
        }


      </div>

    </div>

  )

}


export default HiroMission