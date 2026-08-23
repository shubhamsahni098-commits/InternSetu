import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompRegister.css";
import Navbar from '../Components/Navbar'

import LogFooter from '../Components/LogFooter'
import rf from "../assets/rf.png";

export default function CompRegister() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Backend integration baad me add karenge
        navigate("/company/dashboard");
    };

    return (
        <>
        <Navbar/>
        <div className="comp-reg-page">

            <div className="comp-reg-card">

                {/* =========================
                    LEFT IMAGE
                ========================= */}

                <div className="comp-reg-left">

                    <div className="comp-reg-overlay">

                        <h1>InternSetu</h1>

                        <p>
                            Connect with talented students and
                            discover the right candidates.
                        </p>

                        <div className="comp-line"></div>

                        <span>
                            Create your organization account
                            and start posting opportunities.
                        </span>

                    </div>

                </div>


                {/* =========================
                    RIGHT FORM
                ========================= */}

                <div className="comp-reg-right">

                    <div className="comp-reg-heading">

                        <h1>Create Organization Account</h1>

                        <p>
                            Register your organization on InternSetu
                        </p>

                    </div>


                    <form
                        className="comp-reg-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Company Name */}

                        <div className="comp-field">

                            <label>
                                Company / Organization Name
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. ABC Technologies"
                                required
                            />

                        </div>


                        {/* Official Email */}

                        <div className="comp-field">

                            <label>
                                Official Email
                            </label>

                            <input
                                type="email"
                                placeholder="e.g. hr@company.com"
                                required
                            />

                        </div>


                        {/* Phone */}

                        <div className="comp-field">

                            <label>
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                placeholder="+91 9876543210"
                                required
                            />

                        </div>


                        {/* Website */}

                        <div className="comp-field">

                            <label>
                                Website
                            </label>

                            <input
                                type="url"
                                placeholder="https://company.com"
                            />

                        </div>


                        {/* Industry */}

                        <div className="comp-field">

                            <label>
                                Industry / Sector
                            </label>

                            <select required>

                                <option value="">
                                    Select industry
                                </option>

                                <option value="IT">
                                    Information Technology
                                </option>

                                <option value="Finance">
                                    Finance
                                </option>

                                <option value="Healthcare">
                                    Healthcare
                                </option>

                                <option value="Education">
                                    Education
                                </option>

                                <option value="Manufacturing">
                                    Manufacturing
                                </option>

                                <option value="Government">
                                    Government
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* Location */}

                        <div className="comp-field">

                            <label>
                                Organization Location
                            </label>

                            <input
                                type="text"
                                placeholder="Mumbai, Maharashtra"
                                required
                            />

                        </div>


                        {/* Password */}

                        <div className="comp-field">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                required
                            />

                        </div>


                        {/* Confirm Password */}

                        <div className="comp-field">

                            <label>
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm your password"
                                required
                            />

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="comp-reg-btn"
                        >
                            Create Account
                        </button>

                    </form>


                    {/* Login */}

                    <div className="comp-login-text">

                        <span>
                            Already have an account?
                        </span>

                        <span
                            className="comp-login-link"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>

                    </div>

                </div>

            </div>

        </div>

        <LogFooter/>

        </>
    );
}