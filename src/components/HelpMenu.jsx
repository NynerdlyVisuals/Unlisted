import React, { useState } from 'react'
import { CircleHelp, X } from 'lucide-react'

import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'


function HelpMenu() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {isOpen && (
                <div className="help-popup">

                    <div className="help-popup-header">
                        <h2>
              // NEED HELP?
                        </h2>

                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close help menu"
                            className="cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <p className="mt-5">
                        Lost inside the archive or found something that
                        doesn't behave as expected?
                    </p>

                    <div className="help-links">
                        <a
                            href="https://discord.com/invite/5jZ3HrVTRY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link flex items-center gap-2"
                        >
                            <FaDiscord size={40} />
                            DISCORD // JOIN THE NYNERDLY COMMUNITY
                        </a>

                        <a
                            href="https://github.com/NynerdlyVisuals"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link flex items-center gap-2"
                        >
                            <FaGithub size={20} />
                            GITHUB // REPORT ISSUE
                        </a>

                        <a
                            href="https://x.com/KamNynerdly"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link flex items-center gap-2"
                        >
                            <FaXTwitter size={20} />
                            X // UPDATES
                        </a>
                    </div>

                </div>

            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
                aria-expanded={isOpen}
                className="help-button"
            >

                <CircleHelp />
            </button>

        </>
    )

}


export default HelpMenu