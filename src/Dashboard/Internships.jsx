import React from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import "./Internships.css";

export default function Internships() {

  const navigate = useNavigate();

  const { t } = useLanguage();


  /* =====================================================
     TOP RECOMMENDED INTERNSHIPS
  ===================================================== */

  const internships = [

    {
      id: 1,
      title: "Software Developer Intern",
      company: "ABC Technologies",
      location: "Mumbai",
      domain: "Software Development",
      duration: "3 Months",
      stipend: "₹15,000 / month",
      skills: [
        "React",
        "JavaScript",
        "Python",
        "SQL"
      ],
      match: 92
    },

    {
      id: 2,
      title: "AI / ML Intern",
      company: "XYZ Innovations",
      location: "Bangalore",
      domain: "Artificial Intelligence",
      duration: "6 Months",
      stipend: "₹20,000 / month",
      skills: [
        "Python",
        "Machine Learning",
        "TensorFlow"
      ],
      match: 88
    },

    {
      id: 3,
      title: "Data Analyst Intern",
      company: "DEF Analytics",
      location: "Pune",
      domain: "Data Analytics",
      duration: "3 Months",
      stipend: "₹12,000 / month",
      skills: [
        "Python",
        "SQL",
        "Power BI",
        "Excel"
      ],
      match: 84
    }

  ];


  /* =====================================================
     VIEW DETAILS
  ===================================================== */

  const handleViewDetails = (id) => {

    navigate(`/dashboard/internships/${id}`);

  };


  return (

    <div className="internships-page">


      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="internships-heading">

        <h1>
          {t.findInternships}
        </h1>

        <p>
          {t.recommendedDesc}
        </p>

      </div>


      {/* =====================================================
          SEARCH & FILTERS
      ===================================================== */}

      <div className="internship-filters">


        {/* Search */}

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder={t.searchInternships}
          />

        </div>


        {/* Domain */}

        <select>

          <option>
            {t.allDomains}
          </option>

          <option>
            Software Development
          </option>

          <option>
            Artificial Intelligence
          </option>

          <option>
            Data Science
          </option>

          <option>
            Web Development
          </option>

          <option>
            Cyber Security
          </option>

        </select>


        {/* Location */}

        <select>

          <option>
            {t.allLocations}
          </option>

          <option>Mumbai</option>
          <option>Pune</option>
          <option>Bangalore</option>
          <option>Delhi</option>
          <option>Hyderabad</option>
          <option>Remote</option>

        </select>


        {/* Work Mode */}

        <select>

          <option>
            {t.workMode}
          </option>

          <option>
            On-site
          </option>

          <option>
            Remote
          </option>

          <option>
            Hybrid
          </option>

        </select>

      </div>


      {/* =====================================================
          RESULT HEADING
      ===================================================== */}

      <div className="results-heading">

        <div>

          <h2>
            {t.recommendedInternships}
          </h2>

          <p>
            {t.topRecommendations}
          </p>

        </div>


        <select className="sort-select">

          <option>
            {t.bestMatch}
          </option>

          <option>
            {t.latest}
          </option>

          <option>
            {t.highestStipend}
          </option>

        </select>

      </div>


      {/* =====================================================
          TOP 3 INTERNSHIPS
      ===================================================== */}

      <div className="internship-list">

        {internships.map((internship) => (

          <div
            className="internship-box"
            key={internship.id}
          >


            {/* Company Logo */}

            <div className="company-logo">

              {internship.company
                .substring(0, 3)
                .toUpperCase()}

            </div>


            {/* Internship Details */}

            <div className="internship-details">


              {/* Title */}

              <div className="title-row">

                <div>

                  <h3>
                    {internship.title}
                  </h3>

                  <h4>
                    {internship.company}
                  </h4>

                </div>


                <div className="ai-match">

                  <Sparkles size={15} />

                  {internship.match}%
                  {t.match}

                </div>

              </div>


              {/* Meta */}

              <div className="internship-meta">

                <span>

                  <MapPin size={16} />

                  {internship.location}

                </span>


                <span>

                  <BriefcaseBusiness size={16} />

                  {internship.domain}

                </span>


                <span>

                  <Clock3 size={16} />

                  {internship.duration}

                </span>

              </div>


              {/* Skills */}

              <div className="skills">

                {internship.skills.map(
                  (skill, index) => (

                    <span key={index}>
                      {skill}
                    </span>

                  )
                )}

              </div>


              {/* Bottom */}

              <div className="card-bottom">

                <strong>
                  {internship.stipend}
                </strong>


                <button
                  onClick={() =>
                    handleViewDetails(
                      internship.id
                    )
                  }
                >
                  {t.viewDetails}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          VIEW ALL
      ===================================================== */}

      <div className="view-all-wrapper">

        <button
          className="view-all-btn"
          onClick={() =>
            navigate(
              "/dashboard/internships/all"
            )
          }
        >
          {t.viewAll}
          →
        </button>

      </div>

    </div>
  );
}