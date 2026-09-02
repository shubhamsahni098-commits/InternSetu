import React, {
  useEffect,
  useState,
} from "react";

import {
  BriefcaseBusiness,
  MapPin,
  Building2,
  IndianRupee,
  Clock3,
  Laptop,
  CheckCircle,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./Preferences.css";


const API_BASE_URL = "https://internsetubackend.onrender.com/api";


export default function Preferences() {

  const navigate = useNavigate();


  // ==========================================================
  // State
  // ==========================================================

  const [preferences, setPreferences] = useState({

    internshipType: "",

    workMode: "",

    preferredCity: "",

    locationPreference: "",

    domains: [],

    stipendPreference: "",

    duration: "",

    availability: [],

  });


  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showSuccess, setShowSuccess] =
    useState(false);


  // ==========================================================
  // Token
  // ==========================================================

  const getToken = () => {

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );

  };


  // ==========================================================
  // Load saved preferences
  // ==========================================================

  useEffect(() => {

    const loadPreferences =
      async () => {

        try {

          setLoading(true);
          setError("");


          const token =
            getToken();


          if (!token) {

            navigate("/login");

            return;

          }


          const response =
            await fetch(
              `${API_BASE_URL}/students/preferences`,
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
              "Failed to load preferences."
            );

          }


          const saved =
            result?.data || {};


          setPreferences({

            internshipType:
              saved.internshipType ||
              "",

            workMode:
              saved.workMode ||
              "",

            preferredCity:
              saved.preferredCity ||
              "",

            locationPreference:
              saved.locationPreference ||
              "",

            domains:
              Array.isArray(
                saved.domains
              )
                ? saved.domains
                : [],

            stipendPreference:
              saved.stipendPreference ||
              "",

            duration:
              saved.duration ||
              "",

            availability:
              Array.isArray(
                saved.availability
              )
                ? saved.availability
                : [],

          });

        } catch (err) {

          console.error(
            "Preferences fetch error:",
            err
          );

          setError(
            err?.message ||
            "Unable to load preferences."
          );

        } finally {

          setLoading(false);

        }

      };


    loadPreferences();

  }, [navigate]);


  // ==========================================================
  // Update radio/select field
  // ==========================================================

  const updatePreference = (
    field,
    value
  ) => {

    setPreferences(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

  };


  // ==========================================================
  // Toggle array values
  // ==========================================================

  const toggleArrayValue = (
    field,
    value
  ) => {

    setPreferences(
      (previous) => {

        const current =
          Array.isArray(
            previous[field]
          )
            ? previous[field]
            : [];


        const exists =
          current.includes(value);


        return {

          ...previous,

          [field]: exists

            ? current.filter(
                (item) =>
                  item !== value
              )

            : [
                ...current,
                value,
              ],

        };

      }
    );

  };


  // ==========================================================
  // Save preferences
  // ==========================================================

  const handleSavePreferences =
    async () => {

      try {

        setSaving(true);
        setError("");


        const token =
          getToken();


        if (!token) {

          navigate("/login");

          return;

        }


        const response =
          await fetch(
            `${API_BASE_URL}/students/preferences`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                preferences
              ),
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
            "Failed to save preferences."
          );

        }


        // ----------------------------------------------------
        // Show success popup
        // ----------------------------------------------------

        setShowSuccess(true);

      } catch (err) {

        console.error(
          "Preferences update error:",
          err
        );

        setError(
          err?.message ||
          "Unable to save preferences."
        );

      } finally {

        setSaving(false);

      }

    };


  // ==========================================================
  // Loading
  // ==========================================================

  if (loading) {

    return (

      <div className="preferences-page">

        <div
          style={{
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading preferences...
        </div>

      </div>

    );

  }


  return (

    <div className="preferences-page">


      {/* =====================================================
          Heading
      ===================================================== */}

      <div className="preferences-heading">

        <h1>
          Internship Preferences
        </h1>

        <p>
          Tell us what kind of internship you are looking for.
          This helps InternSetu find better matches for you.
        </p>

      </div>


      {/* =====================================================
          Error
      ===================================================== */}

      {error && (

        <div
          style={{
            marginBottom: "18px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#fff0f0",
            color: "#c62828",
            fontSize: "14px",
          }}
        >
          {error}
        </div>

      )}


      {/* =====================================================
          Preference Card
      ===================================================== */}

      <div className="preferences-card">


        {/* ===================================================
            Internship Type
        =================================================== */}

        <div className="preference-section">

          <h3>

            <BriefcaseBusiness size={20} />

            Internship Type

          </h3>


          <div className="option-grid">


            <label className="option-card">

              <input
                type="radio"
                name="internship-type"
                checked={
                  preferences.internshipType ===
                  "Technical"
                }
                onChange={() =>
                  updatePreference(
                    "internshipType",
                    "Technical"
                  )
                }
              />

              <div>

                <strong>
                  Technical
                </strong>

                <p>
                  Software, AI, Data & Technology
                </p>

              </div>

            </label>


            <label className="option-card">

              <input
                type="radio"
                name="internship-type"
                checked={
                  preferences.internshipType ===
                  "Non-Technical"
                }
                onChange={() =>
                  updatePreference(
                    "internshipType",
                    "Non-Technical"
                  )
                }
              />

              <div>

                <strong>
                  Non-Technical
                </strong>

                <p>
                  Marketing, HR, Finance & Management
                </p>

              </div>

            </label>


            <label className="option-card">

              <input
                type="radio"
                name="internship-type"
                checked={
                  preferences.internshipType ===
                  "Research"
                }
                onChange={() =>
                  updatePreference(
                    "internshipType",
                    "Research"
                  )
                }
              />

              <div>

                <strong>
                  Research
                </strong>

                <p>
                  Research and academic opportunities
                </p>

              </div>

            </label>


            <label className="option-card">

              <input
                type="radio"
                name="internship-type"
                checked={
                  preferences.internshipType ===
                  "Any"
                }
                onChange={() =>
                  updatePreference(
                    "internshipType",
                    "Any"
                  )
                }
              />

              <div>

                <strong>
                  Any
                </strong>

                <p>
                  Show me all relevant opportunities
                </p>

              </div>

            </label>

          </div>

        </div>


        {/* ===================================================
            Work Mode
        =================================================== */}

        <div className="preference-section">

          <h3>

            <Laptop size={20} />

            Work Mode

          </h3>


          <div className="mode-options">


            <label className="mode-card">

              <input
                type="radio"
                name="work-mode"
                checked={
                  preferences.workMode ===
                  "On-site"
                }
                onChange={() =>
                  updatePreference(
                    "workMode",
                    "On-site"
                  )
                }
              />

              <span>
                🏢
              </span>

              <strong>
                On-site
              </strong>

            </label>


            <label className="mode-card">

              <input
                type="radio"
                name="work-mode"
                checked={
                  preferences.workMode ===
                  "Remote"
                }
                onChange={() =>
                  updatePreference(
                    "workMode",
                    "Remote"
                  )
                }
              />

              <span>
                🏠
              </span>

              <strong>
                Remote
              </strong>

            </label>


            <label className="mode-card">

              <input
                type="radio"
                name="work-mode"
                checked={
                  preferences.workMode ===
                  "Hybrid"
                }
                onChange={() =>
                  updatePreference(
                    "workMode",
                    "Hybrid"
                  )
                }
              />

              <span>
                🔄
              </span>

              <strong>
                Hybrid
              </strong>

            </label>


            <label className="mode-card">

              <input
                type="radio"
                name="work-mode"
                checked={
                  preferences.workMode ===
                  "Any"
                }
                onChange={() =>
                  updatePreference(
                    "workMode",
                    "Any"
                  )
                }
              />

              <span>
                🌐
              </span>

              <strong>
                Any
              </strong>

            </label>

          </div>

        </div>


        {/* ===================================================
            Location
        =================================================== */}

        <div className="preference-section">

          <h3>

            <MapPin size={20} />

            Preferred Location

          </h3>


          <div className="preference-grid">


            <div className="preference-field">

              <label>
                Preferred City
              </label>


              <select
                value={
                  preferences.preferredCity
                }
                onChange={(event) =>
                  updatePreference(
                    "preferredCity",
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select city
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

                <option value="Chennai">
                  Chennai
                </option>

                <option value="Kolkata">
                  Kolkata
                </option>

                <option value="Any Location">
                  Any Location
                </option>

              </select>

            </div>


            <div className="preference-field">

              <label>
                Location Preference
              </label>


              <select
                value={
                  preferences.locationPreference
                }
                onChange={(event) =>
                  updatePreference(
                    "locationPreference",
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select preference
                </option>

                <option value="Same City">
                  Same City
                </option>

                <option value="Any City">
                  Any City
                </option>

                <option value="Remote Only">
                  Remote Only
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ===================================================
            Domain
        =================================================== */}

        <div className="preference-section">

          <h3>

            <Building2 size={20} />

            Preferred Domain

          </h3>


          <div className="domain-grid">


            {[
              "Software Development",
              "AI / Machine Learning",
              "Data Science",
              "Web Development",
              "Cyber Security",
              "Cloud Computing",
              "UI / UX",
              "Any Domain",
            ].map(
              (domain) => (

                <label key={domain}>

                  <input
                    type="checkbox"
                    checked={
                      preferences.domains.includes(
                        domain
                      )
                    }
                    onChange={() =>
                      toggleArrayValue(
                        "domains",
                        domain
                      )
                    }
                  />

                  {domain}

                </label>

              )
            )}

          </div>

        </div>


        {/* ===================================================
            Stipend
        =================================================== */}

        <div className="preference-section">

          <h3>

            <IndianRupee size={20} />

            Stipend Preference

          </h3>


          <div className="preference-grid">


            <div className="preference-field">

              <label>
                Minimum Expected Stipend
              </label>


              <select
                value={
                  preferences.stipendPreference
                }
                onChange={(event) =>
                  updatePreference(
                    "stipendPreference",
                    event.target.value
                  )
                }
              >

                <option value="">
                  No Preference
                </option>

                <option value="Unpaid / Any">
                  Unpaid / Any
                </option>

                <option value="₹5,000+">
                  ₹5,000+
                </option>

                <option value="₹10,000+">
                  ₹10,000+
                </option>

                <option value="₹20,000+">
                  ₹20,000+
                </option>

                <option value="₹30,000+">
                  ₹30,000+
                </option>

              </select>

            </div>


            <div className="preference-field">

              <label>
                Duration
              </label>


              <select
                value={
                  preferences.duration
                }
                onChange={(event) =>
                  updatePreference(
                    "duration",
                    event.target.value
                  )
                }
              >

                <option value="">
                  No Preference
                </option>

                <option value="1 Month">
                  1 Month
                </option>

                <option value="2 Months">
                  2 Months
                </option>

                <option value="3 Months">
                  3 Months
                </option>

                <option value="6 Months">
                  6 Months
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ===================================================
            Availability
        =================================================== */}

        <div className="preference-section">

          <h3>

            <Clock3 size={20} />

            Availability

          </h3>


          <div className="availability">


            <label>

              <input
                type="checkbox"
                checked={
                  preferences.availability.includes(
                    "Currently available"
                  )
                }
                onChange={() =>
                  toggleArrayValue(
                    "availability",
                    "Currently available"
                  )
                }
              />

              Currently available

            </label>


            <label>

              <input
                type="checkbox"
                checked={
                  preferences.availability.includes(
                    "Available for full-time internship"
                  )
                }
                onChange={() =>
                  toggleArrayValue(
                    "availability",
                    "Available for full-time internship"
                  )
                }
              />

              Available for full-time internship

            </label>


            <label>

              <input
                type="checkbox"
                checked={
                  preferences.availability.includes(
                    "Available for part-time internship"
                  )
                }
                onChange={() =>
                  toggleArrayValue(
                    "availability",
                    "Available for part-time internship"
                  )
                }
              />

              Available for part-time internship

            </label>

          </div>

        </div>


        {/* ===================================================
            Save
        =================================================== */}

        <div className="preference-save">

          <button
            className="save-preference-btn"
            type="button"
            onClick={
              handleSavePreferences
            }
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save Preferences"
            }

          </button>

        </div>

      </div>


      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      {showSuccess && (

        <div className="preference-success-overlay">

          <div className="preference-success-popup">


            <button
              type="button"
              className="preference-popup-close"
              onClick={() =>
                setShowSuccess(false)
              }
              aria-label="Close"
            >

              <X size={18} />

            </button>


            <div className="preference-success-icon">

              <CheckCircle size={46} />

            </div>


            <h2>
              Preference saved successfully
            </h2>


            <p>
              Your internship preferences have been saved successfully.
            </p>


            <button
              type="button"
              className="preference-next-btn"
              onClick={() =>
                navigate(
                  "/dashboard/internships"
                )
              }
            >

              Find Internship

            </button>

          </div>

        </div>

      )}

    </div>
  );
}