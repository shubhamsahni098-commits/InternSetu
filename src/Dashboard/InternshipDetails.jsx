import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    Clock3,
    IndianRupee,
    GraduationCap,
    CalendarDays,
    Gift,
    BriefcaseBusiness
} from "lucide-react";

import "./InternshipDetail.css";

export default function InternshipDetails() {

    const navigate = useNavigate();

    const internship = {
        id: 1,
        title: "Software Developer Intern",
        company: "ABC Technologies",
        location: "Mumbai",
        duration: "3 Months",
        stipend: "₹15,000/month",
        skills: ["React", "JavaScript", "Python", "SQL"],
        eligibility: "Undergraduate",
        startDate: "Immediately",
        deadline: "30 Sept 2026",
        perks: ["Certificate", "Flexible Hours"],
        match: 92
    };

    const handleApply = () => {
        alert("Application submitted successfully!");
    };

    return (
        <div className="internship-details-page">

            {/* =========================
                BACK BUTTON
            ========================= */}

            <button
                className="back-btn"
                onClick={() => navigate("/dashboard/internships")}
            >
                <ArrowLeft size={18} />
                Back to Internships
            </button>


            {/* =========================
                MAIN CARD
            ========================= */}

            <div className="internship-details-card">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="details-header">

                    <div className="company-logo">
                        {internship.company
                            .substring(0, 3)
                            .toUpperCase()}
                    </div>

                    <div className="header-content">

                        <div className="title-row">

                            <div>
                                <h1>
                                    {internship.title}
                                </h1>

                                <p className="company-name">
                                    {internship.company}
                                </p>
                            </div>
                             {/*Analysis*/}
                            <div className="match-badge">
                                ✨ {internship.match}% Match
                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    QUICK INFO
                ========================= */}

                <div className="quick-info">

                    <div className="info-item">
                        <MapPin size={19} />
                        <div>
                            <span>Location</span>
                            <strong>{internship.location}</strong>
                        </div>
                    </div>

                    <div className="info-item">
                        <Clock3 size={19} />
                        <div>
                            <span>Duration</span>
                            <strong>{internship.duration}</strong>
                        </div>
                    </div>

                    <div className="info-item">
                        <IndianRupee size={19} />
                        <div>
                            <span>Stipend</span>
                            <strong>{internship.stipend}</strong>
                        </div>
                    </div>

                    <div className="info-item">
                        <BriefcaseBusiness size={19} />
                        <div>
                            <span>Domain</span>
                            <strong>Software Development</strong>
                        </div>
                    </div>

                </div>


                <div className="details-divider"></div>


                {/* =========================
                    SKILLS
                ========================= */}

                <section className="details-section">

                    <h2>
                        Skills Required
                    </h2>

                    <div className="skills-list">

                        {internship.skills.map((skill, index) => (
                            <span
                                className="skill-tag"
                                key={index}
                            >
                                {skill}
                            </span>
                        ))}

                    </div>

                </section>


                {/* =========================
                    ELIGIBILITY
                ========================= */}

                <section className="details-section">

                    <h2>
                        Eligibility
                    </h2>

                    <div className="detail-box">

                        <GraduationCap size={20} />

                        <span>
                            {internship.eligibility}
                        </span>

                    </div>

                </section>


                {/* =========================
                    DATES
                ========================= */}

                <section className="details-section">

                    <h2>
                        Important Dates
                    </h2>

                    <div className="date-grid">

                        <div className="detail-box">

                            <CalendarDays size={20} />

                            <div>
                                <span className="small-label">
                                    Start Date
                                </span>

                                <strong>
                                    {internship.startDate}
                                </strong>
                            </div>

                        </div>


                        <div className="detail-box">

                            <CalendarDays size={20} />

                            <div>
                                <span className="small-label">
                                    Application Deadline
                                </span>

                                <strong>
                                    {internship.deadline}
                                </strong>
                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================
                    PERKS
                ========================= */}

                <section className="details-section">

                    <h2>
                        Perks
                    </h2>

                    <div className="perks-list">

                        {internship.perks.map((perk, index) => (
                            <div
                                className="perk-item"
                                key={index}
                            >
                                <Gift size={18} />
                                <span>{perk}</span>
                            </div>
                        ))}

                    </div>

                </section>


                {/* =========================
                    APPLY
                ========================= */}

                <div className="apply-section">

                    <div>

                        <p className="apply-label">
                            Your Match
                        </p>

                        <strong className="apply-match">
                            {internship.match}% Match
                        </strong>

                    </div>

                    <button
                        className="apply-btn"
                        onClick={handleApply}
                    >
                        Apply Now
                    </button>

                </div>

            </div>

        </div>
    );
}