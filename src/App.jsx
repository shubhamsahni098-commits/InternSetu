
import React from 'react'

import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import LatestNews from './Components/LatestNews'
import WorkFlow from './Components/WorkFlow'
import Stats from './Components/Stats'
import Footer from './Components/Footer'

import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import About from './Pages/About'

import DashboardHome from './Dashboard/DashboardHome'
import Profile from './Dashboard/Profile'
import Preferences from './Dashboard/Preferences'
import Internships from './Dashboard/Internships'
import InternshipDetails from './Dashboard/InternshipDetails'
import Applications from './Dashboard/Applications'

import CompRegister from "./Company/CompRegister";
import CompanyDashboard from "./Company/CompanyDashboard";
import PostInternship from "./Company/PostInternship";

import DishaBot from './Components/DishaBot'

import {
  Routes,
  Route
} from 'react-router-dom'


export default function App() {

  return (
    <>
      <Routes>

        {/* ===================== */}
        {/* HOME */}
        {/* ===================== */}

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


        {/* ===================== */}
        {/* LOGIN */}
        {/* ===================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ===================== */}
        {/* REGISTER */}
        {/* ===================== */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ===================== */}
        {/* ABOUT */}
        {/* ===================== */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* ===================== */}
        {/* DASHBOARD */}
        {/* ===================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        >

          {/* /dashboard */}
          <Route
            index
            element={<DashboardHome />}
          />

          {/* /dashboard/profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* /dashboard/preferences */}
          <Route
            path="preferences"
            element={<Preferences />}
          />

          {/* /dashboard/internships */}
          <Route
            path="internships"
            element={<Internships />}
          />

          <Route
            path="internships/:id"
            element={<InternshipDetails />}
          />

          {/* /dashboard/applications */}
          <Route
            path="applications"
            element={<Applications />}
          />

        </Route>

        <Route
          path="/company/register"
          element={<CompRegister />}
        />

        <Route
          path="/company/dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="/company/post-internship"
          element={<PostInternship />}
        />

      </Routes>

      <DishaBot />
    </>
  )
}