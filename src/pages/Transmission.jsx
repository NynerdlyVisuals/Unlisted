import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import transmissions from '../data/transmissions'

function Transmission() {

    const { id } = useParams()

    const transmission =
        transmissions.find(
            (transmission) =>
                transmission.id === Number(id)
        )


    if (!transmission) {

        return (

            <div className="p-6 md:p-20">

                <NavLink
                    to="/transmissions"
                    className="flex items-center gap-2 mb-10 link"
                >

                    <ArrowLeft />
                    Back to transmissions

                </NavLink>

                <span className="flex justify-center text-[#BA0739] font-bold text-xl md:text-2xl">
                    TRANSMISSION NOT FOUND...
                </span>

            </div>

        )

    }

    return (

        <div className="flex flex-col p-6 md:p-20">

            {/* BACK */}

            <NavLink
                to="/transmissions"
                className="flex items-center gap-2 mb-10 link"
            >

                <ArrowLeft />
                Back to transmissions
            </NavLink>


            {/* DATE */}

            <span className="text-xs text-black/40">
                {transmission.recovered}
            </span>

            {/* TITLE */}

            <h2 className="mt-10">
                {transmission.title}
            </h2>

            {/* CONTENT */}

            <p className="mt-5 whitespace-pre-line">
                {transmission.content}
            </p>

            {/* IMAGE */}

            {transmission.image && (

                <img
                    src={`${import.meta.env.BASE_URL}${transmission.image.replace(/^\//, '')}`}
                    alt={transmission.title}
                    className="mt-10 w-full max-w-4xl h-auto object-contain"
                />

            )}


        </div>

    )

}


export default Transmission