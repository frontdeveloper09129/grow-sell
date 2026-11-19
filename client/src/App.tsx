// import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
// import pages
import Login from './pages/login'
import { Registration } from './pages/registration'
import { Dashboard } from './pages/dashbaord'
import { LandingPage } from './pages/landing_page'
import AddListingPage from './pages/addListingPage'

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/planst/owners/shop/addListingPage' element={<AddListingPage />} />
      </Routes>
    </div>
  )
}

export default App
