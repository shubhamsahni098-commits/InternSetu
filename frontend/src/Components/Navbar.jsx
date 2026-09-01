import React, { useState } from "react";

import "./Navbar.css";
import "../index2.css";

import stateEmble from "../assets/stateEmble.png";
import logo from "../assets/logo.png";

import {
  Menu,
  X
} from "lucide-react";

import {
  NavLink,
  useLocation,
  useNavigate
} from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";


export default function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    language,
    setLanguage,
    t
  } = useLanguage();


  // ==========================================================
  // CLOSE MOBILE MENU
  // ==========================================================

  const closeMenu = () => {

    setMenuOpen(false);

  };


  // ==========================================================
  // DASHBOARD / LOGIN NAVIGATION
  // ==========================================================

  const handleDashboardNavigation = () => {

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken");


    if (token) {

      navigate("/dashboard");

    } else {

      navigate("/login");

    }

  };


  // ==========================================================
  // HOW IT WORKS NAVIGATION
  // ==========================================================

  const handleHowItWorks = () => {

    // Close mobile menu
    closeMenu();


    // ========================================================
    // If already on Home page
    // ========================================================

    if (location.pathname === "/") {

      const section =
        document.getElementById(
          "how-it-works"
        );


      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

      return;

    }


    // ========================================================
    // If on another page
    // First go to Home
    // Then scroll to section
    // ========================================================

    navigate("/");


    // Wait for Home page to render
    setTimeout(() => {

      const section =
        document.getElementById(
          "how-it-works"
        );


      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }, 100);

  };


  return (

    <>


      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <div className="nav-1 flex gap">


        {/* =================================================
            LEFT SECTION
        ================================================= */}

        <div className="flex gap-1 m">


          {/* Logo */}

          <img
            className="logo"
            src={logo}
            alt="InternSetu"
          />


          {/* Government Emblem */}

          <img
            className="satymev m-auto"
            src={stateEmble}
            alt="Government Emblem"
          />


          {/* Government Text */}

          <div className="gov-text">

            भारत सरकार

            <br />

            Government Of India

          </div>

        </div>


        {/* =================================================
            RIGHT SECTION
        ================================================= */}

        <div className="flex gap-2 m-r">


          {/* Skip Main Content */}

          <div className="pd t skip-text">

            {t.skipMain}

          </div>


          {/* =================================================
              LANGUAGE
          ================================================= */}

          <select
            className="language-select m-auto"
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
          >

            <option value="en">
              English
            </option>

            <option value="hi">
              हिन्दी
            </option>

            <option value="mr">
              मराठी
            </option>

            <option value="ta">
              தமிழ்
            </option>

          </select>


          {/* =================================================
              LOGIN
          ================================================= */}

          <button
            className="btn t"
            onClick={() =>
              navigate("/login")
            }
            type="button"
          >

            {t.loginRegister}

          </button>


        </div>

      </div>


      {/* =====================================================
          SECOND NAV
      ===================================================== */}

      <div className="nav-2">


        {/* =================================================
            DESKTOP DASHBOARD / LOGIN BUTTON
        ================================================= */}

        <button
          className="desktop-dashboard-btn"
          onClick={
            handleDashboardNavigation
          }
          aria-label="Open Dashboard"
          type="button"
        >

          <Menu size={24} />

        </button>


        {/* =================================================
            DESKTOP NAV LINKS
        ================================================= */}

        <div className="nav-link desktop-nav">


          {/* =================================================
              HOME
          ================================================= */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "link t active"
                : "link t"
            }
          >

            {t.home}

          </NavLink>


          {/* =================================================
              INTERNSHIP
          ================================================= */}

          <NavLink
            to="/dashboard/internships"
            className={({ isActive }) =>
              isActive
                ? "link t active"
                : "link t"
            }
          >

            {t.internship}

          </NavLink>


          {/* =================================================
              DOCUMENTS
          ================================================= */}

          <div className="link t">

            {t.documents}

          </div>


          {/* =================================================
              HOW IT WORKS
          ================================================= */}

          <button
            type="button"
            className="link t how-it-works-link"
            onClick={
              handleHowItWorks
            }
          >

            {t.howItWorks}

          </button>


          {/* =================================================
              ABOUT
          ================================================= */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "link t active"
                : "link t"
            }
          >

            {t.about}

          </NavLink>


        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          aria-label="Toggle navigation"
          type="button"
        >

          {menuOpen
            ? <X size={24} />
            : <Menu size={24} />
          }

        </button>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (

          <div className="mobile-nav">


            {/* =================================================
                DASHBOARD
            ================================================= */}

            <button
              type="button"
              className="mobile-link"
              onClick={() => {

                closeMenu();

                handleDashboardNavigation();

              }}
            >

              {t.dashboard}

            </button>


            {/* =================================================
                HOME
            ================================================= */}

            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "mobile-link active"
                  : "mobile-link"
              }
            >

              {t.home}

            </NavLink>


            {/* =================================================
                INTERNSHIP
            ================================================= */}

            <NavLink
              to="/dashboard/internships"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "mobile-link active"
                  : "mobile-link"
              }
            >

              {t.internship}

            </NavLink>


            {/* =================================================
                DOCUMENTS
            ================================================= */}

            <div className="mobile-link">

              {t.documents}

            </div>


            {/* =================================================
                HOW IT WORKS
            ================================================= */}

            <button
              type="button"
              className="mobile-link how-it-works-link"
              onClick={
                handleHowItWorks
              }
            >

              {t.howItWorks}

            </button>


            {/* =================================================
                ABOUT
            ================================================= */}

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "mobile-link active"
                  : "mobile-link"
              }
            >

              {t.about}

            </NavLink>


          </div>

        )}

      </div>

    </>

  );

}