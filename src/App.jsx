import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Navbar from './components/Navbar'
import StatusBar from './components/StatusBar'
import Footer from './components/Footer'
import HelpMenu from './components/HelpMenu'

import Home from './pages/Home'
import Characters from './pages/Characters'
import Missions from './pages/Missions'
import Mission from './pages/Mission'
import Profile from './pages/Profile'
import Transmissions from './pages/Transmissions'
import Transmission from './pages/Transmission'
import Admin from './pages/Admin'


function App() {

  return (

    <div className="min-h-screen max-w-5xl mx-auto px-6 py-30">

      <StatusBar />
      <Navbar />
      <Toaster />

      <div className="bg-secondary mt-10 border-2">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/transmissions"
            element={<Transmissions />}
          />

          <Route
            path="/transmissions/:id"
            element={<Transmission />}
          />

          <Route
            path="/characters"
            element={<Characters />}
          />

          <Route
            path="/missions"
            element={<Missions />}
          />

          <Route
            path="/mission/:id"
            element={<Mission />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          {import.meta.env.VITE_ADMIN_PATH && (
            <Route
              path={`/${import.meta.env.VITE_ADMIN_PATH}`}
              element={<Admin />}
            />
          )}

        </Routes>

        <Footer />

      </div>

      <HelpMenu />

    </div>

  )

}


export default App