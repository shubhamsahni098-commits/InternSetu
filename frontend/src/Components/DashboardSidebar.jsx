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


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {

    // Remove authentication tokens
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");

    // Also clear session storage if anything auth-related
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("accessToken");

    // Go to login
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


        {/* DASHBOARD */}

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


        {/* PROFILE */}

        <NavLink
          to="/dashboard/profile"
          className="sidebar-link"
        >

          <UserRound size={20} />

          <span>
            {t.myProfile}
          </span>

        </NavLink>


        {/* PREFERENCES */}

        <NavLink
          to="/dashboard/preferences"
          className="sidebar-link"
        >

          <Settings size={20} />

          <span>
            {t.preferences}
          </span>

        </NavLink>


        {/* INTERNSHIPS */}

        <NavLink
          to="/dashboard/internships"
          className="sidebar-link"
        >

          <BriefcaseBusiness size={20} />

          <span>
            {t.internship}
          </span>

        </NavLink>


        {/* APPLICATIONS */}

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


        {/* RETURN HOME */}

        <div
          className="sidebar-action"
          onClick={() => navigate("/")}
        >

          <Home size={20} />

          <span>
            {t.returnToHome}
          </span>

        </div>


        {/* LOGOUT */}

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

  );
}