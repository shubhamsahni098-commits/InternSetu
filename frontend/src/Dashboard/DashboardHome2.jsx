import React from 'react'
import {
  GraduationCap,
  FileCheck,
  Bookmark,
  UserCheck,
  MapPin,
  Sparkles
} from 'lucide-react'

import './DashboardHome.css'

export default function DashboardHome() {
  return (
    <div className="dash-home">

      {/* Welcome */}
      <div className="welcome">
        <div>
          <h1>Welcome back, Shubham! 👋</h1>

          <p>
            Here are the internship opportunities picked
            specially for you.
          </p>
        </div>

        <div className="ai-badge">
          <Sparkles size={20} />
          <span>AI Powered</span>
        </div>
      </div>


      {/* Stats */}
      <div className="dash-stats">

        <div className="stat-card">

          <div className="stat-icon">
            <GraduationCap size={26} />
          </div>

          <div>
            <h2>12</h2>
            <p>AI Matches</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <FileCheck size={26} />
          </div>

          <div>
            <h2>4</h2>
            <p>Applications</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <Bookmark size={26} />
          </div>

          <div>
            <h2>6</h2>
            <p>Saved Internships</p>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <UserCheck size={26} />
          </div>

          <div>
            <h2>85%</h2>
            <p>Profile Complete</p>
          </div>

        </div>

      </div>


      {/* Recommended Internships */}
      <section className="recommended">

        <div className="section-heading">

          <div>
            <h2>Recommended for You</h2>

            <p>
              Based on your skills and preferences
            </p>
          </div>

          <button className="view-all">
            View All
          </button>

        </div>


        {/* Internship Card */}
        <div className="internship-card">

          <div className="company-logo">
            <span>ABC</span>
          </div>


          <div className="internship-info">

            <h3>Software Developer Intern</h3>

            <h4>ABC Technologies</h4>

            <div className="job-details">

              <span>
                <MapPin size={16} />
                Mumbai
              </span>

              <span>
                Python
              </span>

              <span>
                React
              </span>

              <span>
                SQL
              </span>

            </div>

          </div>


          <div className="match">

            <div className="match-circle">
              <strong>92%</strong>
            </div>

            <p>AI Match</p>

          </div>


          <button className="details-btn">
            View Details
          </button>

        </div>

      </section>

    </div>
  )
}