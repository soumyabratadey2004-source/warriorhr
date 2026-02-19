import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Admin from '../pages/Admin'
import AdminLogin from '../pages/AdminLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-portal/admin' element={<Admin />} />
        <Route path='/admin-portal/login' element={<AdminLogin />} />
        {/* Fallback to Home for any unmatched routes */}
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
