import React from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import LatestNews from "./Components/LatestNews";
import WorkFlow from "./Components/WorkFlow";
import Stats from "./Components/Stats";
import Footer from "./Components/Footer";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";

import DashboardHome from "./Dashboard/DashboardHome";
import Profile from "./Dashboard/Profile";
import Preferences from "./Dashboard/Preferences";
import Internships from "./Dashboard/Internships";
import InternshipDetails from "./Dashboard/InternshipDetails";
import Applications from "./Dashboard/Applications";
import Recommendations from "./Dashboard/Recommendations";

import CompRegister from "./Company/CompRegister";
import CompanyDashboard from "./Company/CompanyDashboard";
import PostInternship from "./Company/PostInternship";

import DishaBot from "./Components/DishaBot";

import {
  Routes,
  Route
} from "react-router-dom";


export default function App() {

  return (
    <>

      <Routes>

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


        <Route
          path="/login"
          element={<Login />}
        />


        

        <Route
          path="/register"
          element={<Register />}
        />


        

        <Route
          path="/about"
          element={<About />}
        />


        

        <Route
          path="/dashboard"
          element={<Dashboard />}
        >

          

          <Route
            index
            element={<DashboardHome />}
          />


          

          <Route
            path="profile"
            element={<Profile />}
          />


          

          <Route
            path="preferences"
            element={<Preferences />}
          />


          

          <Route
            path="internships"
            element={<Internships />}
          />


          

          <Route
            path="internships/:id"
            element={<InternshipDetails />}
          />


         

          <Route
            path="internships/all"
            element={<Recommendations />}
          />


          

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
  );
}