import React, { useState } from "react";

import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./InternshipCard.css";


export default function InternshipCard({
  internship,
  studentSkills = [],
  onFeedback,
}) {

  const navigate = useNavigate();


  // ==========================================================
  // Safety check
  // ==========================================================

  if (!internship) {
    return null;
  }


  // ==========================================================
  // Internship ID
  // ==========================================================

  const internshipId =
    internship.internship_id ||
    internship.id;


  // ==========================================================
  // Get saved feedback from localStorage
  // ==========================================================

  const getSavedFeedback = () => {

    try {

      const stored =
        localStorage.getItem(
          "internshipFeedback"
        );

      if (!stored) {
        return null;
      }

      const feedbackMap =
        JSON.parse(stored);

      return (
        feedbackMap[internshipId] ||
        null
      );

    } catch (error) {

      console.error(
        "Failed to read saved feedback:",
        error
      );

      return null;

    }

  };


  const [
    feedback,
    setFeedback
  ] = useState(
    getSavedFeedback
  );


  // ==========================================================
  // Company
  // ==========================================================

  const companyName =
    internship.company ||
    "Company";


  const companyInitials =
    companyName
      .substring(0, 3)
      .toUpperCase();


  // ==========================================================
  // Display values
  // ==========================================================

  const title =
    internship.role ||
    internship.title ||
    "Internship";


  const location =
    internship.location ||
    "Not specified";


  const domain =
    internship.domain ||
    "Not specified";


  const duration =
    internship.duration ||
    "Not specified";


  const stipend =
    internship.stipend ||
    "Stipend not specified";


  const workMode =
    internship.work_mode ||
    internship.workMode ||
    "";


  const originalScore =
    internship.personalized_score_100 ??
    internship.final_score_100 ??
    0;


  const normalizeSkill = (skill) => {

    const normalized = String(skill || "")
      .trim()
      .toLowerCase()
      .replace(/[\s._-]+/g, "");


    const aliases = {
      ml: "machinelearning",
      aiml: "machinelearning",
      machinelearning: "machinelearning",
      js: "javascript",
      javascript: "javascript",
      node: "nodejs",
      nodejs: "nodejs",
      reactjs: "react",
      react: "react",
      cpp: "c++",
      "c++": "c++",
    };


    return aliases[normalized] || normalized;

  };


  const skills =
    Array.isArray(
      internship.skills
    )
      ? internship.skills
      : [];


  const normalizedStudentSkills =
    new Set(
      (Array.isArray(studentSkills)
        ? studentSkills
        : []
      ).map(normalizeSkill)
    );


  const matchedSkillCount =
    skills.filter((skill) => {
      const normalized =
        normalizeSkill(skill);

      return (
        normalized &&
        normalizedStudentSkills.has(normalized)
      );
    }).length;


  const skillCoverage =
    skills.length > 0
      ? Math.round(
          (matchedSkillCount / skills.length) *
            100
        )
      : 0;


  const penaltyMultiplier =
    skillCoverage <= 20
      ? 0.2
      : skillCoverage <= 40
        ? 0.4
        : skillCoverage <= 60
          ? 0.6
          : skillCoverage < 80
            ? 0.8
            : 1;


  const score =
    originalScore === null ||
    originalScore === undefined
      ? 0
      : Math.round(
          Number(originalScore) *
            penaltyMultiplier
        );


  const matchScoreStyle =
    score <= 40
      ? {
          backgroundColor: "#FEE2E2",
          color: "#B91C1C",
        }
      : score < 80
        ? {
            backgroundColor: "#FEF3C7",
            color: "#B45309",
          }
        : {
            backgroundColor: "#DCFCE7",
            color: "#15803D",
          };


  // ==========================================================
  // View Details
  // ==========================================================

  const handleViewDetails = () => {

    navigate(
      `/dashboard/internships/${internshipId}`
    );

  };


  // ==========================================================
  // Save feedback locally
  // ==========================================================

  const saveFeedbackLocally = (
    type
  ) => {

    try {

      const stored =
        localStorage.getItem(
          "internshipFeedback"
        );

      const feedbackMap =
        stored
          ? JSON.parse(stored)
          : {};

      feedbackMap[internshipId] =
        type;

      localStorage.setItem(
        "internshipFeedback",
        JSON.stringify(
          feedbackMap
        )
      );

    } catch (error) {

      console.error(
        "Failed to save feedback locally:",
        error
      );

    }

  };


  // ==========================================================
  // Feedback
  // ==========================================================

  const handleFeedback = async (
    type
  ) => {

    // --------------------------------------------------------
    // Clicking the same button again does nothing
    // --------------------------------------------------------

    if (feedback === type) {
      return;
    }


    // --------------------------------------------------------
    // Update UI immediately
    // --------------------------------------------------------

    setFeedback(type);


    // --------------------------------------------------------
    // Persist UI state
    // --------------------------------------------------------

    saveFeedbackLocally(type);


    // --------------------------------------------------------
    // Send feedback to parent/API
    // --------------------------------------------------------

    if (onFeedback) {

      try {

        await onFeedback(
          internshipId,
          type
        );

      } catch (error) {

        console.error(
          "Feedback submission failed:",
          error
        );

      }

    }

  };


  return (
    <div className="internship-box">


      {/* ====================================================
          COMPANY LOGO
      ==================================================== */}

      <div className="company-logo">

        {companyInitials}

      </div>


      {/* ====================================================
          INTERNSHIP DETAILS
      ==================================================== */}

      <div className="internship-details">


        {/* ==================================================
            TITLE ROW
        ================================================== */}

        <div className="title-row">

          <div>

            <h3>
              {title}
            </h3>

            <h4>
              {companyName}
            </h4>

          </div>


          {/* Match Score */}

          <div className="ai-match" style={matchScoreStyle}>

            <Sparkles size={15} />

            {Number(score).toFixed(0)}%

            <span>
              Match
            </span>

          </div>

        </div>


        {/* ==================================================
            META
        ================================================== */}

        <div className="internship-meta">

          <span>

            <MapPin size={16} />

            {location}

          </span>


          <span>

            <BriefcaseBusiness size={16} />

            {domain}

          </span>


          <span>

            <Clock3 size={16} />

            {duration}

          </span>

        </div>


        {/* ==================================================
            SKILLS
        ================================================== */}

        {skills.length > 0 && (

          <div className="skills">

            {skills.map(
              (skill, index) => (

                <span
                  key={`${skill}-${index}`}
                >
                  {skill}
                </span>

              )
            )}

          </div>

        )}


        {/* ==================================================
            RECOMMENDATION REASONS
        ================================================== */}

        {Array.isArray(
          internship.recommendation_reasons
        ) &&
          internship
            .recommendation_reasons
            .length > 0 && (

            <div className="recommendation-reasons">

              {internship
                .recommendation_reasons
                .slice(0, 2)
                .map(
                  (reason, index) => (

                    <span
                      key={`${reason}-${index}`}
                    >
                      {reason}
                    </span>

                  )
                )}

            </div>

          )}


        {/* ==================================================
            BOTTOM
        ================================================== */}

        <div className="card-bottom">


          {/* =================================================
              STIPEND
          ================================================= */}

          <div className="card-stipend">

            <strong>
              {stipend}
            </strong>


            {workMode && (

              <small>
                {workMode}
              </small>

            )}

          </div>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="card-actions">


            {/* =================================================
                LIKE
            ================================================= */}

            <button
              type="button"
              className={
                `feedback-btn like-btn ${
                  feedback === "like"
                    ? "active"
                    : ""
                }`
              }
              onClick={() =>
                handleFeedback(
                  "like"
                )
              }
              title="Like recommendation"
              aria-label="Like recommendation"
            >

              <ThumbsUp size={16} />

            </button>


            {/* =================================================
                DISLIKE
            ================================================= */}

            <button
              type="button"
              className={
                `feedback-btn dislike-btn ${
                  feedback === "dislike"
                    ? "active"
                    : ""
                }`
              }
              onClick={() =>
                handleFeedback(
                  "dislike"
                )
              }
              title="Dislike recommendation"
              aria-label="Dislike recommendation"
            >

              <ThumbsDown size={16} />

            </button>


            {/* =================================================
                VIEW DETAILS
            ================================================= */}

            <button
              type="button"
              onClick={
                handleViewDetails
              }
            >
              View Details
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}