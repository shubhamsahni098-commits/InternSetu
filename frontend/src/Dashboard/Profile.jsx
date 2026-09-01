import React, {
  useEffect,
  useState,
} from "react";

import {
  UserRound,
  Mail,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  Code,
  CheckCircle,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./Profile.css";


const API_BASE_URL =
  "http://localhost:5000/api";


export default function Profile() {

  const navigate = useNavigate();


  // ==========================================================
  // Profile State
  // ==========================================================

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    location: "",
    education: "",
    preferredRole: "",
    preferredLocation: "",
    skills: [],
  });


  const [skillInput, setSkillInput] =
    useState("");


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
  // Update field
  // ==========================================================

  const updateField = (
    field,
    value
  ) => {

    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

  };


  // ==========================================================
  // Load Profile
  // ==========================================================

  useEffect(() => {

    const loadProfile = async () => {

      try {

        setLoading(true);
        setError("");

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


        if (!response.ok || !result?.success) {

          throw new Error(
            result?.message ||
            "Failed to load profile."
          );

        }


        const student =
          result?.data || {};


        setProfile({
          fullName:
            student.fullName || "",

          email:
            student.email || "",

          location:
            student.location || "",

          education:
            student.education || "",

          preferredRole:
            student.preferredRole || "",

          preferredLocation:
            student.preferredLocation || "",

          skills:
            Array.isArray(student.skills)
              ? student.skills
              : [],
        });

      } catch (err) {

        console.error(
          "Profile fetch error:",
          err
        );

        setError(
          err?.message ||
          "Unable to load profile."
        );

      } finally {

        setLoading(false);

      }

    };


    loadProfile();

  }, [navigate]);


  // ==========================================================
  // Add Skill
  // ==========================================================

  const handleAddSkill = () => {

    const skill =
      skillInput.trim();


    if (!skill) {
      return;
    }


    const alreadyExists =
      profile.skills.some(
        (existingSkill) =>
          existingSkill.toLowerCase() ===
          skill.toLowerCase()
      );


    if (alreadyExists) {

      setSkillInput("");

      return;
    }


    setProfile((previous) => ({
      ...previous,

      skills: [
        ...previous.skills,
        skill,
      ],
    }));


    setSkillInput("");

  };


  // ==========================================================
  // Remove Skill
  // ==========================================================

  const handleRemoveSkill = (
    skillToRemove
  ) => {

    setProfile((previous) => ({
      ...previous,

      skills:
        previous.skills.filter(
          (skill) =>
            skill !== skillToRemove
        ),
    }));

  };


  // ==========================================================
  // Skill input Enter key
  // ==========================================================

  const handleSkillKeyDown = (
    event
  ) => {

    if (event.key === "Enter") {

      event.preventDefault();

      handleAddSkill();

    }

  };


  // ==========================================================
  // Save Profile
  // ==========================================================

  const handleSaveProfile = async () => {

    try {

      setSaving(true);
      setError("");


      const token = getToken();


      if (!token) {

        navigate("/login");

        return;
      }


      const response = await fetch(
        `${API_BASE_URL}/students/profile`,
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            fullName:
              profile.fullName.trim(),

            location:
              profile.location.trim(),

            education:
              profile.education.trim(),

            preferredRole:
              profile.preferredRole,

            preferredLocation:
              profile.preferredLocation,

            skills:
              profile.skills,
          }),
        }
      );


      const result =
        await response.json();


      if (!response.ok || !result?.success) {

        throw new Error(
          result?.message ||
          "Failed to update profile."
        );

      }


      // ------------------------------------------------------
      // Update local user cache if backend returns student
      // ------------------------------------------------------

      const updatedStudent =
        result?.data;


      if (
        updatedStudent &&
        typeof updatedStudent === "object"
      ) {

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedStudent
          )
        );

      }


      // ------------------------------------------------------
      // Show centered success popup
      // ------------------------------------------------------

      setShowSuccess(true);

    } catch (err) {

      console.error(
        "Profile update error:",
        err
      );

      setError(
        err?.message ||
        "Unable to save profile."
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================================
  // Loading State
  // ==========================================================

  if (loading) {

    return (
      <div className="profile-page">

        <div
          style={{
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          Loading profile...
        </div>

      </div>
    );

  }


  return (
    <div className="profile-page">


      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="profile-heading">

        <h1>
          My Profile
        </h1>

        <p>
          Complete your profile to get better internship recommendations.
        </p>

      </div>


      {/* =====================================================
          ERROR
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
          PROFILE CARD
      ===================================================== */}

      <div className="profile-card">


        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <div className="profile-top">

          <div className="profile-avatar">

            <UserRound size={42} />

          </div>


          <div>

            <h2>
              {profile.fullName ||
                "Complete Your Profile"}
            </h2>

            <p>
              Computer Science Student
            </p>

          </div>

        </div>


        {/* ===================================================
            PERSONAL INFORMATION
        =================================================== */}

        <div className="profile-section">

          <h3>
            Personal Information
          </h3>


          <div className="profile-grid">


            {/* Full Name */}

            <div className="profile-field">

              <label>

                <UserRound size={16} />

                Full Name

              </label>


              <input
                type="text"
                value={
                  profile.fullName
                }
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value
                  )
                }
                placeholder="Enter your name"
              />

            </div>


            {/* Email */}

            <div className="profile-field">

              <label>

                <Mail size={16} />

                Email

              </label>


              <input
                type="email"
                value={
                  profile.email
                }
                readOnly
                placeholder="Your email"
              />

            </div>


            {/* Location */}

            <div className="profile-field">

              <label>

                <MapPin size={16} />

                Location

              </label>


              <input
                type="text"
                value={
                  profile.location
                }
                onChange={(event) =>
                  updateField(
                    "location",
                    event.target.value
                  )
                }
                placeholder="e.g. Mumbai"
              />

            </div>


            {/* Education */}

            <div className="profile-field">

              <label>

                <GraduationCap size={16} />

                Education

              </label>


              <input
                type="text"
                value={
                  profile.education
                }
                onChange={(event) =>
                  updateField(
                    "education",
                    event.target.value
                  )
                }
                placeholder="e.g. B.Tech Computer Science"
              />

            </div>

          </div>

        </div>


        {/* ===================================================
            CAREER INFORMATION
        =================================================== */}

        <div className="profile-section">

          <h3>
            Career Preferences
          </h3>


          <div className="profile-grid">


            {/* Preferred Role */}

            <div className="profile-field">

              <label>

                <BriefcaseBusiness size={16} />

                Preferred Role

              </label>


              <select
                value={
                  profile.preferredRole
                }
                onChange={(event) =>
                  updateField(
                    "preferredRole",
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select preferred role
                </option>

                <option value="Software Developer">
                  Software Developer
                </option>

                <option value="Data Analyst">
                  Data Analyst
                </option>

                <option value="Data Scientist">
                  Data Scientist
                </option>

                <option value="AI / ML Engineer">
                  AI / ML Engineer
                </option>

                <option value="Web Developer">
                  Web Developer
                </option>

                <option value="Backend Developer">
                  Backend Developer
                </option>

              </select>

            </div>


            {/* Preferred Location */}

            <div className="profile-field">

              <label>

                <MapPin size={16} />

                Preferred Location

              </label>


              <select
                value={
                  profile.preferredLocation
                }
                onChange={(event) =>
                  updateField(
                    "preferredLocation",
                    event.target.value
                  )
                }
              >

                <option value="">
                  Select location
                </option>

                <option value="Mumbai">
                  Mumbai
                </option>

                <option value="Delhi">
                  Delhi
                </option>

                <option value="Bangalore">
                  Bangalore
                </option>

                <option value="Hyderabad">
                  Hyderabad
                </option>

                <option value="Pune">
                  Pune
                </option>

                <option value="Remote">
                  Remote
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ===================================================
            SKILLS
        =================================================== */}

        <div className="profile-section">

          <h3>

            <Code size={20} />

            Skills

          </h3>


          <div className="skills-input">

            <input
              type="text"
              value={skillInput}
              onChange={(event) =>
                setSkillInput(
                  event.target.value
                )
              }
              onKeyDown={
                handleSkillKeyDown
              }
              placeholder="e.g. Python, React, SQL"
            />


            <button
              type="button"
              onClick={
                handleAddSkill
              }
            >
              Add Skill
            </button>

          </div>


          <div className="skill-tags">

            {profile.skills.map(
              (skill, index) => (

                <span
                  key={`${skill}-${index}`}
                >

                  {skill}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveSkill(
                        skill
                      )
                    }
                    style={{
                      border: "none",
                      background:
                        "transparent",
                      padding: "0",
                      marginLeft: "6px",
                      cursor: "pointer",
                      display:
                        "inline-flex",
                      alignItems:
                        "center",
                    }}
                    aria-label={
                      `Remove ${skill}`
                    }
                  >

                    <X size={13} />

                  </button>

                </span>

              )
            )}

          </div>

        </div>


        {/* ===================================================
            SAVE
        =================================================== */}

        <div className="save-profile">

          <button
            className="save-btn"
            type="button"
            onClick={
              handleSaveProfile
            }
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save Profile"
            }

          </button>

        </div>

      </div>


      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      {showSuccess && (

        <div className="profile-success-overlay">

          <div className="profile-success-popup">


            <button
              type="button"
              className="profile-popup-close"
              onClick={() =>
                setShowSuccess(false)
              }
              aria-label="Close"
            >
              <X size={18} />
            </button>


            <div className="profile-success-icon">

              <CheckCircle size={46} />

            </div>


            <h2>
              Profile successfully completed
            </h2>


            <p>
              Your profile has been saved successfully.
            </p>


            <button
              type="button"
              className="profile-next-btn"
              onClick={() =>
                navigate(
                  "/dashboard/preferences"
                )
              }
            >
              Set Preference
            </button>

          </div>

        </div>

      )}

    </div>
  );
}