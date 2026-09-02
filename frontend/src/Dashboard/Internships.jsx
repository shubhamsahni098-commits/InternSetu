import React, { useEffect, useState } from "react";

import {
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import InternshipCard from "../Dashboard/InternshipCard";

import "./Internships.css";


const API_BASE_URL =
  "https://internsetubackend.onrender.com/api";


// ==========================================================
// SESSION STORAGE KEYS
// ==========================================================

const RECOMMENDATIONS_CACHE_KEY =
  "recommendedInternships";

const RECOMMENDATIONS_CONTEXT_KEY =
  "recommendationsContext";


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

  const [checkingRecommendations, setCheckingRecommendations] =
    useState(true);

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
  // RECOMMENDATION CACHE HELPERS
  // ==========================================================

  const getCachedRecommendations = () => {

    try {

      const cached =
        sessionStorage.getItem(
          RECOMMENDATIONS_CACHE_KEY
        );


      if (!cached) {
        return [];
      }


      const parsed =
        JSON.parse(cached);


      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch (error) {

      console.error(
        "Failed to read recommendation cache:",
        error
      );

      return [];

    }

  };


  const saveRecommendationsToCache = (
    recommendationList
  ) => {

    try {

      sessionStorage.setItem(
        RECOMMENDATIONS_CACHE_KEY,
        JSON.stringify(
          recommendationList
        )
      );

    } catch (error) {

      console.error(
        "Failed to save recommendation cache:",
        error
      );

    }

  };


  const clearRecommendationCache = () => {

    try {

      sessionStorage.removeItem(
        RECOMMENDATIONS_CACHE_KEY
      );

      sessionStorage.removeItem(
        RECOMMENDATIONS_CONTEXT_KEY
      );

    } catch (error) {

      console.error(
        "Failed to clear recommendation cache:",
        error
      );

    }

  };


  const getCachedRecommendationContext = () => {

    try {

      const cached =
        sessionStorage.getItem(
          RECOMMENDATIONS_CONTEXT_KEY
        );


      if (!cached) {
        return null;
      }


      return JSON.parse(cached);

    } catch (error) {

      console.error(
        "Failed to read recommendation context:",
        error
      );

      return null;

    }

  };


  // ==========================================================
  // STABLE OBJECT STRING
  // ==========================================================

  const stableStringify = (value) => {

    if (
      value === null ||
      value === undefined
    ) {
      return JSON.stringify(value);
    }


    if (
      typeof value !== "object"
    ) {
      return JSON.stringify(value);
    }


    if (Array.isArray(value)) {

      return `[${value
        .map(
          (item) =>
            stableStringify(item)
        )
        .join(",")}]`;

    }


    const keys =
      Object.keys(value).sort();


    return `{${keys
      .map(
        (key) =>
          `${JSON.stringify(key)}:${stableStringify(
            value[key]
          )}`
      )
      .join(",")}}`;

  };


  // ==========================================================
  // BUILD RECOMMENDATION CONTEXT
  // ==========================================================

  const buildRecommendationContext = (
    profile,
    description
  ) => {

    const preferences =
      profile?.preferences || {};


    const skills =
      Array.isArray(
        profile?.skills
      )
        ? [...profile.skills]
            .map(
              (skill) =>
                String(skill)
                  .trim()
                  .toLowerCase()
            )
            .filter(Boolean)
            .sort()
        : [];


    return {

      skills,

      preferredRole:
        profile?.preferredRole ||
        profile?.preferred_role ||
        "",

      education:
        profile?.education ||
        "",

      preferredLocation:
        profile?.preferredLocation ||
        profile?.preferred_location ||
        profile?.location ||
        "",

      location:
        profile?.location ||
        "",

      preferences,

      interestDescription:
        description || "",

    };

  };


  // ==========================================================
  // SAVE RECOMMENDATION CONTEXT
  // ==========================================================

  const saveRecommendationContext = (
    profile,
    description
  ) => {

    try {

      const context =
        buildRecommendationContext(
          profile,
          description
        );


      sessionStorage.setItem(
        RECOMMENDATIONS_CONTEXT_KEY,
        stableStringify(context)
      );

    } catch (error) {

      console.error(
        "Failed to save recommendation context:",
        error
      );

    }

  };


  // ==========================================================
  // FETCH CURRENT STUDENT PROFILE
  // ==========================================================

  const fetchCurrentStudentProfile =
    async () => {

      const token = getToken();


      if (!token) {
        return null;
      }


      try {

        let response =
          await fetch(
            `${API_BASE_URL}/student/profile`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        if (!response.ok) {

          response =
            await fetch(
              `${API_BASE_URL}/students/profile`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

        }


        if (!response.ok) {

          return null;

        }


        const result =
          await response.json();


        return result?.data || null;

      } catch (error) {

        console.error(
          "Failed to fetch current student profile:",
          error
        );

        return null;

      }

    };


  // ==========================================================
  // CHECK WHETHER CACHED RECOMMENDATIONS ARE STILL VALID
  // ==========================================================

  const checkRecommendationValidity =
    async () => {

      const cachedRecommendations =
        getCachedRecommendations();

      const cachedContext =
        getCachedRecommendationContext();


      // No previous recommendation
      if (
        cachedRecommendations.length === 0 ||
        !cachedContext
      ) {

        clearRecommendationCache();

        setRecommendations([]);

        setHasRecommended(false);

        setCheckingRecommendations(false);

        return;

      }


      const currentProfile =
        await fetchCurrentStudentProfile();


      // If the profile cannot be checked,
      // do not trust an old recommendation snapshot.
      if (!currentProfile) {

        setRecommendations([]);

        setHasRecommended(false);

        setError(
          "Unable to verify your profile. Please click Recommend to generate fresh recommendations."
        );

        setCheckingRecommendations(false);

        return;

      }


      const currentDescription =
        localStorage.getItem(
          "studentInterestDescription"
        ) || "";


      const currentContext =
        buildRecommendationContext(
          currentProfile,
          currentDescription
        );


      let previousContext;


      try {

        previousContext =
          JSON.parse(
            stableStringify(
              cachedContext
            )
          );

      } catch {

        previousContext =
          cachedContext;

      }


      const currentSignature =
        stableStringify(
          currentContext
        );

      const previousSignature =
        stableStringify(
          previousContext
        );


      // ========================================================
      // PROFILE / PREFERENCE / DESCRIPTION CHANGED
      // ========================================================

      if (
        currentSignature !==
        previousSignature
      ) {

        clearRecommendationCache();

        setRecommendations([]);

        setHasRecommended(false);

        setError("");

        setCheckingRecommendations(false);

        return;

      }


      // ========================================================
      // NOTHING CHANGED → USE CACHE
      // ========================================================

      setRecommendations(
        cachedRecommendations
      );

      setHasRecommended(
        cachedRecommendations.length > 0
      );

      setCheckingRecommendations(false);

    };


  // ==========================================================
  // FETCH RECOMMENDATIONS
  // ==========================================================

  const fetchRecommendations = async (description = "") => {

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


      // ------------------------------------------------------
      // Get description
      // ------------------------------------------------------

      const finalDescription =
        description.trim() ||
        localStorage.getItem(
          "studentInterestDescription"
        ) ||
        "";


      // ------------------------------------------------------
      // API REQUEST
      // ------------------------------------------------------

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

          // IMPORTANT:
          // Send user's interest description to backend
          body: JSON.stringify({
            description: finalDescription,
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

      saveRecommendationsToCache(
        recommendationList
      );


      // Save the exact profile/preferences state
      // used when this recommendation was generated.
      const currentProfile =
        await fetchCurrentStudentProfile();


      if (currentProfile) {

        saveRecommendationContext(
          currentProfile,
          finalDescription
        );

      } else {

        // No trustworthy profile snapshot:
        // remove any previous snapshot so stale
        // recommendations won't survive a later visit.
        try {

          sessionStorage.removeItem(
            RECOMMENDATIONS_CONTEXT_KEY
          );

        } catch (cacheError) {

          console.error(
            "Failed to clear invalid recommendation context:",
            cacheError
          );

        }

      }


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


    // ------------------------------------------------------
    // Save description locally
    // ------------------------------------------------------

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


    // ------------------------------------------------------
    // IMPORTANT:
    // Send description to recommendation API
    // ------------------------------------------------------

    await fetchRecommendations(
      trimmedDescription
    );

  };


  // ==========================================================
  // SKIP PERSONALIZATION
  // ==========================================================

  const handleSkipInterest = async () => {

    setInterestDescription("");

    setShowInterestPopup(false);


    // No description when skipped
    await fetchRecommendations("");

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
      const savedDescription =
        localStorage.getItem(
          "studentInterestDescription"
        ) || "";

      await fetchRecommendations(
        savedDescription
      );


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


  // ==========================================================
  // CHECK CACHED RECOMMENDATIONS WHEN PAGE OPENS
  // ==========================================================

  useEffect(() => {

    checkRecommendationValidity();

  }, []);


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
        !checkingRecommendations &&
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
        !checkingRecommendations &&
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
        !checkingRecommendations &&
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
        !checkingRecommendations &&
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
              placeholder="For example: I want to work on web development projects involving HTML, CSS, JavaScript, React and Node.js..."
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