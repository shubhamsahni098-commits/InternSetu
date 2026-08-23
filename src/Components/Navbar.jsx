import React from 'react';
import './Navbar.css';
import '../index2.css';

import stateEmble from "../assets/stateEmble.png";
import logo from "../assets/logo.png";

import { Menu } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const {
    language,
    setLanguage,
    t
  } = useLanguage();

  return (
    <>

      {/* =====================================================
          NAV 1
      ===================================================== */}

      <div className='nav-1 flex gap'>

        <div className='flex gap-1 m'>

          <img
            className='logo'
            src={logo}
            alt="InternSetu"
          />

          <img
            className='satymev m-auto'
            src={stateEmble}
            alt="Government Emblem"
          />

          <div>
            भारत सरकार
            <br />
            Government Of India
          </div>

        </div>


        <div className='flex gap-2 m-r'>

          <div className='pd t'>
            {t.skipMain}
          </div>


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


          <button
            className="btn t"
            onClick={() => navigate("/login")}
          >
            {t.loginRegister}
          </button>

        </div>

      </div>


      {/* =====================================================
          NAV 2
      ===================================================== */}

      <div className='nav-2 flex gap-c'>


        {/* DASHBOARD MENU */}

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'link nav-menu-link active'
              : 'link nav-menu-link'
          }
        >
          <Menu size={24} />
        </NavLink>


        {/* MAIN NAVIGATION */}

        <div className='nav-link flex gap-4 m'>


          {/* HOME */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'link t active'
                : 'link t'
            }
          >
            {t.home}
          </NavLink>


          {/* INTERNSHIP */}

          <NavLink
            to="/dashboard/internships"
            className={({ isActive }) =>
              isActive
                ? 'link t active'
                : 'link t'
            }
          >
            {t.internship}
          </NavLink>


          {/* DOCUMENTS */}

          <div className='link t'>
            {t.documents}
          </div>


          {/* HOW IT WORKS */}

          <div className='link t'>
            {t.howItWorks}
          </div>


          {/* ABOUT */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'link t active'
                : 'link t'
            }
          >
            {t.about}
          </NavLink>


        </div>

      </div>

    </>
  );
}