import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyDashboard.css";

export default function CompanyDashboard() {

    const navigate = useNavigate();

    return (
        <div className="comp-dash">

            {/* =========================
                HEADER
            ========================= */}

            <div className="comp-dash-header">

                <div>
                    <h1>Company Dashboard</h1>
                    <p>
                        Welcome back, ABC Technologies 👋
                    </p>
                </div>

                <button
                    className="comp-logout"
                    onClick={() => navigate("/login")}
                >
                    Logout
                </button>

            </div>


            {/* =========================
                STATS
            ========================= */}

            <div className="comp-stats">

                <div className="comp-stat-card">

                    <div className="comp-stat-icon">
                        📋
                    </div>

                    <div>
                        <p>Total Internships</p>
                        <h2>5</h2>
                    </div>

                </div>


                <div className="comp-stat-card">

                    <div className="comp-stat-icon">
                        ✅
                    </div>

                    <div>
                        <p>Active Internships</p>
                        <h2>4</h2>
                    </div>

                </div>


                <div className="comp-stat-card">

                    <div className="comp-stat-icon">
                        👥
                    </div>

                    <div>
                        <p>Total Applications</p>
                        <h2>42</h2>
                    </div>

                </div>

            </div>


            {/* =========================
                QUICK ACTIONS
            ========================= */}

            <div className="comp-section">

                <h2>Quick Actions</h2>

                <div className="comp-actions">

                    <button
                        className="comp-action-card primary"
                        onClick={() =>
                            navigate("/company/post-internship")
                        }
                    >

                        <span className="action-icon">
                            +
                        </span>

                        <div>
                            <h3>Post Internship</h3>

                            <p>
                                Create and publish a new
                                internship opportunity.
                            </p>
                        </div>

                    </button>


                    <button
                        className="comp-action-card"
                        onClick={() =>
                            navigate("/company/manage-internships")
                        }
                    >

                        <span className="action-icon">
                            📋
                        </span>

                        <div>
                            <h3>Manage Internships</h3>

                            <p>
                                View, edit and manage your
                                posted internships.
                            </p>
                        </div>

                    </button>


                    <button
                        className="comp-action-card"
                    >

                        <span className="action-icon">
                            👥
                        </span>

                        <div>
                            <h3>View Applications</h3>

                            <p>
                                Review applications received
                                from students.
                            </p>
                        </div>

                    </button>

                </div>

            </div>


            {/* =========================
                RECENT INTERNSHIPS
            ========================= */}

            <div className="comp-section">

                <div className="comp-section-title">

                    <h2>Recent Internships</h2>

                    <button
                        onClick={() =>
                            navigate("/company/manage-internships")
                        }
                    >
                        View All →
                    </button>

                </div>


                <div className="comp-internship-list">


                    {/* Internship 1 */}

                    <div className="comp-internship-card">

                        <div className="internship-left">

                            <div className="company-logo-box">
                                ABC
                            </div>

                            <div>

                                <h3>
                                    AI / ML Intern
                                </h3>

                                <p>
                                    Mumbai • Hybrid
                                </p>

                            </div>

                        </div>


                        <div className="internship-middle">

                            <span>
                                ₹20,000 / month
                            </span>

                            <span>
                                6 Months
                            </span>

                        </div>


                        <div className="internship-status">
                            Active
                        </div>

                    </div>


                    {/* Internship 2 */}

                    <div className="comp-internship-card">

                        <div className="internship-left">

                            <div className="company-logo-box">
                                ABC
                            </div>

                            <div>

                                <h3>
                                    React Developer Intern
                                </h3>

                                <p>
                                    Remote
                                </p>

                            </div>

                        </div>


                        <div className="internship-middle">

                            <span>
                                ₹15,000 / month
                            </span>

                            <span>
                                3 Months
                            </span>

                        </div>


                        <div className="internship-status">
                            Active
                        </div>

                    </div>


                    {/* Internship 3 */}

                    <div className="comp-internship-card">

                        <div className="internship-left">

                            <div className="company-logo-box">
                                ABC
                            </div>

                            <div>

                                <h3>
                                    Data Analyst Intern
                                </h3>

                                <p>
                                    Pune • On-site
                                </p>

                            </div>

                        </div>


                        <div className="internship-middle">

                            <span>
                                ₹12,000 / month
                            </span>

                            <span>
                                3 Months
                            </span>

                        </div>


                        <div className="internship-status">
                            Active
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}