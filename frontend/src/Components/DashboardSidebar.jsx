import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
  LayoutDashboard,
  UserRound,
  Settings,
  BriefcaseBusiness,
  FileText,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react'

import { useLanguage } from "../context/LanguageContext"

import './DashboardSidebar.css'

export default function DashboardSidebar() {

  const navigate = useNavigate();

  const { t } = useLanguage();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);


  // ==========================================================
  // CLOSE SIDEBAR ON OUTSIDE CLICK
  // ==========================================================

  useEffect(() => {

    const handleOutsideClick = (event) => {

      if (
        window.innerWidth <= 400 &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }

    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };

  }, [sidebarOpen]);


  // ==========================================================
  // CLOSE SIDEBAR AFTER NAVIGATION
  // ==========================================================

  const closeMobileSidebar = () => {
    if (window.innerWidth <= 400) {
      setSidebarOpen(false);
    }
  };


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

    // Close mobile sidebar
    closeMobileSidebar();

    // Go to login
    navigate("/login");

  };


  return (

    <>

      {/* ======================================================
          MOBILE HAMBURGER
      ====================================================== */}

      <button
        ref={toggleRef}
        type="button"
        className="sidebar-mobile-toggle"
        aria-label={
          sidebarOpen
            ? "Close dashboard menu"
            : "Open dashboard menu"
        }
        aria-expanded={sidebarOpen}
        onClick={() =>
          setSidebarOpen((previous) => !previous)
        }
      >

        {sidebarOpen ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}

      </button>


      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}


      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        ref={sidebarRef}
        className={`dashboard-sidebar ${
          sidebarOpen
            ? "mobile-sidebar-open"
            : ""
        }`}
      >


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
            onClick={closeMobileSidebar}
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
            onClick={closeMobileSidebar}
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
            onClick={closeMobileSidebar}
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
            onClick={closeMobileSidebar}
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
            onClick={closeMobileSidebar}
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
            onClick={() => {
              navigate("/");
              closeMobileSidebar();
            }}
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

    </>

  );
}
