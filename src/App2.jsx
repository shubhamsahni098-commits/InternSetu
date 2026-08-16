import React from 'react'

import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import LatestNews from './Components/LatestNews'
import WorkFlow from './Components/WorkFlow'
import Stats from './Components/Stats'
import Footer from './Components/Footer'

import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";


export default function App() {
  return (
    <Routes>

      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <LatestNews />
            <WorkFlow />
            <Stats />
            <Footer />
          </>
        }
      />

      {/* LOGIN PAGE */}
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
       path="/register" 
       element={<Register />} 
       />
       <Route 
       path="/dashboard" 
       element={<Dashboard />}
        />

    </Routes>
  )
}

