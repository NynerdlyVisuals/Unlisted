import React from 'react'

function Footer() {

  return (

    <footer className="flex p-6 md:p-20">

      <div className="w-full">

        <div className="border mt-2 border-black/5 mb-10"></div>

        <p>
          No account is created and no personal data is stored on our servers.
          Your character, XP, titles and progress are stored locally in your
          browser. Clearing your site data will reset your progress.
        </p>

        <div className="flex flex-col justify-center items-center gap-2 mt-5">

          <span className="text-xs">
            UNLISTED® BY
          </span>

          <a
            href="https://www.nynerdlyvisuals.com"
            target="_blank"
            rel="noopener noreferrer"
          >

            <img
              className="w-16 md:w-20"
              src="src/assets/Nynerdly_visuals_®_logo_Transparency.png"
              alt="Nynerdly Visuals Logo"
            />

          </a>

        </div>

      </div>

    </footer>

  )

}

export default Footer