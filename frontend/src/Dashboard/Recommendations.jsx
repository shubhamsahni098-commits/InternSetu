import React, { useCallback, useEffect, useState } from "react";

import {
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import InternshipCard from "../Dashboard/InternshipCard";

import "./Recommendations.css";


const API_BASE_URL = "https://internsetubackend.onrender.com/api";

// ==========================================================
// SESSION STORAGE CACHE KEY
// ==========================================================

const RECOMMENDATIONS_CACHE_KEY =
  "recommendedInternships";


export default function Recommendations() {

  const navigate = useNavigate();


  // ==========================================================
  // GET CACHED RECOMMENDATIONS
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
        "Failed to read cached recommendations:",
        error
      );

      return [];

    }

  };


  // ==========================================================
  // STATE
  // ==========================================================

  const [
    recommendations,
    setRecommendations
  ] = useState(() => {

    return getCachedRecommendations();

  });


  const [
    loading,
    setLoading
  ] = useState(() => {

    const cached =
      getCachedRecommendations();

    return cached.length === 0;

  });


  const [
    error,
    setError
  ] = useState("");

  // ==========================================================
  // CURRENT STUDENT SKILLS
  // ==========================================================

  const [
    studentSkills,
    setStudentSkills
  ] = useState([]);


  // ==========================================================
  // GET TOKEN
  // ==========================================================

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );

  };


  // ==========================================================
  // SAVE RECOMMENDATIONS TO CACHE
  // ==========================================================

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
        "Failed to save recommendations to cache:",
        error
      );

    }

  };


  // ==========================================================
  // FETCH STUDENT PROFILE + ACTUAL INTERNSHIP SKILLS
  // ==========================================================

  const hydrateRecommendationData = useCallback(
    async (recommendationList) => {
      const token = getToken();

      // -------------------------------
      // Student profile / skills
      // -------------------------------

      let loadedStudentSkills = [];

      if (token) {
        try {
          let profileResponse = await fetch(
            `${API_BASE_URL}/students/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Fallback route used elsewhere in the app.
          if (!profileResponse.ok) {
            profileResponse = await fetch(
              `${API_BASE_URL}/student/profile`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }

          if (profileResponse.ok) {
            const profileResult =
              await profileResponse.json();

            const profile =
              profileResult?.data || {};

            loadedStudentSkills =
              Array.isArray(profile?.skills)
                ? profile.skills
                : [];

            setStudentSkills(
              loadedStudentSkills
            );
          }
        } catch (profileError) {
          console.error(
            "Student profile fetch error:",
            profileError
          );
        }
      }

      // -------------------------------
      // Actual internship skills
      // -------------------------------

      const hydratedList =
        await Promise.all(
          recommendationList.map(
            async (recommendation) => {
              const internshipId =
                recommendation?.internship_id;

              if (!internshipId) {
                return {
                  ...recommendation,
                  skills: Array.isArray(
                    recommendation?.skills
                  )
                    ? recommendation.skills
                    : [],
                };
              }

              try {
                const internshipResponse =
                  await fetch(
                    `${API_BASE_URL}/internships/${internshipId}`
                  );

                if (!internshipResponse.ok) {
                  return {
                    ...recommendation,
                    skills: Array.isArray(
                      recommendation?.skills
                    )
                      ? recommendation.skills
                      : [],
                  };
                }

                const internshipResult =
                  await internshipResponse.json();

                const internshipData =
                  internshipResult?.data || {};

                return {
                  ...recommendation,
                  // Keep recommendation fields exactly as returned
                  // by the recommendation API and only enrich with
                  // the actual internship skills required by the
                  // frontend penalty calculation.
                  skills: Array.isArray(
                    internshipData?.skills
                  )
                    ? internshipData.skills
                    : [],
                };
              } catch (internshipError) {
                console.error(
                  `Failed to fetch skills for internship ${internshipId}:`,
                  internshipError
                );

                return {
                  ...recommendation,
                  skills: Array.isArray(
                    recommendation?.skills
                  )
                    ? recommendation.skills
                    : [],
                };
              }
            }
          )
        );

      setRecommendations(
        hydratedList
      );

      saveRecommendationsToCache(
        hydratedList
      );

      return {
        hydratedList,
        studentSkills: loadedStudentSkills,
      };
    },
    []
  );

  // ==========================================================
  // FETCH RECOMMENDATIONS
  // ==========================================================

  const fetchRecommendations = useCallback(
    async () => {

      try {

        setLoading(true);

        setError("");


        const token = getToken();


        if (!token) {

          setError(
            "Please login to view your recommendations."
          );

          setRecommendations([]);

          return;

        }


        // ====================================================
        // Get saved interest description
        // ====================================================

        const description =
          localStorage.getItem(
            "studentInterestDescription"
          ) || "";


        // ====================================================
        // API Request
        // ====================================================

        const response =
          await fetch(
            `${API_BASE_URL}/recommendations`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                description,
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
            "Invalid recommendation response."
          );

        }


        // ====================================================
        // Enrich recommendations with actual internship skills
        // ====================================================

        await hydrateRecommendationData(
          recommendationList
        );


      } catch (err) {

        console.error(
          "Recommendation fetch error:",
          err
        );


        setError(
          err?.message ||
          "Unable to load recommendations."
        );


        // ====================================================
        // Keep cached data if available
        // ====================================================

        const cached =
          getCachedRecommendations();


        if (
          cached.length > 0
        ) {

          setRecommendations(
            cached
          );

        } else {

          setRecommendations([]);

        }


      } finally {

        setLoading(false);

      }

    },
    [hydrateRecommendationData]
  );


  // ==========================================================
  // LOAD RECOMMENDATIONS ON PAGE OPEN
  // ==========================================================

  useEffect(() => {

    const cached =
      getCachedRecommendations();


    // ========================================================
    // CACHE AVAILABLE
    // ========================================================

    if (
      cached.length > 0
    ) {

      hydrateRecommendationData(
        cached
      ).finally(() => {
        setLoading(false);
      });

      return;

    }


    // ========================================================
    // NO CACHE
    // ========================================================

    fetchRecommendations();

  }, [
    fetchRecommendations,
    hydrateRecommendationData
  ]);


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


      const response =
        await fetch(
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


      // ======================================================
      // After feedback, get fresh recommendations
      // ======================================================

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
  // BACK TO INTERNSHIPS
  // ==========================================================

  const handleBack = () => {

    navigate(
      "/dashboard/internships"
    );

  };


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="recommendations-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="recommendations-header">


        {/* Back Button */}

        <button
          type="button"
          className="back-btn"
          onClick={handleBack}
        >

          <ArrowLeft size={18} />

          Back to Internships

        </button>


        {/* Title */}

        <div className="recommendations-title">

          <div className="recommendations-icon">

            <Sparkles size={25} />

          </div>


          <div>

            <h1>
              Your Recommended Internships
            </h1>

            <p>
              Personalized opportunities selected
              based on your profile and preferences.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div className="recommendations-error">

          {error}

        </div>

      )}


      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (

        <div className="recommendation-loading">

          <div className="recommendation-spinner"></div>

          <p>
            Loading your recommendations...
          </p>

        </div>

      )}


      {/* =====================================================
          RECOMMENDATIONS
      ===================================================== */}

      {!loading &&
        recommendations.length > 0 && (

          <div className="recommendations-list">

            {recommendations
              .slice(0, 5)
              .map(
                (internship) => (

                  <InternshipCard
                    key={
                      internship.internship_id
                    }

                    internship={
                      internship
                    }

                    studentSkills={
                      studentSkills
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
          EMPTY STATE
      ===================================================== */}

      {!loading &&
        !error &&
        recommendations.length === 0 && (

          <div className="recommendations-empty">

            <Sparkles size={24} />

            <h3>
              No recommendations available
            </h3>

            <p>
              Complete your profile and preferences
              to receive personalized internship
              recommendations.
            </p>

          </div>

        )}

    </div>

  );

}