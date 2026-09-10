import React, {
  useEffect,
  useState,
} from "react";

import {
  UserRound,
  Mail,
  GraduationCap,
  BriefcaseBusiness,
  Code,
  CheckCircle,
  X,
  FileText,
  Upload,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./Profile.css";


const API_BASE_URL = "https://internsetubackend.onrender.com/api";


export default function Profile() {

  const navigate = useNavigate();


  // ==========================================================
  // Profile State
  // ==========================================================

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    education: "",
    preferredRole: "",
    resume: "",
    skills: [],
  });


  const [skillInput, setSkillInput] =
    useState("");

  const [roleInput, setRoleInput] =
    useState("");


  // ==========================================================
  // PREDEFINED DATASET SKILLS (162 UNIQUE SKILLS)
  // ==========================================================

  const PREDEFINED_SKILLS = [
    "Figma", "UI Design", "UX Design", "Wireframing", "Prototyping",
    "HTML", "CSS", "JavaScript", "React.js", "TypeScript",
    "Dart", "Flutter", "Firebase", "REST API", "Git",
    "Python", "Node.js", "Express.js", "SQL", "Pandas",
    "Power BI", "Statistics", "PyTorch", "TensorFlow", "Deep Learning",
    "NLP", "Kotlin", "Java", "Android Studio", "Android SDK",
    "C++", "OOP", "Data Structures", "C", "Arduino",
    "ESP32", "STM32", "Linux", "Networking", "Nmap",
    "Wireshark", "NumPy", "Scikit-learn", "Machine Learning", "LLM",
    "RAG", "Embeddings", "Hugging Face", "Selenium", "Postman",
    "PyTest", "API Testing", "Automation Testing", "ROS", "OpenCV",
    "C#", "Unity", "Unreal Engine", "Game Physics", "React Native",
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Swift",
    "SwiftUI", "Xcode", "UIKit", "AutoCAD", "SolidWorks",
    "CATIA", "3D Modeling", "CAD", "Apache Spark", "Kafka",
    "Airflow", "AWS", "Azure", "Docker", "Kubernetes",
    "Terraform", "Solidity", "Ethereum", "Web3.js", "Smart Contracts",
    "Jenkins", "CI/CD", "Transformers", "BERT", "YOLO",
    "CNN", "MQTT", "Verilog", "SystemVerilog", "VHDL",
    "FPGA", "RTL Design", "Bash", "Operating Systems", "B2B Sales",
    "Field Sales", "Lead Generation", "English Proficiency (Spoken)",
    "English Proficiency (Written)", "Google Sheets", "Mathematics", "MS-Excel",
    "Statistical Modeling", "Human Resources", "MS-Office", "Recruitment",
    "Resume screening", "Content Marketing", "Digital Marketing", "Sales",
    "Social Media Marketing", "Content Management", "Search Engine Optimization (SEO)",
    "Video Editing", "Video Making", "Effective Communication", "Blogging",
    "Creative Writing", "Written Communication", "Analytical Thinking", "Data Extraction",
    "MS-PowerPoint", "MS-Word", "Problem Solving", "Hindi Proficiency (Spoken)",
    "Telugu Proficiency (Spoken)", "Interpersonal skills", "Negotiations", "Legal Drafting",
    "Legal Research", "Legal Writing", "Statutory compliances", "Community Management",
    "Event Management", "Client Relationship Management (CRM)", "E-commerce",
    "Key Account Management", "Logistics Management", "Email Marketing",
    "Presentation skills", "Research and Analytics", "Content Editing", "Photography",
    "Business Management", "Business Research", "Market Analysis", "Marketing Campaigns",
    "Marketing Strategy", "Content Writing", "Public Relations", "Canva",
    "Generative AI Tools", "Attention to Detail", "Email Management", "Sales Strategy",
    "Artificial intelligence", "Computer skills"
  ];

  // ==========================================================
  // PREDEFINED DATASET NON-TECHNICAL ROLES (26 UNIQUE ROLES)
  // ==========================================================

  const PREDEFINED_ROLES = [
    // Technical roles
    "Software Developer",
    "Data Analyst",
    "Data Scientist",
    "AI / ML Engineer",
    "Web Developer",
    "Backend Developer",

    // Non-technical roles from the dataset
    "Business Development (Sales)",
    "Campus Ambassador",
    "Content Writing",
    "Content and Social Media Marketing",
    "Corporate Sales",
    "Customer Service/Customer Support",
    "Data Entry",
    "Digital Marketing",
    "Event Management",
    "Field Sales",
    "Human Resources (HR)",
    "Influencer Marketing",
    "Inside Sales",
    "Law/Legal",
    "Lead Generation",
    "Marketing",
    "Media & Public Relations (PR)",
    "Operations",
    "Recruitment",
    "Sales and Marketing",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Talent Acquisition",
    "Telecalling",
    "Video Editing/Making",
    "sales",
  ];


  const [loading, setLoading] =
    useState(true);


  const [saving, setSaving] =
    useState(false);

  const [resumeUploading, setResumeUploading] =
    useState(false);

  const [resumeFileName, setResumeFileName] =
    useState("");

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


        const existingResume =
          student.resume || student.resumeUrl || "";

        setProfile({
          fullName:
            student.fullName || "",

          email:
            student.email || "",

          education:
            student.education || "",

          preferredRole:
            student.preferredRole || "",

          resume:
            existingResume,

          skills:
            Array.isArray(student.skills)
              ? student.skills
              : [],
        });

        if (existingResume) {
          setResumeFileName(
            existingResume.split("/").pop() || "Resume uploaded"
          );
        }

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


  const filteredSkills = PREDEFINED_SKILLS.filter((skill) =>
    skill.toLowerCase().includes(skillInput.trim().toLowerCase()) &&
    !profile.skills.some((existingSkill) =>
      existingSkill.toLowerCase() === skill.toLowerCase()
    )
  );

  const filteredRoles = PREDEFINED_ROLES.filter((role) =>
    role.toLowerCase().includes(roleInput.trim().toLowerCase())
  );

  const handleSelectRole = (role) => {
    updateField("preferredRole", role);
    setRoleInput("");
  };


  const handleRoleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const typedRole = roleInput.trim();
      const matchedRole = PREDEFINED_ROLES.find(
        (role) => role.toLowerCase() === typedRole.toLowerCase()
      );

      if (matchedRole) {
        handleSelectRole(matchedRole);
      }
    }
  };


  const handleSelectSkill = (skill) => {

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
  // Add Skill
  // ==========================================================

  const handleAddSkill = () => {

    const skill = skillInput.trim();

    if (!skill) {
      return;
    }

    const matchedSkill = PREDEFINED_SKILLS.find(
      (predefinedSkill) =>
        predefinedSkill.toLowerCase() === skill.toLowerCase()
    );

    if (!matchedSkill) {
      return;
    }

    handleSelectSkill(matchedSkill);

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
  // Resume Upload
  // ==========================================================

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const fileName = file.name.toLowerCase();
    const isAllowedExtension =
      fileName.endsWith(".pdf") || fileName.endsWith(".docx");

    if (!allowedTypes.includes(file.type) && !isAllowedExtension) {
      setError("Only PDF and DOCX resume files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume file must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    try {
      setResumeUploading(true);
      setError("");

      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        `${API_BASE_URL}/students/profile/resume`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      // Safely parse JSON so a backend 404/500 HTML response does not
      // hide the real HTTP status behind a JSON parse error.
      let result = {};
      try {
        result = await response.json();
      } catch {
        throw new Error(
          `Resume upload failed (${response.status} ${response.statusText}). ` +
            "Please check the backend route and CORS configuration."
        );
      }

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            `Failed to upload resume (${response.status}).`
        );
      }

      const uploadData = result?.data || {};
      const updatedStudent = uploadData?.student;

      setResumeFileName(file.name);

      // ------------------------------------------------------
      // Resume skills + manually selected skills -> Final Skills
      // ------------------------------------------------------
      // Backend may return extracted skills in `extractedSkills`,
      // `skills`, or inside `student.skills`. We merge all of them
      // with the skills already selected manually by the user.
      const extractedSkills = Array.isArray(uploadData?.extractedSkills)
        ? uploadData.extractedSkills
        : [];

      const backendSkills = Array.isArray(uploadData?.skills)
        ? uploadData.skills
        : [];

      const studentSkills = Array.isArray(updatedStudent?.skills)
        ? updatedStudent.skills
        : [];

      setProfile((previous) => {
        const manualSkills = Array.isArray(previous.skills)
          ? previous.skills
          : [];

        const allSkills = [
          ...manualSkills,
          ...extractedSkills,
          ...backendSkills,
          ...studentSkills,
        ];

        // Convert extracted names such as `react.js` to the canonical
        // name already used by the predefined skills list when possible.
        const canonicalSkills = allSkills
          .filter(
            (skill) =>
              typeof skill === "string" && skill.trim()
          )
          .map((skill) => {
            const cleanSkill = skill.trim();
            const predefinedMatch = PREDEFINED_SKILLS.find(
              (predefinedSkill) =>
                predefinedSkill.toLowerCase() === cleanSkill.toLowerCase()
            );
            return predefinedMatch || cleanSkill;
          });

        // Remove duplicates case-insensitively while keeping the first
        // occurrence and its display name.
        const finalSkills = [
          ...new Map(
            canonicalSkills.map((skill) => [
              skill.toLowerCase(),
              skill,
            ])
          ).values(),
        ];

        return {
          ...previous,
          resume:
            uploadData?.resumeUrl ||
            updatedStudent?.resumeUrl ||
            file.name,
          skills: finalSkills,
        };
      });

      if (updatedStudent) {
        localStorage.setItem(
          "user",
          JSON.stringify(updatedStudent)
        );
      }

      const extractedCount = Array.isArray(
        uploadData?.extractedSkills
      )
        ? uploadData.extractedSkills.length
        : 0;

      setError(
        extractedCount > 0
          ? `Resume uploaded successfully. ${extractedCount} matching skill${extractedCount === 1 ? "" : "s"} added.`
          : "Resume uploaded successfully. No matching skills were found in the Skills section."
      );

    } catch (err) {
      console.error("Resume upload error:", err);

      setError(
        err?.message ||
          "Unable to upload resume."
      );
    } finally {
      setResumeUploading(false);
      event.target.value = "";
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

            education:
              profile.education.trim(),

            preferredRole:
              profile.preferredRole,

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


            {/* Education */}

            <div className="profile-field">

              <label>

                <GraduationCap size={16} />

                Education

              </label>


              <select
                value={
                  profile.education
                }
                onChange={(event) =>
                  updateField(
                    "education",
                    event.target.value
                  )
                }
              >
                <option value="">Select education</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Undergraduate & Postgraduate">Undergraduate &amp; Postgraduate</option>
              </select>

            </div>


            {/* Preferred Role */}

            <div
              className="profile-field"
              style={{ position: "relative" }}
            >

              <label>

                <BriefcaseBusiness size={16} />

                Preferred Role

              </label>

              <input
                type="text"
                value={roleInput}
                onChange={(event) => {
                  const value = event.target.value;
                  setRoleInput(value);
                  if (!value.trim()) {
                    updateField("preferredRole", "");
                  }
                }}
                onKeyDown={handleRoleKeyDown}
                placeholder="Search and select a role"
                autoComplete="off"
              />

              {roleInput.trim() && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "calc(100% + 6px)",
                    maxHeight: "220px",
                    overflowY: "auto",
                    backgroundColor: "#ffffff",
                    border: "1px solid #dcdcdc",
                    borderRadius: "10px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
                    zIndex: 100,
                  }}
                >
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => (
                      <div
                        key={role}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          handleSelectRole(role);
                        }}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "10px 14px",
                          cursor: "pointer",
                          fontSize: "14px",
                          lineHeight: "1.4",
                          color: "#222222",
                          backgroundColor: "#ffffff",
                          textAlign: "left",
                        }}
                      >
                        {role}
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "10px 14px",
                        color: "#666666",
                        fontSize: "14px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      No matching role
                    </div>
                  )}
                </div>
              )}

              {profile.preferredRole && !roleInput && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "#555555",
                  }}
                >
                  Selected: {profile.preferredRole}
                </div>
              )}

            </div>

          </div>



          <div
            style={{
              marginTop: "1.5rem"
            }}
          >

            <div className="profile-field">

              <label>
                Resume
              </label>

              <div className="resume-upload-box">

                <div className="resume-upload-left">

                  <div className="resume-icon">
                    <FileText size={25} strokeWidth={2} />
                  </div>

                  <div className="resume-info">

                    <div className="resume-file-name">
                      {resumeUploading
                        ? "Uploading resume..."
                        : resumeFileName || "No file chosen"}
                    </div>

                    <div className="resume-file-hint">
                      PDF or DOCX • Maximum 5 MB
                    </div>

                  </div>

                </div>


                <label
                  htmlFor="resume-upload"
                  className={`resume-upload-btn${
                    resumeUploading ? " resume-upload-disabled" : ""
                  }`}
                >
                  <Upload size={21} strokeWidth={2.2} />
                  {resumeUploading
                    ? "Uploading..."
                    : "Choose File"}
                </label>


                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleResumeUpload}
                  disabled={resumeUploading}
                  className="resume-file-input"
                />

              </div>

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


          <div
            className="skills-input"
            style={{
              position: "relative",
            }}
          >

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
              placeholder="Search and select a skill"
              autoComplete="off"
            />


            <button
              type="button"
              onClick={
                handleAddSkill
              }
            >
              Add Skill
            </button>

            {skillInput.trim() && (

              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: "110px",
                  top: "calc(100% + 6px)",
                  maxHeight: "220px",
                  overflowY: "auto",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dcdcdc",
                  borderRadius: "10px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
                  zIndex: 100,
                }}
              >

                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleSelectSkill(skill);
                      }}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontSize: "14px",
                        lineHeight: "1.4",
                        color: "#222222",
                        backgroundColor: "#ffffff",
                        textAlign: "left",
                      }}
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "10px 14px",
                      color: "#666666",
                      fontSize: "14px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    No matching skill
                  </div>
                )}

              </div>

            )}

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