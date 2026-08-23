import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostInternship.css";

export default function PostInternship() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        domain: "",
        skills: "",
        location: "",
        workMode: "",
        stipend: "",
        duration: "",
        eligibility: "",
        deadline: "",
        applicationLink: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Internship Data:", formData);

        // Backend API baad me yahan connect hoga

        alert("Internship posted successfully!");

        navigate("/company/dashboard");
    };

    return (
        <div className="post-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="post-header">

                <div>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/company/dashboard")
                        }
                    >
                        ← Back
                    </button>

                    <h1>
                        Post Internship
                    </h1>

                    <p>
                        Create a new internship opportunity
                        for students.
                    </p>

                </div>

            </div>


            {/* =========================
                FORM CARD
            ========================= */}

            <div className="post-card">

                <form
                    className="post-form"
                    onSubmit={handleSubmit}
                >

                    {/* =========================
                        BASIC INFORMATION
                    ========================= */}

                    <div className="post-section">

                        <h2>
                            Basic Information
                        </h2>

                        <div className="post-grid">

                            {/* Internship Title */}

                            <div className="post-field full">

                                <label>
                                    Internship Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. AI / ML Intern"
                                    required
                                />

                            </div>


                            {/* Domain */}

                            <div className="post-field">

                                <label>
                                    Domain / Field
                                </label>

                                <select
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select domain
                                    </option>

                                    <option value="AI/ML">
                                        AI / ML
                                    </option>

                                    <option value="Web Development">
                                        Web Development
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                    <option value="Software Development">
                                        Software Development
                                    </option>

                                    <option value="Cyber Security">
                                        Cyber Security
                                    </option>

                                    <option value="UI/UX">
                                        UI / UX
                                    </option>

                                    <option value="Finance">
                                        Finance
                                    </option>

                                    <option value="Marketing">
                                        Marketing
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* Location */}

                            <div className="post-field">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Mumbai"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        DESCRIPTION
                    ========================= */}

                    <div className="post-section">

                        <h2>
                            Internship Details
                        </h2>

                        <div className="post-field">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the internship role, responsibilities and expectations..."
                                rows="6"
                                required
                            />

                        </div>

                    </div>


                    {/* =========================
                        REQUIREMENTS
                    ========================= */}

                    <div className="post-section">

                        <h2>
                            Requirements
                        </h2>

                        <div className="post-grid">

                            <div className="post-field full">

                                <label>
                                    Required Skills
                                </label>

                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="e.g. Python, SQL, Machine Learning"
                                    required
                                />

                                <span className="field-help">
                                    Separate skills using commas.
                                </span>

                            </div>


                            <div className="post-field">

                                <label>
                                    Eligibility
                                </label>

                                <input
                                    type="text"
                                    name="eligibility"
                                    value={formData.eligibility}
                                    onChange={handleChange}
                                    placeholder="e.g. B.Tech 2nd / 3rd year"
                                    required
                                />

                            </div>


                            <div className="post-field">

                                <label>
                                    Duration
                                </label>

                                <select
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select duration
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

                                    <option value="12 Months">
                                        12 Months
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        WORK + STIPEND
                    ========================= */}

                    <div className="post-section">

                        <h2>
                            Internship Preferences
                        </h2>

                        <div className="post-grid">

                            <div className="post-field">

                                <label>
                                    Work Mode
                                </label>

                                <select
                                    name="workMode"
                                    value={formData.workMode}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select work mode
                                    </option>

                                    <option value="On-site">
                                        On-site
                                    </option>

                                    <option value="Hybrid">
                                        Hybrid
                                    </option>

                                    <option value="Remote">
                                        Remote
                                    </option>

                                </select>

                            </div>


                            <div className="post-field">

                                <label>
                                    Stipend
                                </label>

                                <input
                                    type="text"
                                    name="stipend"
                                    value={formData.stipend}
                                    onChange={handleChange}
                                    placeholder="e.g. ₹20,000 / month"
                                />

                            </div>


                            <div className="post-field">

                                <label>
                                    Application Deadline
                                </label>

                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="post-field">

                                <label>
                                    Application Link
                                </label>

                                <input
                                    type="url"
                                    name="applicationLink"
                                    value={formData.applicationLink}
                                    onChange={handleChange}
                                    placeholder="https://company.com/apply"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        ACTIONS
                    ========================= */}

                    <div className="post-actions">

                        <button
                            type="button"
                            className="cancel-post-btn"
                            onClick={() =>
                                navigate("/company/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-post-btn"
                        >
                            Post Internship
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}