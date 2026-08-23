import React, { useState } from 'react';
import './Navbar.css';
import '../index2.css';

import stateEmble from "../assets/stateEmble.png";
import logo from "../assets/logo.png";

import {
  Menu,
  X
} from "lucide-react";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    language,
    setLanguage,
    t
  } = useLanguage();


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <>

      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <div className="nav-1 flex gap">

        {/* LEFT SECTION */}

        <div className="flex gap-1 m">

          <img
            className="logo"
            src={logo}
            alt="InternSetu"
          />

          <img
            className="satymev m-auto"
            src={stateEmble}
            alt="Government Emblem"
          />

          <div className="gov-text">
            भारत सरकार
            <br />
            Government Of India
          </div>

        </div>


        {/* RIGHT SECTION */}

        <div className="flex gap-2 m-r">

          <div className="pd t skip-text">
            {t.skipMain}
          </div>


          {/* LANGUAGE */}

          <select
            className="language-select m-auto"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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


          {/* LOGIN */}

          <button
            className="btn t"
            onClick={() => navigate("/login")}
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
            DESKTOP DASHBOARD BUTTON
        ================================================= */}

        <button
          className="desktop-dashboard-btn"
          onClick={() => navigate("/dashboard")}
          aria-label="Open Dashboard"
        >
          <Menu size={24} />
        </button>


        {/* =================================================
            DESKTOP NAV LINKS
        ================================================= */}

        <div className="nav-link desktop-nav">


          {/* HOME */}

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


          {/* INTERNSHIP */}

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


          {/* DOCUMENTS */}

          <div className="link t">
            {t.documents}
          </div>


          {/* HOW IT WORKS */}

          <div className="link t">
            {t.howItWorks}
          </div>


          {/* ABOUT */}

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
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
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


            {/* DASHBOARD */}

            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "mobile-link active"
                  : "mobile-link"
              }
            >
              {t.dashboard}
            </NavLink>


            {/* HOME */}

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


            {/* INTERNSHIP */}

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


            {/* DOCUMENTS */}

            <div className="mobile-link">
              {t.documents}
            </div>


            {/* HOW IT WORKS */}

            <div className="mobile-link">
              {t.howItWorks}
            </div>


            {/* ABOUT */}

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