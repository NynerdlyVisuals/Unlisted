import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import missions from '../data/missions'
import characters from '../data/characters'

import HiroMission from '../components/missions/HiroMission'
import YokoMission from '../components/missions/YokoMission'
import AkiraMission from '../components/missions/AkiraMission'


function Mission() {

  const { id } = useParams()

  const mission = missions.find(
    (mission) => mission.id === Number(id)
  )

  if (!mission) {

    return (

      <div className="p-6 md:p-20">

        <h1>
          MISSION NOT FOUND
        </h1>

      </div>

    )

  }

  const character = characters.find(
    (character) =>
      character.id === mission.characterId
  )

  if (!character) {

    return (

      <div className="p-6 md:p-20">

        <h1>
          CHARACTER NOT FOUND
        </h1>

      </div>

    )

  }

  return (

    <div className="p-6 md:p-20">


      {/* BACK */}

      <NavLink
        to="/missions"
        className="link flex items-center gap-1 mb-10"
      >

        <ArrowLeft />

        Back To Missions

      </NavLink>

      {/* TITLE */}

      <h1 className="text-[42px] md:text-[80px] font-bold">

        MISSION // {String(mission.id).padStart(3, '0')}

      </h1>

      {/* MISSION INFO */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10">

        <div>

          <img
            src={character.image}
            alt={character.name}
            className="w-full border-2"
          />

        </div>

        <div>

          <h1>
            {mission.mission}
          </h1>


          <div className="mt-10">

            <h2>
              // OBJECTIVE
            </h2>

            <p className="mt-5">

              Access the recovered archive and investigate the data associated
              with each restricted record. Analyze the information available,
              identify inconsistencies, and use the recovered fragments to
              reconstruct what has been lost or deliberately concealed. Follow
              every trace carefully, as incomplete records, corrupted data,
              and unidentified activity may reveal information that was never
              meant to be recovered. Complete the investigation and restore
              as much of the archive as possible.

            </p>

            <p className="mt-5">
              {mission.objective}
            </p>

          </div>

        </div>


      </div>

      {/* MISSION */}

      {character.id === 1 && (

        <HiroMission
          mission={mission}
          character={character}
        />

      )}

      {character.id === 2 && (

        <YokoMission
          mission={mission}
          character={character}
        />

      )}

      {character.id === 3 && (

        <AkiraMission
          mission={mission}
          character={character}
        />

      )}

    </div>

  )

}


export default Mission