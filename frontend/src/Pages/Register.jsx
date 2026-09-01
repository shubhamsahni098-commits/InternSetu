import React, { useState } from "react";

import Navbar from "../Components/Navbar";
import LogFooter from "../Components/LogFooter";

import { useNavigate } from "react-router-dom";

import "./Register.css";
import "../index2.css";


const API_BASE_URL = "http://localhost:5000/api";


export default function Register() {

  const navigate = useNavigate();


  // ==========================================================
  // Form State
  // ==========================================================

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // ==========================================================
  // Register
  // ==========================================================

  const handleRegister = async () => {

    setError("");
    setSuccess("");


    // --------------------------------------------------------
    // Basic validation
    // --------------------------------------------------------

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError(
        "Please accept the Terms & Conditions."
      );
      return;
    }


    try {

      setLoading(true);


      // ------------------------------------------------------
      // Backend registration
      // ------------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/auth/student/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            password,
          }),
        }
      );


      const result = await response.json();


      // ------------------------------------------------------
      // Backend error
      // ------------------------------------------------------

      if (!response.ok || !result?.success) {

        throw new Error(
          result?.message ||
          "Unable to create account."
        );
      }


      // ------------------------------------------------------
      // Registration successful
      //
      // Do NOT auto-login.
      // User should go to Login page.
      // ------------------------------------------------------

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );


      setTimeout(() => {

        navigate("/login");

      }, 1000);

    } catch (err) {

      console.error(
        "Registration error:",
        err
      );

      setError(
        err?.message ||
        "Unable to create account. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================================
  // Enter key
  // ==========================================================

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleRegister();
    }

  };


  return (
    <>
      <Navbar />


      <div className="register-container m-ato">


        {/* ====================================================
            LEFT SIDE
        ==================================================== */}

        <div className="register-left">

          <div className="register-overlay">

            <h1>
              InternSetu
            </h1>

            <p>
              Connecting Students with Opportunities
            </p>

          </div>

        </div>


        {/* ====================================================
            RIGHT SIDE
        ==================================================== */}

        <div className="register-right">


          <h1 className="register-title">
            Create your account
          </h1>


          {/* ==================================================
              NAME + PHONE
          ================================================== */}

          <div className="form-row">


            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="Enter your full name"
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="+91 XXXXXXX XXXXX"
              />

            </div>

          </div>


          {/* ==================================================
              EMAIL
          ================================================== */}

          <div className="form-group full-width">

            <label>
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
            />

          </div>


          {/* ==================================================
              PASSWORDS
          ================================================== */}

          <div className="form-row">


            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="Create password"
              />

            </div>


            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="Confirm password"
              />

            </div>

          </div>


          {/* ==================================================
              TERMS
          ================================================== */}

          <div className="terms">

            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) =>
                setAcceptedTerms(
                  event.target.checked
                )
              }
            />

            <span>
              I agree to the Terms & Conditions
              and Privacy Policy
            </span>

          </div>


          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (

            <div
              style={{
                marginTop: "12px",
                color: "#d93025",
                fontSize: "14px",
              }}
            >
              {error}
            </div>

          )}


          {/* ==================================================
              SUCCESS
          ================================================== */}

          {success && (

            <div
              style={{
                marginTop: "12px",
                color: "#188038",
                fontSize: "14px",
              }}
            >
              {success}
            </div>

          )}


          {/* ==================================================
              CREATE ACCOUNT
          ================================================== */}

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>


          {/* ==================================================
              LOGIN
          ================================================== */}

          <p className="signin-text">

            Already have an account?

            <span
              className="signin-link"
              onClick={() =>
                navigate("/login")
              }
            >
              Sign In
            </span>

          </p>

        </div>

      </div>


      <LogFooter />
    </>
  );
}