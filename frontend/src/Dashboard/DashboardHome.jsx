import React, { useEffect, useState } from "react";

import {
  UserRound,
  BriefcaseBusiness,
  FileText,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./DashboardHome.css";


const API_BASE_URL = "https://internsetubackend.onrender.com/api";


export default function DashboardHome() {

  const navigate = useNavigate();


  // ==========================================================
  // Student
  // ==========================================================

  const [studentName, setStudentName] =
    useState("Student");

  const [loadingStudent, setLoadingStudent] =
    useState(true);


  // ==========================================================
  // Get token
  // ==========================================================

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );

  };


  // ==========================================================
  // Fetch logged-in student
  // ==========================================================

  useEffect(() => {

    const loadStudent = async () => {

      try {

        const token = getToken();


        if (!token) {

          navigate("/login");

          return;

        }


        const response = await fetch(
          `${API_BASE_URL}/students/profile`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


        const result =
          await response.json();


        if (
          !response.ok ||
          !result?.success
        ) {

          throw new Error(
            result?.message ||
            "Failed to fetch student profile."
          );

        }


        const student =
          result?.data;


        if (student?.fullName) {

          setStudentName(
            student.fullName
          );

        }

      } catch (error) {

        console.error(
          "Dashboard student fetch error:",
          error
        );

      } finally {

        setLoadingStudent(false);

      }

    };


    loadStudent();

  }, [navigate]);


  // ==========================================================
  // Navigation
  // ==========================================================

  const handleCompleteProfile = () => {
    navigate("/dashboard/profile");
  };


  const handleUpdateProfile = () => {
    navigate("/dashboard/profile");
  };


  const handleUpdatePreferences = () => {
    navigate("/dashboard/preferences");
  };


  const handleBrowseInternships = () => {
    navigate("/dashboard/internships");
  };


  const handleTrackApplications = () => {
    navigate("/dashboard/applications");
  };


  const handleViewAllRecommendations = () => {
    navigate("/dashboard/internships/all");
  };


  const handleViewInternship = (id) => {
    navigate(
      `/dashboard/internships/${id}`
    );
  };


  return (
    <div className="dashboard-home">


      {/* =====================================================
          WELCOME
      ===================================================== */}

      <div className="welcome-box">

        <div>

          <p className="welcome-small">
            Welcome back 👋
          </p>


          <h1>
            Hello,{" "}
            {loadingStudent
              ? "Student"
              : studentName}
            !
          </h1>


          <p className="welcome-text">
            Let's find the right internship for your career.
          </p>

        </div>


        <div className="welcome-icon">

          <Sparkles size={42} />

        </div>

      </div>


      {/* =====================================================
          PROFILE COMPLETION
      ===================================================== */}

      <div className="profile-completion">

        <div className="profile-info">

          <div className="profile-icon">

            <UserRound size={25} />

          </div>


          <div>

            <h3>
              Complete your profile
            </h3>

            <p>
              Complete your profile to get better internship recommendations.
            </p>

          </div>

        </div>


        <div className="profile-progress">

          <div className="progress-top">

            <span>
              Profile Completion
            </span>

            <strong>
              70%
            </strong>

          </div>


          <div className="progress-bar">

            <div className="progress-fill"></div>

          </div>

        </div>


        <button
          className="complete-profile-btn"
          onClick={handleCompleteProfile}
          type="button"
        >

          Complete Profile

          <ArrowRight size={17} />

        </button>

      </div>


      {/* =====================================================
          APPLICATION OVERVIEW
      ===================================================== */}

      <div className="section-heading">

        <div>

          <h2>
            Application Overview
          </h2>

          <p>
            Track your internship applications.
          </p>

        </div>

      </div>


      <div className="overview-grid">


        <div className="overview-card">

          <div className="overview-icon orange">

            <BriefcaseBusiness size={23} />

          </div>

          <div>

            <h2>
              8
            </h2>

            <p>
              Total Applications
            </p>

          </div>

        </div>


        <div className="overview-card">

          <div className="overview-icon blue">

            <Clock3 size={23} />

          </div>

          <div>

            <h2>
              3
            </h2>

            <p>
              Under Review
            </p>

          </div>

        </div>


        <div className="overview-card">

          <div className="overview-icon green">

            <Sparkles size={23} />

          </div>

          <div>

            <h2>
              2
            </h2>

            <p>
              Shortlisted
            </p>

          </div>

        </div>


        <div className="overview-card">

          <div className="overview-icon purple">

            <FileText size={23} />

          </div>

          <div>

            <h2>
              24
            </h2>

            <p>
              Recommended
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          RECOMMENDATIONS
      ===================================================== */}

      <div className="section-heading recommendation-heading">

        <div>

          <h2>
            AI Recommended Internships
          </h2>

          <p>
            Opportunities selected based on your profile and preferences.
          </p>

        </div>


        <button
          className="view-all-btn"
          onClick={
            handleViewAllRecommendations
          }
          type="button"
        >

          View All

          <ArrowRight size={17} />

        </button>

      </div>


      <div className="recommendation-grid">


        {/* =================================================
            CARD 1
        ================================================= */}

        <div className="recommendation-card">

          <div className="recommendation-top">

            <div className="company-logo-home">
              ABC
            </div>

            <span className="match">

              <Sparkles size={14} />

              92% Match

            </span>

          </div>


          <h3>
            Software Developer Intern
          </h3>


          <p className="company-name">
            ABC Technologies
          </p>


          <div className="recommendation-meta">

            <span>

              <MapPin size={15} />

              Mumbai

            </span>


            <span>

              <Clock3 size={15} />

              3 Months

            </span>

          </div>


          <div className="home-skills">

            <span>
              React
            </span>

            <span>
              JavaScript
            </span>

            <span>
              Python
            </span>

          </div>


          <div className="recommendation-bottom">

            <strong>
              ₹15,000 / month
            </strong>


            <button
              type="button"
              onClick={() =>
                handleViewInternship(1)
              }
            >
              View
            </button>

          </div>

        </div>


        {/* =================================================
            CARD 2
        ================================================= */}

        <div className="recommendation-card">

          <div className="recommendation-top">

            <div className="company-logo-home">
              XYZ
            </div>

            <span className="match">

              <Sparkles size={14} />

              88% Match

            </span>

          </div>


          <h3>
            AI / ML Intern
          </h3>


          <p className="company-name">
            XYZ Innovations
          </p>


          <div className="recommendation-meta">

            <span>

              <MapPin size={15} />

              Bangalore

            </span>


            <span>

              <Clock3 size={15} />

              6 Months

            </span>

          </div>


          <div className="home-skills">

            <span>
              Python
            </span>

            <span>
              ML
            </span>

            <span>
              TensorFlow
            </span>

          </div>


          <div className="recommendation-bottom">

            <strong>
              ₹20,000 / month
            </strong>


            <button
              type="button"
              onClick={() =>
                handleViewInternship(2)
              }
            >
              View
            </button>

          </div>

        </div>


        {/* =================================================
            CARD 3
        ================================================= */}

        <div className="recommendation-card">

          <div className="recommendation-top">

            <div className="company-logo-home">
              DEF
            </div>

            <span className="match">

              <Sparkles size={14} />

              84% Match

            </span>

          </div>


          <h3>
            Data Analyst Intern
          </h3>


          <p className="company-name">
            DEF Analytics
          </p>


          <div className="recommendation-meta">

            <span>

              <MapPin size={15} />

              Pune

            </span>


            <span>

              <Clock3 size={15} />

              3 Months

            </span>

          </div>


          <div className="home-skills">

            <span>
              Python
            </span>

            <span>
              SQL
            </span>

            <span>
              Power BI
            </span>

          </div>


          <div className="recommendation-bottom">

            <strong>
              ₹12,000 / month
            </strong>


            <button
              type="button"
              onClick={() =>
                handleViewInternship(3)
              }
            >
              View
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="section-heading quick-heading">

        <div>

          <h2>
            Quick Actions
          </h2>

          <p>
            Manage your internship journey.
          </p>

        </div>

      </div>


      <div className="quick-actions">


        <button
          type="button"
          onClick={handleUpdateProfile}
        >

          <UserRound size={20} />

          Update Profile

        </button>


        <button
          type="button"
          onClick={
            handleUpdatePreferences
          }
        >

          <Sparkles size={20} />

          Update Preferences

        </button>


        <button
          type="button"
          onClick={
            handleBrowseInternships
          }
        >

          <BriefcaseBusiness size={20} />

          Browse Internships

        </button>


        <button
          type="button"
          onClick={
            handleTrackApplications
          }
        >

          <FileText size={20} />

          Track Applications

        </button>

      </div>

    </div>
  );

}