import React, { useState, useRef } from 'react'
import { AudioLines } from 'lucide-react'

import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import audioFile from '../assets/audio/Digicore hyperpop elxnce type beat [prod. star3d] .mp3'

function StatusBar() {

    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    function toggleAudio() {

        if (!audioRef.current) {
            audioRef.current = new Audio(audioFile)
            audioRef.current.loop = true
        }

        if (isPlaying) {

            audioRef.current.pause()
            setIsPlaying(false)

        } else {

            audioRef.current.play()
            setIsPlaying(true)

        }

    }

    return (

        <header className="bg-[#C5E300] p-3 flex justify-between items-center gap-3 border-black border-2">

            {/* STATUS + AUDIO */}

            <div className="flex items-center gap-2 md:gap-4 min-w-0">

                <p className="whitespace-nowrap text-[10px] md:text-xs">
                    ARCHIVE STATUS // ONLINE
                </p>

                <button
                    onClick={toggleAudio}
                    aria-label={
                        isPlaying
                            ? 'Pause audio'
                            : 'Play audio'
                    }
                    className={`
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        shrink-0
                        ${isPlaying
                                        ? 'text-text-primary'
                                        : 'text-gray-400'
                                    }
                    `}
                >

                    <AudioLines className="w-4 h-4 md:w-6 md:h-6" />

                </button>

                {/* MUSIC */}

                <span className="track-marquee text-[10px] md:text-xs w-20 sm:w-40 md:w-64 lg:w-96">

                    <span>
                        DIGICORE HYPERPOP ELXNCE TYPE BEAT [prod. star3d] // UPDATE ON X @KAMNYNERDLY
                    </span>

                </span>

            </div>

            {/* SOCIALS */}

            <div className="flex items-center gap-2 text-lg md:text-xl shrink-0">

                <a
                    href="https://discord.com/invite/5jZ3HrVTRY"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                    className="hover:text-secondary duration-200 transition-all hover:-translate-y-0.5"
                >
                    <FaDiscord />
                </a>

                <a
                    href="https://x.com/KamNynerdly"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="hover:text-secondary duration-200 transition-all hover:-translate-y-0.5"
                >
                    <FaXTwitter />
                </a>

                <a
                    href="https://github.com/NynerdlyVisuals"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-secondary duration-200 transition-all hover:-translate-y-0.5"
                >
                    <FaGithub />
                </a>

            </div>

        </header>

    )

}


export default StatusBar