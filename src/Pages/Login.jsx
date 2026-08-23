import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import rf from "../assets/rf.png";
import "./Login.css";
import "../index2.css";
import LogFooter from "../Components/LogFooter";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {

  const navigate = useNavigate();

  const { t } = useLanguage();

  const [role, setRole] = useState("student");

  const isStudent = role === "student";

  const handleLogin = () => {

    if (isStudent) {
      navigate("/dashboard");
    } else {
      navigate("/company/dashboard");
    }

  };

  const handleRegister = () => {

    if (isStudent) {
      navigate("/register");
    } else {
      navigate("/company/register");
    }

  };

  return (
    <>
      <Navbar />

      <div className="log-left-mid m-auo">

        {/* =========================
            LEFT IMAGE SECTION
        ========================= */}

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


        {/* =========================
            RIGHT LOGIN SECTION
        ========================= */}

        <div className="right">

          {/* Heading */}

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


          {/* =========================
              ROLE SWITCH
          ========================= */}

          <div className="role-switch">

            <button
              className={
                isStudent
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() => setRole("student")}
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
              onClick={() => setRole("organization")}
              type="button"
            >
              {t.organization}
            </button>

          </div>


          {/* =========================
              EMAIL
          ========================= */}

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
              placeholder={
                isStudent
                  ? t.studentEmailPlaceholder
                  : t.organizationEmailPlaceholder
              }
            />

          </div>


          {/* =========================
              PASSWORD
          ========================= */}

          <div className="email">

            <h4 className="e-txt">
              {t.password}
            </h4>

            <input
              className="input"
              type="password"
              placeholder={t.passwordPlaceholder}
            />

          </div>


          {/* =========================
              LOGIN BUTTON
          ========================= */}

          <div className="btn-div">

            <button
              className="log-btn"
              onClick={handleLogin}
              type="button"
            >
              <span className="login">
                {t.login}
              </span>
            </button>

          </div>


          {/* =========================
              REGISTER
          ========================= */}

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