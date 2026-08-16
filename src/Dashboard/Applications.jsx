import React from 'react'
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Clock3
} from 'lucide-react'

import './Applications.css'

export default function Applications() {
  return (
    <div className="applications-page">

      {/* Heading */}
      <div className="applications-heading">
        <h1>My Applications</h1>

        <p>
          Track and manage all your internship applications in one place.
        </p>
      </div>


      {/* Application Stats */}
      <div className="application-stats">

        <div className="application-stat">
          <h2>8</h2>
          <p>Total Applications</p>
        </div>

        <div className="application-stat">
          <h2>3</h2>
          <p>Under Review</p>
        </div>

        <div className="application-stat">
          <h2>2</h2>
          <p>Shortlisted</p>
        </div>

        <div className="application-stat">
          <h2>3</h2>
          <p>Rejected</p>
        </div>

      </div>


      {/* Applications */}
      <div className="applications-container">

        <div className="applications-top">

          <h2>Recent Applications</h2>

          <select>
            <option>All Applications</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>

        </div>


        {/* Application 1 */}
        <div className="application-card">

          <div className="application-logo">
            ABC
          </div>


          <div className="application-info">

            <div className="application-title">

              <div>
                <h3>Software Developer Intern</h3>
                <p>ABC Technologies</p>
              </div>

              <span className="status under-review">
                Under Review
              </span>

            </div>


            <div className="application-meta">

              <span>
                <MapPin size={16} />
                Mumbai
              </span>

              <span>
                <BriefcaseBusiness size={16} />
                Software Development
              </span>

              <span>
                <Clock3 size={16} />
                3 Months
              </span>

            </div>


            <div className="application-date">

              <span>
                <CalendarDays size={16} />
                Applied on 10 August 2026
              </span>

              <button>
                View Details
              </button>

            </div>

          </div>

        </div>


        {/* Application 2 */}
        <div className="application-card">

          <div className="application-logo">
            XYZ
          </div>


          <div className="application-info">

            <div className="application-title">

              <div>
                <h3>AI / ML Intern</h3>
                <p>XYZ Innovations</p>
              </div>

              <span className="status shortlisted">
                Shortlisted
              </span>

            </div>


            <div className="application-meta">

              <span>
                <MapPin size={16} />
                Bangalore
              </span>

              <span>
                <BriefcaseBusiness size={16} />
                Artificial Intelligence
              </span>

              <span>
                <Clock3 size={16} />
                6 Months
              </span>

            </div>


            <div className="application-date">

              <span>
                <CalendarDays size={16} />
                Applied on 5 August 2026
              </span>

              <button>
                View Details
              </button>

            </div>

          </div>

        </div>


        {/* Application 3 */}
        <div className="application-card">

          <div className="application-logo">
            DEF
          </div>


          <div className="application-info">

            <div className="application-title">

              <div>
                <h3>Data Analyst Intern</h3>
                <p>DEF Analytics</p>
              </div>

              <span className="status rejected">
                Rejected
              </span>

            </div>


            <div className="application-meta">

              <span>
                <MapPin size={16} />
                Pune
              </span>

              <span>
                <BriefcaseBusiness size={16} />
                Data Analytics
              </span>

              <span>
                <Clock3 size={16} />
                3 Months
              </span>

            </div>


            <div className="application-date">

              <span>
                <CalendarDays size={16} />
                Applied on 28 July 2026
              </span>

              <button>
                View Details
              </button>

            </div>

          </div>

        </div>


      </div>

    </div>
  )
}