import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import characters from '../data/characters'

function Characters() {

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])

  function selectCharacter() {

    localStorage.setItem(
      'selectedCharacterId',
      selectedCharacter.id
    )

  }

  return (

    <div className="p-6 md:p-20">

      <span className="text-[42px] md:text-[80px] font-bold">
        CHARACTERS
      </span>

      <p className="mb-5">
        Three unidentified profiles recovered from the archive.
        Select an identity to inspect its remaining data.
      </p>

      {/* CHARACTER */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div>

          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            className="w-full border-2"
          />

          {/* CHARACTER SELECTOR */}

          <div className="grid grid-cols-3 gap-2 md:gap-5 mt-5">

            {characters.map((character) => (

              <button
                key={character.id}
                onClick={() =>
                  setSelectedCharacter(character)
                }
              >

                <img
                  src={character.image}
                  alt={character.name}
                  className={
                    selectedCharacter.id === character.id
                      ? 'w-full border-2 border-[#C5E300]'
                      : 'w-full border-2 grayscale hover:translate-y-1 hover:border-[#C5E300] transition-all duration-300 cursor-pointer'
                  }
                />

              </button>

            ))}

          </div>

        </div>

        {/* CHARACTER DATA */}

        <div>

          <h1>
            ID // {selectedCharacter.id}
          </h1>

          <div className="mt-10">

            <h2>
              // PROFILE
            </h2>

            <p className="mt-5">
              {selectedCharacter.profile}
            </p>

          </div>

          <div className="mt-10">

            <h2>
              // KNOWN DATA
            </h2>

            <div className="mt-5 flex flex-col">

              <p>
                <span className="font-bold">
                  LAST SEEN SECTOR:
                </span>{' '}
                {selectedCharacter.sector}
              </p>

              <p>
                <span className="font-bold">
                  ACTIVITY:
                </span>{' '}
                {selectedCharacter.activity}
              </p>

              <p>
                <span className="font-bold">
                  AFFILIATION:
                </span>{' '}
                {selectedCharacter.affiliation}
              </p>

              <p>
                <span className="font-bold">
                  THREAT LEVEL:
                </span>{' '}
                {selectedCharacter.level}
              </p>

            </div>

          </div>

          <div className="mt-10">

            <h2>
              // TRAITS
            </h2>

            <div className="mt-5 flex flex-col">

              {Object.entries(selectedCharacter.traits).map(
                ([trait, value]) => (

                  <div
                    key={trait}
                    className="flex items-center gap-2"
                  >

                    <p className="uppercase">
                      {trait}
                    </p>

                    <div className="w-24 sm:w-40 h-3 border border-black">

                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${value}%`
                        }}
                      />

                    </div>

                    <p>
                      {value}%
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

          <NavLink
            to="/missions"
            onClick={selectCharacter}
          >
            <button className="primary flex items-center gap-1 mt-10">
              Select Character
              <ArrowUpRight />
            </button>
          </NavLink>

        </div>

      </div>

      {/* ASSOCIATED TITLE */}

      <div className="mt-10">

        <h1>
          ASSOCIATED TITLE
        </h1>

        <h2 className="mt-5">
          [ ? ] LOCKED
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-10 mt-5">

          {characters.map((character) => (

            <div
              key={character.id}
              className={
                selectedCharacter.id === character.id
                  ? 'border-2 border-[#C5E300] p-2'
                  : 'border-2 border-transparent opacity-20 p-2'
              }
            >

              <p>

                <span className="font-bold">
                  ID
                </span>{' '}
                // 00{character.id}

                <br />

                <span className="font-bold">
                  PROFILE
                </span>{' '}
                // {character.name}

                <br />

                <span className="font-bold">
                  TITLE
                </span>{' '}
                // {character.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}


export default Characters