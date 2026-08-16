import React from 'react'
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Sparkles
} from 'lucide-react'

import './Internships.css'

export default function Internships() {
  return (
    <div className="internships-page">

      {/* Heading */}
      <div className="internships-heading">
        <h1>Find Internships</h1>

        <p>
          Discover internship opportunities matched with your
          skills and preferences.
        </p>
      </div>


      {/* Search & Filters */}
      <div className="internship-filters">

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search internships, skills or companies..."
          />

        </div>


        <select>
          <option>All Domains</option>
          <option>Software Development</option>
          <option>AI / Machine Learning</option>
          <option>Data Science</option>
          <option>Web Development</option>
          <option>Cyber Security</option>
        </select>


        <select>
          <option>All Locations</option>
          <option>Mumbai</option>
          <option>Pune</option>
          <option>Bangalore</option>
          <option>Delhi</option>
          <option>Hyderabad</option>
          <option>Remote</option>
        </select>


        <select>
          <option>Work Mode</option>
          <option>On-site</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>

      </div>


      {/* Result Heading */}
      <div className="results-heading">

        <div>
          <h2>Recommended Internships</h2>

          <p>24 opportunities found</p>
        </div>

        <select className="sort-select">
          <option>Best Match</option>
          <option>Latest</option>
          <option>Highest Stipend</option>
        </select>

      </div>


      {/* Internship List */}
      <div className="internship-list">


        {/* Card 1 */}
        <div className="internship-box">

          <div className="company-logo">
            ABC
          </div>


          <div className="internship-details">

            <div className="title-row">

              <div>
                <h3>Software Developer Intern</h3>
                <h4>ABC Technologies</h4>
              </div>

              <div className="ai-match">
                <Sparkles size={15} />
                92% Match
              </div>

            </div>


            <div className="internship-meta">

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


            <div className="skills">

              <span>React</span>
              <span>JavaScript</span>
              <span>Python</span>
              <span>SQL</span>

            </div>


            <div className="card-bottom">

              <strong>
                ₹15,000 / month
              </strong>

              <button>
                View Details
              </button>

            </div>

          </div>

        </div>


        {/* Card 2 */}
        <div className="internship-box">

          <div className="company-logo">
            XYZ
          </div>


          <div className="internship-details">

            <div className="title-row">

              <div>
                <h3>AI / ML Intern</h3>
                <h4>XYZ Innovations</h4>
              </div>

              <div className="ai-match">
                <Sparkles size={15} />
                88% Match
              </div>

            </div>


            <div className="internship-meta">

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


            <div className="skills">

              <span>Python</span>
              <span>Machine Learning</span>
              <span>TensorFlow</span>

            </div>


            <div className="card-bottom">

              <strong>
                ₹20,000 / month
              </strong>

              <button>
                View Details
              </button>

            </div>

          </div>

        </div>


        {/* Card 3 */}
        <div className="internship-box">

          <div className="company-logo">
            DEF
          </div>


          <div className="internship-details">

            <div className="title-row">

              <div>
                <h3>Data Analyst Intern</h3>
                <h4>DEF Analytics</h4>
              </div>

              <div className="ai-match">
                <Sparkles size={15} />
                84% Match
              </div>

            </div>


            <div className="internship-meta">

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


            <div className="skills">

              <span>Python</span>
              <span>SQL</span>
              <span>Power BI</span>
              <span>Excel</span>

            </div>


            <div className="card-bottom">

              <strong>
                ₹12,000 / month
              </strong>

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