import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import characters from '../data/characters'
import missions from '../data/missions'

function Profile() {

  const [progress, setProgress] = useState(() =>
    JSON.parse(localStorage.getItem('progress')) || {}
  )

  const [showResetModal, setShowResetModal] =
    useState(false)

  const selectedCharacterId =
    Number(localStorage.getItem('selectedCharacterId'))

  const activeCharacter =
    characters.find(
      (character) =>
        character.id === selectedCharacterId
    )

  function getCharacterProgress(characterId) {

    return progress[characterId] || {
      xp: 0,
      completedMissions: [],
      unlockedTitles: []
    }

  }

  function resetProgress() {

    localStorage.removeItem('progress')
    localStorage.removeItem('selectedCharacterId')

    setProgress({})
    setShowResetModal(false)

  }

  const totalCompletedMissions =
    characters.reduce(
      (total, character) =>
        total +
        getCharacterProgress(character.id)
          .completedMissions.length,
      0
    )

  const totalMissions =
    missions.length

  const totalXP =
    characters.reduce(
      (total, character) =>
        total +
        getCharacterProgress(character.id).xp,
      0
    )

  const totalTitles =
    characters.reduce(
      (total, character) =>
        total +
        getCharacterProgress(character.id)
          .unlockedTitles.length,
      0
    )

  const progressPercentage =
    totalMissions === 0
      ? 0
      : Math.round(
        (totalCompletedMissions / totalMissions) * 100
      )

  return (

    <div className="p-6 md:p-20">

      {/* PROFILE */}

      <h1 className="text-[42px] md:text-[80px] font-bold">
        PROFILE
      </h1>

      <h2 className="mt-10">
        // ARCHIVE IDENTITY
      </h2>


      {/* MAIN PROFILE BOX */}

      <div className="border-2 border-black p-5 md:p-10 mt-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* IDENTITY */}

          <div>

            <h2>
              // CODENAME:{' '}

              {activeCharacter
                ? activeCharacter.name.toUpperCase()
                : 'UNASSIGNED'
              }
            </h2>

            <p className="mt-5">
              STATUS //{' '}
              {activeCharacter
                ? 'ACTIVE'
                : 'NO IDENTITY'
              }
            </p>

            <p>
              ARCHIVE // UNLISTED
            </p>

            <NavLink
              to="/characters"
              className="link inline-block mt-5 underline"
            >

              {activeCharacter
                ? 'CHANGE IDENTITY'
                : 'SELECT AN IDENTITY'
              }

            </NavLink>

          </div>


          {/* ARCHIVE PROGRESS */}

          <div>

            <h2>
              // ARCHIVE PROGRESS
            </h2>

            <p className="mt-5">
              XP // {String(totalXP).padStart(3, '0')}
            </p>

            <p>
              MISSIONS // {totalCompletedMissions} / {totalMissions}
            </p>

            <p>
              TITLES // {totalTitles} / {totalMissions}
            </p>

            <div className="flex items-center gap-3 mt-3">

              <div className="w-full max-w-40 h-3 border border-black">

                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${progressPercentage}%`
                  }}
                />

              </div>

              <p>
                {progressPercentage}%
              </p>

            </div>

          </div>


          {/* MISSION RECORDS */}

          <div>

            <h2>
              // MISSION RECORDS
            </h2>

            <div className="mt-5">

              {missions.map((mission) => {

                const characterProgress =
                  getCharacterProgress(
                    mission.characterId
                  )

                const completed =
                  characterProgress
                    .completedMissions
                    .includes(mission.id)

                const character =
                  characters.find(
                    (character) =>
                      character.id ===
                      mission.characterId
                  )

                return (

                  <div
                    key={mission.id}
                    className="mb-5"
                  >

                    <p>
                      {character?.name.toUpperCase()}
                      {' // '}
                      {mission.mission}
                    </p>

                    <p>
                      STATUS //{' '}
                      {completed
                        ? 'COMPLETE'
                        : 'INCOMPLETE'
                      }
                    </p>

                    {completed && (

                      <p>
                        XP // {mission.rewards}
                      </p>

                    )}

                  </div>

                )

              })}

            </div>

          </div>

        </div>


        {/* RECOVERED TITLES */}

        <div className="mt-10">

          <h2>
            // RECOVERED TITLES
          </h2>

          <div className="mt-5">

            {characters.map((character) => {

              const characterProgress =
                getCharacterProgress(
                  character.id
                )

              return (

                <div
                  key={character.id}
                  className="mb-5"
                >

                  <p className="font-bold">
                    {character.name.toUpperCase()}
                  </p>

                  {characterProgress
                    .unlockedTitles.length > 0 ? (

                    characterProgress
                      .unlockedTitles
                      .map((title) => (

                        <p key={`${character.id}-${title}`}>
                          {title}
                          {' // '}
                          RECOVERED
                        </p>

                      ))

                  ) : (

                    <p>
                      TITLE // LOCKED
                    </p>

                  )}

                </div>

              )

            })}

          </div>

        </div>


      </div>


      {/* LOCAL DATA */}

      <div className="mt-16">

        <h2>
          // LOCAL DATA
        </h2>

        <div className="bg-yellow-400 border-2 border-black p-5 mt-5">

          <h2>
            YOUR DATA STAYS HERE.
          </h2>

          <p className="mt-5">
            UNLISTED® does not create an online account.
            Your identity, XP, mission progress and recovered
            titles are stored locally in this browser.
          </p>

        </div>

        <button
          onClick={() =>
            setShowResetModal(true)
          }
          className="mt-8 primary"
        >

          RESET PROGRESS

        </button>

      </div>


      {/* RESET MODAL */}

      {showResetModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-[#BA0739] border-2 border-black p-6 md:p-10 w-full max-w-137">

            <h2>
              RESET ALL LOCAL DATA?
            </h2>

            <p className="mt-5">
              This action cannot be undone.
            </p>

            <div className="flex gap-5 mt-8">

              <button
                className="link hover:underline"
                onClick={() =>
                  setShowResetModal(false)
                }
              >

                Cancel
              </button>

              <button
                className="link hover:underline"
                onClick={resetProgress}
              >

                Reset
              </button>

            </div>

          </div>

        </div>

      )}


    </div>

  )

}


export default Profile