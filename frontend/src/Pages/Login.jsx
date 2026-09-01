import React, { useState } from "react";

import Navbar from "../Components/Navbar";
import LogFooter from "../Components/LogFooter";

import "./Login.css";
import "../index2.css";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";


const API_BASE_URL = "http://localhost:5000/api";


export default function Login() {

  const navigate = useNavigate();

  const { t } = useLanguage();


  // ==========================================================
  // Login State
  // ==========================================================

  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const isStudent = role === "student";


  // ==========================================================
  // Handle Role Change
  // ==========================================================

  const handleRoleChange = (newRole) => {

    setRole(newRole);

    setEmail("");

    setPassword("");

    setError("");

  };


  // ==========================================================
  // Login
  // ==========================================================

  const handleLogin = async () => {

    // --------------------------------------------------------
    // Basic validation
    // --------------------------------------------------------

    if (!email.trim()) {

      setError(
        isStudent
          ? "Please enter your email."
          : "Please enter your organization email."
      );

      return;
    }


    if (!password) {

      setError(
        "Please enter your password."
      );

      return;
    }


    try {

      setLoading(true);

      setError("");


      // ------------------------------------------------------
      // Correct backend endpoint
      // ------------------------------------------------------

      const endpoint = isStudent
        ? `${API_BASE_URL}/auth/student/login`
        : `${API_BASE_URL}/auth/company/login`;


      // ------------------------------------------------------
      // Correct request body
      // ------------------------------------------------------

      const requestBody = isStudent
        ? {
            email: email.trim(),
            password,
          }
        : {
            officialEmail: email.trim(),
            password,
          };


      // ------------------------------------------------------
      // Call backend
      // ------------------------------------------------------

      const response = await fetch(
        endpoint,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            requestBody
          ),
        }
      );


      // ------------------------------------------------------
      // Parse JSON
      // ------------------------------------------------------

      const result =
        await response.json();


      // ------------------------------------------------------
      // Handle API errors
      // ------------------------------------------------------

      if (
        !response.ok ||
        !result?.success
      ) {

        throw new Error(
          result?.message ||
          "Invalid email or password."
        );

      }


      // ------------------------------------------------------
      // Get JWT token
      // ------------------------------------------------------

      const token =
        result?.data?.token;


      if (!token) {

        throw new Error(
          "Login successful, but authentication token was not received."
        );

      }


      // ------------------------------------------------------
      // Save JWT
      // ------------------------------------------------------

      localStorage.setItem(
        "token",
        token
      );


      // ------------------------------------------------------
      // Save user data
      // ------------------------------------------------------

      if (
        isStudent &&
        result?.data?.student
      ) {

        localStorage.setItem(
          "user",
          JSON.stringify(
            result.data.student
          )
        );

      }


      if (
        !isStudent &&
        result?.data?.company
      ) {

        localStorage.setItem(
          "user",
          JSON.stringify(
            result.data.company
          )
        );

      }


      // ------------------------------------------------------
      // Navigate after successful authentication
      // ------------------------------------------------------

      if (isStudent) {

        navigate("/dashboard");

      } else {

        navigate("/company/dashboard");

      }

    } catch (err) {

      console.error(
        "Login error:",
        err
      );

      setError(
        err?.message ||
        "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // Register
  // ==========================================================

  const handleRegister = () => {

    if (isStudent) {

      navigate("/register");

    } else {

      navigate("/company/register");

    }

  };


  // ==========================================================
  // Keyboard support
  // ==========================================================

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !loading
    ) {

      handleLogin();

    }

  };


  return (
    <>
      <Navbar />


      <div className="log-left-mid m-auo">


        {/* ====================================================
            LEFT IMAGE SECTION
        ==================================================== */}

        <div className="img-div">

          <div className="img-overlay">

            <h1>
              InternSetu
            </h1>

            <p>
              {t.connectingStudents}
            </p>

            <div className="overlay-line"></div>

            <span className="overlay-small-text">

              {isStudent
                ? t.findRightInternshipCareer
                : t.connectTalentedStudents
              }

            </span>

          </div>

        </div>


        {/* ====================================================
            RIGHT LOGIN SECTION
        ==================================================== */}

        <div className="right">


          {/* ==================================================
              HEADING
          ================================================== */}

          <div className="login-heading">

            <h1>

              {isStudent
                ? t.welcomeBack
                : t.welcomeOrganization
              }

            </h1>

            <p>

              {isStudent
                ? t.loginUsing
                : t.loginUsingOrganization
              }

            </p>

          </div>


          {/* ==================================================
              ROLE SWITCH
          ================================================== */}

          <div className="role-switch">

            <button
              className={
                isStudent
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() =>
                handleRoleChange(
                  "student"
                )
              }
              type="button"
            >

              {t.student}

            </button>


            <button
              className={
                !isStudent
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() =>
                handleRoleChange(
                  "organization"
                )
              }
              type="button"
            >

              {t.organization}

            </button>

          </div>


          {/* ==================================================
              EMAIL
          ================================================== */}

          <div className="email">

            <h4 className="e-txt">

              {isStudent
                ? t.emailPhone
                : t.organizationEmail
              }

            </h4>


            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              placeholder={
                isStudent
                  ? t.studentEmailPlaceholder
                  : t.organizationEmailPlaceholder
              }
              autoComplete="email"
            />

          </div>


          {/* ==================================================
              PASSWORD
          ================================================== */}

          <div className="email">

            <h4 className="e-txt">

              {t.password}

            </h4>


            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              placeholder={
                t.passwordPlaceholder
              }
              autoComplete="current-password"
            />

          </div>


          {/* ==================================================
              ERROR MESSAGE
          ================================================== */}

          {error && (

            <div
              style={{
                marginTop: "10px",
                color: "#d93025",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >

              {error}

            </div>

          )}


          {/* ==================================================
              LOGIN BUTTON
          ================================================== */}

          <div className="btn-div">

            <button
              className="log-btn"
              onClick={handleLogin}
              type="button"
              disabled={loading}
            >

              <span className="login">

                {loading
                  ? "Logging in..."
                  : t.login
                }

              </span>

            </button>

          </div>


          {/* ==================================================
              REGISTER
          ================================================== */}

          <h4 className="acc">

            {isStudent
              ? t.dontHaveAccount
              : t.dontHaveOrganizationAccount
            }


            <span
              className="create-link"
              onClick={handleRegister}
            >

              {t.createAccount}

            </span>

          </h4>

        </div>

      </div>


      <LogFooter />

    </>
  );
}
