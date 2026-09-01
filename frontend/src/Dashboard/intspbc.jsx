import React, { useState } from "react";

import {
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import InternshipCard from "../Dashboard/InternshipCard";

import "./Internships.css";


const API_BASE_URL =
  "http://localhost:5000/api";


export default function Internships() {

  const navigate = useNavigate();


  // ==========================================================
  // STATE
  // ==========================================================

  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [hasRecommended, setHasRecommended] =
    useState(false);

  const [error, setError] =
    useState("");


  // ==========================================================
  // PERSONALIZATION POPUP
  // ==========================================================

  const [showInterestPopup, setShowInterestPopup] =
    useState(false);

  const [interestDescription, setInterestDescription] =
    useState("");


  // ==========================================================
  // GET JWT TOKEN
  // ==========================================================

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );

  };


  // ==========================================================
  // FETCH RECOMMENDATIONS
  // ==========================================================

  const fetchRecommendations = async () => {

    try {

      setLoading(true);

      setError("");


      const token = getToken();


      if (!token) {

        setError(
          "Please login to get personalized recommendations."
        );

        setRecommendations([]);

        setLoading(false);

        return;
      }


      const response = await fetch(
        `${API_BASE_URL}/recommendations`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
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
          "Failed to fetch recommendations."
        );

      }


      const recommendationList =
        result?.data?.recommendations;


      if (
        !Array.isArray(
          recommendationList
        )
      ) {

        throw new Error(
          "Invalid recommendation response from server."
        );

      }


      setRecommendations(
        recommendationList
      );

      setHasRecommended(true);

    } catch (err) {

      console.error(
        "Recommendation fetch error:",
        err
      );


      setError(
        err?.message ||
        "Unable to load recommendations."
      );

      setRecommendations([]);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // OPEN PERSONALIZATION POPUP
  // ==========================================================

  const handleRecommendClick = () => {

    const savedDescription =
      localStorage.getItem(
        "studentInterestDescription"
      );


    if (savedDescription) {

      setInterestDescription(
        savedDescription
      );

    }


    setError("");

    setShowInterestPopup(true);

  };


  // ==========================================================
  // SUBMIT PERSONALIZATION
  // ==========================================================

  const handleSubmitInterest = async () => {

    const trimmedDescription =
      interestDescription.trim();


    // Save description locally for now.
    // Backend/NLP integration will consume this field later.
    if (trimmedDescription) {

      localStorage.setItem(
        "studentInterestDescription",
        trimmedDescription
      );

    } else {

      localStorage.removeItem(
        "studentInterestDescription"
      );

    }


    setShowInterestPopup(false);


    await fetchRecommendations();

  };


  // ==========================================================
  // SKIP PERSONALIZATION
  // ==========================================================

  const handleSkipInterest = async () => {

    setInterestDescription("");


    setShowInterestPopup(false);


    await fetchRecommendations();

  };


  // ==========================================================
  // CLOSE POPUP
  // ==========================================================

  const handleClosePopup = () => {

    setShowInterestPopup(false);

  };


  // ==========================================================
  // FEEDBACK
  // ==========================================================

  const handleFeedback = async (
    internshipId,
    feedbackType
  ) => {

    try {

      const token = getToken();


      if (!token) {

        setError(
          "Please login before giving feedback."
        );

        return;

      }


      setError("");


      const response = await fetch(
        `${API_BASE_URL}/feedback`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            internshipId,
            feedback:
              feedbackType,
          }),
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
          "Failed to submit feedback."
        );

      }


      // Refresh recommendations
      await fetchRecommendations();

    } catch (err) {

      console.error(
        "Feedback error:",
        err
      );


      setError(
        err?.message ||
        "Unable to submit feedback."
      );

    }

  };


  // ==========================================================
  // VIEW ALL
  // ==========================================================

  const handleViewAll = () => {

    navigate(
      "/dashboard/internships/all"
    );

  };


  return (

    <div className="internships-page">


      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="internships-heading">

        <h1>
          Find Internships
        </h1>

        <p>
          Find the right internship opportunities
          for your career.
        </p>

      </div>


      {/* =====================================================
          SEARCH & FILTERS
      ===================================================== */}

      <div className="internship-filters">


        {/* Search */}

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search internships..."
          />

        </div>


        {/* Domain */}

        <select defaultValue="">

          <option value="">
            All Domains
          </option>

          <option value="Software Development">
            Software Development
          </option>

          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>

          <option value="Data Science">
            Data Science
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Cyber Security">
            Cyber Security
          </option>

        </select>


        {/* Location */}

        <select defaultValue="">

          <option value="">
            All Locations
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

          <option value="Pune">
            Pune
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Delhi">
            Delhi
          </option>

          <option value="Hyderabad">
            Hyderabad
          </option>

          <option value="Remote">
            Remote
          </option>

        </select>


        {/* Work Mode */}

        <select defaultValue="">

          <option value="">
            Work Mode
          </option>

          <option value="On-site">
            On-site
          </option>

          <option value="Remote">
            Remote
          </option>

          <option value="Hybrid">
            Hybrid
          </option>

        </select>

      </div>


      {/* =====================================================
          RESULT HEADING
      ===================================================== */}

      <div className="results-heading">

        <div>

          <h2>
            Recommended Internships
          </h2>

          <p>
            Top opportunities based on your profile
            and preferences.
          </p>

        </div>


        {/* Recommend Button */}

        <button
          className="find"
          onClick={
            handleRecommendClick
          }
          disabled={loading}
          type="button"
        >

          <Sparkles size={15} />

          {loading
            ? "Finding..."
            : "Recommend"
          }

        </button>

      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div className="recommendation-error">

          {error}

        </div>

      )}


      {/* =====================================================
          BEFORE RECOMMENDATION
      ===================================================== */}

      {!loading &&
        !hasRecommended && (

          <div className="recommendation-empty">

            <Sparkles size={28} />

            <h3>
              Ready for personalized recommendations?
            </h3>

            <p>
              Click the Recommend button to find
              internships matched to your profile
              and preferences.
            </p>

          </div>

        )}


      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div className="recommendation-loading">

          <div className="recommendation-spinner"></div>

          <p>
            Finding the best internships for you...
          </p>

        </div>

      )}


      {/* =====================================================
          TOP 3
      ===================================================== */}

      {!loading &&
        hasRecommended &&
        recommendations.length > 0 && (

          <div className="internship-list">

            {recommendations
              .slice(0, 3)
              .map(
                (internship) => (

                  <InternshipCard
                    key={
                      internship.internship_id
                    }
                    internship={
                      internship
                    }
                    onFeedback={
                      handleFeedback
                    }
                  />

                )
              )}

          </div>

        )}


      {/* =====================================================
          NO RESULTS
      ===================================================== */}

      {!loading &&
        hasRecommended &&
        recommendations.length === 0 &&
        !error && (

          <div className="no-recommendations">

            <Sparkles size={22} />

            <h3>
              No recommendations available
            </h3>

            <p>
              Update your profile and preferences
              to improve your recommendations.
            </p>

          </div>

        )}


      {/* =====================================================
          VIEW ALL
      ===================================================== */}

      {!loading &&
        hasRecommended &&
        recommendations.length > 0 && (

          <div className="view-all-wrapper">

            <button
              className="view-all-btn"
              onClick={
                handleViewAll
              }
              type="button"
            >

              View All

              <span>
                →
              </span>

            </button>

          </div>

        )}


      {/* =====================================================
          PERSONALIZATION POPUP
      ===================================================== */}

      {showInterestPopup && (

        <div
          className="interest-modal-overlay"
          onClick={
            handleClosePopup
          }
        >

          <div
            className="interest-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* Close */}

            <button
              type="button"
              className="interest-modal-close"
              onClick={
                handleClosePopup
              }
              aria-label="Close"
            >

              <X size={20} />

            </button>


            {/* Icon */}

            <div className="interest-modal-icon">

              <Sparkles size={26} />

            </div>


            {/* Heading */}

            <h2>
              Help us find more personalized internships for you
            </h2>


            {/* Description */}

            <p className="interest-modal-description">

              Tell us a little about your interests,
              career goals, or the kind of work you
              would like to explore.

            </p>


            {/* Textarea */}

            <textarea
              className="interest-textarea"
              value={
                interestDescription
              }
              onChange={(event) =>
                setInterestDescription(
                  event.target.value
                )
              }
              placeholder="For example: I want to work on AI/ML projects involving Python, machine learning, deep learning and real-world data..."
              rows={6}
              maxLength={1000}
            />


            {/* Character count */}

            <div className="interest-character-count">

              {interestDescription.length}/1000

            </div>


            {/* Buttons */}

            <div className="interest-modal-actions">


              <button
                type="button"
                className="interest-skip-btn"
                onClick={
                  handleSkipInterest
                }
              >

                Skip

              </button>


              <button
                type="button"
                className="interest-submit-btn"
                onClick={
                  handleSubmitInterest
                }
              >

                Submit

              </button>

            </div>


          </div>

        </div>

      )}

    </div>

  );

}