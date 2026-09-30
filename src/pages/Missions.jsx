import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import missions from '../data/missions'
import characters from '../data/characters'


function Missions() {

  const [selectedCharacterId, setSelectedCharacterId] =
    useState(() => {

      const storedCharacterId =
        localStorage.getItem('selectedCharacterId')

      return storedCharacterId
        ? Number(storedCharacterId)
        : 1

    })

  const selectedCharacter =
    characters.find(
      (character) =>
        character.id === selectedCharacterId
    )


  const selectedMission =
    missions.find(
      (mission) =>
        mission.characterId === selectedCharacterId
    )


  const storedProgress =
    JSON.parse(
      localStorage.getItem('progress')
    ) || {}


  function getCharacterProgress(character) {

    const progress =
      storedProgress[character.id] || {
        xp: 0,
        completedMissions: [],
        unlockedTitles: []
      }

    return progress

  }

  return (

    <div className="p-6 md:p-20">

      {/* CHARACTER SELECTOR */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-10">

        {characters.map((character) => {

          const isSelected =
            character.id === selectedCharacterId

          const progress =
            getCharacterProgress(character)


          return (

            <button
              key={character.id}
              onClick={() =>
                setSelectedCharacterId(
                  character.id
                )
              }
              className="flex gap-5 text-left w-full"
            >

              <img
                src={character.image}
                alt={character.name}
                className={`
                  h-20
                  w-20
                  shrink-0
                  object-cover
                  border-2
                  ${isSelected
                    ? 'border-[#C5E300]'
                    : 'grayscale hover:translate-y-1 hover:border-[#C5E300] transition-all duration-300 hover:cursor-pointer'
                  }
                `}
              />

              <div className="text-xs">

                <p>
                  <strong>
                    ACTIVE PROFILE //
                  </strong>
                  {' '}
                  {character.name.toUpperCase()}
                </p>

                <p>
                  XP //
                  {' '}
                  {String(progress.xp).padStart(
                    3,
                    '0'
                  )}
                </p>

                <p>
                  MISSIONS //
                  {' '}
                  {progress.completedMissions.length}
                  {' / 1'}
                </p>

                <p>
                  TITLES //
                  {' '}
                  {progress.unlockedTitles.length}
                  {' / 1'}
                </p>

              </div>

            </button>

          )

        })}

      </div>


      {/* TITLE */}

      <div className="mt-10">

        <h1 className="text-[42px] md:text-[80px] font-bold">
          MISSIONS
        </h1>

        <p className="mb-5">
          Three anomalies remain unresolved. Select a mission
          to investigate the archive and recover the missing records.
        </p>

      </div>


      {/* SELECTED MISSION */}

      {
        selectedCharacter &&
        selectedMission && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">

            {/* IMAGE */}

            <div>

              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-full object-cover border-2 border-black"
              />

            </div>


            {/* MISSION DATA */}

            <div>

              <h1>
                MISSION // {String(selectedMission.id).padStart(3, '0')}
              </h1>

              <h2 className="mt-10">
                // {selectedCharacter.name.toUpperCase()}
              </h2>

              <h3 className="mt-5">
                {selectedMission.mission}
              </h3>

              <div className="mt-5">

                <p>
                  <strong>
                    STATUS //
                  </strong>
                  {' '}
                  {selectedMission.status}
                </p>

                <p>
                  <strong>
                    DIFFICULTY //
                  </strong>
                  {' '}
                  {selectedMission.difficulty}
                </p>

                <p>
                  <strong>
                    REWARD //
                  </strong>
                  {' '}
                  +{selectedMission.rewards} XP
                </p>

                <p>
                  <strong>
                    TITLE //
                  </strong>
                  {' '}
                  {selectedMission.title}
                </p>

              </div>

              <p className="mt-5">
                {selectedMission.description}
              </p>

              <button className="primary mt-5">

                <NavLink
                  to={`/mission/${selectedMission.id}`}
                  className="flex items-center gap-1"
                >

                  Start Mission
                  <ArrowUpRight />

                </NavLink>

              </button>

            </div>


          </div>

        )
      }


    </div>

  )

}


export default Missions