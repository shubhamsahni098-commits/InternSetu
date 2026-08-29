/*
import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  LayoutDashboard,
  UserRound,
  Settings,
  BriefcaseBusiness,
  FileText
} from 'lucide-react'

import './DashboardSidebar.css'

export default function DashboardSidebar() {

  return (
    <aside className="dashboard-sidebar">

      <div className="sidebar-title">
        <h2>
            <span className="intern-text">Intern</span>
            <span className="setu-text">Setu</span>
        </h2>
      </div>


      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          end
          className="sidebar-link"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/dashboard/profile"
          className="sidebar-link"
        >
          <UserRound size={20} />
          <span>My Profile</span>
        </NavLink>


        <NavLink
          to="/dashboard/preferences"
          className="sidebar-link"
        >
          <Settings size={20} />
          <span>Preferences</span>
        </NavLink>


        <NavLink
          to="/dashboard/internships"
          className="sidebar-link"
        >
          <BriefcaseBusiness size={20} />
          <span>Internships</span>
        </NavLink>


        <NavLink
          to="/dashboard/applications"
          className="sidebar-link"
        >
          <FileText size={20} />
          <span>Applications</span>
        </NavLink>

      </nav>

    </aside>
  )
}*/

import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
  LayoutDashboard,
  UserRound,
  Settings,
  BriefcaseBusiness,
  FileText,
  Home,
  LogOut
} from 'lucide-react'

import { useLanguage } from "../context/LanguageContext"

import './DashboardSidebar.css'

export default function DashboardSidebar() {

  const navigate = useNavigate();

  const { t } = useLanguage();

  const handleLogout = () => {

    // Backend/auth integration baad me
    navigate("/login");

  };

  return (

    <aside className="dashboard-sidebar">


      {/* =========================
          LOGO
      ========================= */}

      <div className="sidebar-title">

        <h2>
          <span className="intern-text">
            Intern
          </span>

          <span className="setu-text">
            Setu
          </span>
        </h2>

      </div>


      {/* =========================
          MAIN NAVIGATION
      ========================= */}

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          end
          className="sidebar-link"
        >
          <LayoutDashboard size={20} />

          <span>
            {t.dashboard}
          </span>
        </NavLink>


        <NavLink
          to="/dashboard/profile"
          className="sidebar-link"
        >
          <UserRound size={20} />

          <span>
            {t.myProfile}
          </span>
        </NavLink>


        <NavLink
          to="/dashboard/preferences"
          className="sidebar-link"
        >
          <Settings size={20} />

          <span>
            {t.preferences}
          </span>
        </NavLink>


        <NavLink
          to="/dashboard/internships"
          className="sidebar-link"
        >
          <BriefcaseBusiness size={20} />

          <span>
            {t.internship}
          </span>
        </NavLink>


        <NavLink
          to="/dashboard/applications"
          className="sidebar-link"
        >
          <FileText size={20} />

          <span>
            {t.applications}
          </span>
        </NavLink>

      </nav>


      {/* =========================
          BOTTOM ACTIONS
      ========================= */}

      <div className="sidebar-bottom">


        {/* Return Home */}

        <div
          className="sidebar-action"
          onClick={() => navigate("/")}
        >
          <Home size={20} />

          <span>
            {t.returnToHome}
          </span>
        </div>


        {/* Logout */}

        <div
          className="sidebar-action logout-action"
          onClick={handleLogout}
        >
          <LogOut size={20} />

          <span>
            {t.logout}
          </span>
        </div>

      </div>

    </aside>
  )
}