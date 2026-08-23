import React from 'react'
import Navbar from '../Components/Navbar'

import LogFooter from '../Components/LogFooter'
import { useNavigate } from "react-router-dom";
import rf from '../assets/rf.png'
import './Register.css'
import '../index2.css'

export default function Register() {
    const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="register-container m-ato">

        {/* LEFT SIDE */}
        <div className="register-left">
          <div className="register-overlay">
            <h1>InternSetu</h1>
            <p>Connecting Students with Opportunities</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">

          <h1 className="register-title">
            Create your account
          </h1>

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+91 XXXXXXX XXXXX"
              />
            </div>

          </div>

          <div className="form-group full-width">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <input
                type="password"
                placeholder="Create password"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm password"
              />
            </div>

          </div>

          <div className="terms">
            <input type="checkbox" />
            <span>
              I agree to the Terms & Conditions and Privacy Policy
            </span>
          </div>

          <button className="register-btn"
          onClick={() => navigate("/login")}
          >
            Create Account
          </button>

          <p className="signin-text">
            Already have an account?
             <span className="signin-link"
               onClick={() => navigate("/login")}>
               Sign In
            </span>
          </p>

        </div>

      </div>

      <LogFooter />
    </>
  )
}