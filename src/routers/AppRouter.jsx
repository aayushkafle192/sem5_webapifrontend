import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes outside MainLayout if any */}
        
        {/* Routes inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
