import React from 'react'
import {
  UserRound,
  Mail,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  Code
} from 'lucide-react'

import './Profile.css'

export default function Profile() {
  return (
    <div className="profile-page">

      {/* Heading */}
      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>
          Complete your profile to get better internship recommendations.
        </p>
      </div>


      {/* Profile Card */}
      <div className="profile-card">

        {/* Profile Header */}
        <div className="profile-top">

          <div className="profile-avatar">
            <UserRound size={42} />
          </div>

          <div>
            <h2>Shubham Sahni</h2>
            <p>Computer Science Student</p>
          </div>

        </div>


        {/* Personal Information */}
        <div className="profile-section">

          <h3>Personal Information</h3>

          <div className="profile-grid">

            <div className="profile-field">
              <label>
                <UserRound size={16} />
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
              />
            </div>


            <div className="profile-field">
              <label>
                <Mail size={16} />
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>


            <div className="profile-field">
              <label>
                <MapPin size={16} />
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Mumbai"
              />
            </div>


            <div className="profile-field">
              <label>
                <GraduationCap size={16} />
                Education
              </label>

              <input
                type="text"
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>

          </div>

        </div>


        {/* Career Information */}
        <div className="profile-section">

          <h3>Career Preferences</h3>

          <div className="profile-grid">

            <div className="profile-field">

              <label>
                <BriefcaseBusiness size={16} />
                Preferred Role
              </label>

              <select>
                <option>Select preferred role</option>
                <option>Software Developer</option>
                <option>Data Analyst</option>
                <option>Data Scientist</option>
                <option>AI / ML Engineer</option>
                <option>Web Developer</option>
                <option>Backend Developer</option>
              </select>

            </div>


            <div className="profile-field">

              <label>
                <MapPin size={16} />
                Preferred Location
              </label>

              <select>
                <option>Select location</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Pune</option>
                <option>Remote</option>
              </select>

            </div>

          </div>

        </div>


        {/* Skills */}
        <div className="profile-section">

          <h3>
            <Code size={20} />
            Skills
          </h3>

          <div className="skills-input">

            <input
              type="text"
              placeholder="e.g. Python, React, SQL"
            />

            <button>
              Add Skill
            </button>

          </div>

          <div className="skill-tags">

            <span>Python</span>
            <span>React</span>
            <span>SQL</span>
            <span>C++</span>

          </div>

        </div>


        {/* Save */}
        <div className="save-profile">

          <button className="save-btn">
            Save Profile
          </button>

        </div>

      </div>

    </div>
  )
}