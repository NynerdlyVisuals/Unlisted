import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { toast } from 'sonner'

function Navbar() {

  const [currentTheme, setCurrentTheme] = useState('cyber')
  const [menuOpen, setMenuOpen] = useState(false)

  const themes = [
    { name: 'cyber', label: 'Cyber' },
    { name: 'tokyo', label: 'Tokyo' },
  ]

  useEffect(() => {

    document.documentElement.setAttribute(
      'data-theme',
      'cyber'
    )

  }, [])


  const switchTheme = (themeName) => {

    setCurrentTheme(themeName)

    document.documentElement.setAttribute(
      'data-theme',
      themeName
    )

    toast.success(`Theme changed to ${themeName}`, {
      style: {
        background: 'oklch(78.5% 0.115 274.713)',
        borderRadius: '0',
        border: '1px solid black',
      }
    })

  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (

    <nav className="bg-primary border-2 sticky top-0 z-10 mt-10">

      {/* MOBILE NAVBAR */}

      <div className="md:hidden">

        {/* MOBILE HEADER */}

        <div className="flex items-center justify-between p-4">

          <NavLink
            to="/"
            onClick={closeMenu}
            className="theme-btn"
          >
            Unlisted®
          </NavLink>

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="theme-btn"
            aria-label="Toggle navigation"
          >

            {menuOpen
              ? <X size={20} />
              : <Menu size={20} />
            }
          </button>

        </div>

        {/* MOBILE MENU */}

        {menuOpen && (

          <div className="flex flex-col border-t-2 border-black p-4">

            <NavLink
              to="/transmissions"
              onClick={closeMenu}
              className={({ isActive }) =>
                `theme-btn ${isActive ? 'active' : ''
                }`
              }
            >
              Transmissions
            </NavLink>

            <NavLink
              to="/characters"
              onClick={closeMenu}
              className={({ isActive }) =>
                `theme-btn ${isActive ? 'active' : ''
                }`
              }
            >
              Characters
            </NavLink>

            <NavLink
              to="/missions"
              onClick={closeMenu}
              className={({ isActive }) =>
                `theme-btn ${isActive ? 'active' : ''
                }`
              }
            >
              Missions
            </NavLink>

            <NavLink
              to="/profile"
              onClick={closeMenu}
              className={({ isActive }) =>
                `theme-btn ${isActive ? 'active' : ''
                }`
              }
            >
              Profile
            </NavLink>

            {/* THEMES */}

            <div className="flex items-center gap-2 mt-5 pt-5 border-t border-black/20">

              <span className="text-sm text-secondary">
                Theme:
              </span>

              {themes.map((theme) => (

                <button
                  key={theme.name}
                  onClick={() =>
                    switchTheme(theme.name)
                  }
                  className={`theme-btn ${currentTheme === theme.name
                      ? 'active'
                      : ''
                    }`}
                >
                  {theme.label}
                </button>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* DESKTOP NAVBAR */}

      <div className="hidden md:flex items-center gap-2 p-5">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `theme-btn ${isActive ? 'active' : ''
            }`
          }
        >
          Unlisted®
        </NavLink>

        <NavLink
          to="/transmissions"
          className={({ isActive }) =>
            `theme-btn ${isActive ? 'active' : ''
            }`
          }
        >
          Transmissions
        </NavLink>

        <NavLink
          to="/characters"
          className={({ isActive }) =>
            `theme-btn ${isActive ? 'active' : ''
            }`
          }
        >
          Characters
        </NavLink>

        <NavLink
          to="/missions"
          className={({ isActive }) =>
            `theme-btn ${isActive ? 'active' : ''
            }`
          }
        >
          Missions
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `theme-btn ${isActive ? 'active' : ''
            }`
          }
        >
          Profile
        </NavLink>

        {/* THEMES */}

        <div className="flex items-center gap-2 ml-auto">

          <span className="text-sm text-secondary">
            Theme:
          </span>

          {themes.map((theme) => (

            <button
              key={theme.name}
              onClick={() =>
                switchTheme(theme.name)
              }
              className={`theme-btn ${currentTheme === theme.name
                  ? 'active'
                  : ''
                }`}
            >
              {theme.label}
            </button>

          ))}

        </div>

      </div>

    </nav>

  )

}

export default Navbar