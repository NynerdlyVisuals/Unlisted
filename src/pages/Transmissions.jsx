import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronUp, ChevronDown } from 'lucide-react'

import transmissions from '../data/transmissions'

function Transmissions() {

  const transmissionsRef = useRef(null)

  function scrollTransmissions(direction) {

    transmissionsRef.current?.scrollBy({
      top: direction === 'down' ? 200 : -200,
      behavior: 'smooth'
    })

  }

  return (

    <div className="flex flex-col p-6 md:p-20">

      {/* HEADER */}

      <div>

        <span className="text-[42px] md:text-[80px] font-bold">
          TRANSMISSIONS
        </span>

        <p>
          Recovered fragments, events and messages from inside the archive.
        </p>

      </div>

      {/* SCROLL UP */}

      <button
        onClick={() => scrollTransmissions('up')}
        className="flex justify-center mt-10 primary"
        aria-label="Scroll transmissions up"
      >
        <ChevronUp />
      </button>

      {/* TRANSMISSIONS */}

      <div
        ref={transmissionsRef}
        className="max-h-100 overflow-y-auto"
      >

        {transmissions.map((transmission) => (

          <NavLink
            key={transmission.id}
            to={`/transmissions/${transmission.id}`}
          >

            <div className="card">

              <span className="text-xs text-black/40">
                {transmission.recovered}
              </span>

              <h3>
                {transmission.title}
              </h3>

              <p>
                {transmission.description}
              </p>

            </div>

          </NavLink>

        ))}

      </div>

      {/* SCROLL DOWN */}

      <button
        onClick={() => scrollTransmissions('down')}
        className="flex justify-center mt-10 primary"
        aria-label="Scroll transmissions down"
      >
        <ChevronDown />
      </button>


    </div>

  )

}


export default Transmissions