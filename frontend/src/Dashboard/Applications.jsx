import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./Applications.css";

const API_BASE_URL = "https://internsetubackend.onrender.com/api";

export default function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    shortlisted: 0,
    rejected: 0,
  });

  const [filter, setFilter] = useState("All Applications");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // GET TOKEN
  // =========================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  // =========================================================
  // FETCH STUDENT APPLICATIONS
  // =========================================================

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Please login to view your applications.");
        setApplications([]);
        setStats({
          total: 0,
          underReview: 0,
          shortlisted: 0,
          rejected: 0,
        });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/applications/mine`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Failed to fetch applications."
        );
      }

      const data = result?.data || {};

      const applicationList = Array.isArray(data?.applications)
        ? data.applications
        : [];

      const applicationStats = data?.stats || {};

      setApplications(applicationList);

      setStats({
        total: Number(applicationStats?.total) || 0,
        underReview: Number(applicationStats?.underReview) || 0,
        shortlisted: Number(applicationStats?.shortlisted) || 0,
        rejected: Number(applicationStats?.rejected) || 0,
      });
    } catch (err) {
      console.error("Applications fetch error:", err);

      setError(
        err?.message || "Unable to load your applications."
      );

      setApplications([]);
      setStats({
        total: 0,
        underReview: 0,
        shortlisted: 0,
        rejected: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    fetchApplications();
  }, []);

  // =========================================================
  // STATUS HELPERS
  // =========================================================

  const formatStatus = (status) => {
    switch (status) {
      case "UNDER_REVIEW":
        return "Under Review";

      case "SHORTLISTED":
        return "Shortlisted";

      case "REJECTED":
        return "Rejected";

      case "ACCEPTED":
        return "Accepted";

      case "APPLIED":
      default:
        return "Applied";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "UNDER_REVIEW":
        return "under-review";

      case "SHORTLISTED":
        return "shortlisted";

      case "REJECTED":
        return "rejected";

      case "ACCEPTED":
        return "accepted";

      case "APPLIED":
      default:
        return "applied";
    }
  };

  const formatAppliedDate = (value) => {
    if (!value) {
      return "Date not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date not available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCompanyInitials = (companyName) => {
    if (!companyName) {
      return "COM";
    }

    return companyName
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
  };

  // =========================================================
  // FILTER APPLICATIONS
  // =========================================================

  const filteredApplications = useMemo(() => {
    if (filter === "All Applications") {
      return applications;
    }

    const statusMap = {
      Applied: "APPLIED",
      "Under Review": "UNDER_REVIEW",
      Shortlisted: "SHORTLISTED",
      Rejected: "REJECTED",
      Accepted: "ACCEPTED",
    };

    const expectedStatus = statusMap[filter];

    if (!expectedStatus) {
      return applications;
    }

    return applications.filter(
      (application) => application?.status === expectedStatus
    );
  }, [applications, filter]);

  // =========================================================
  // VIEW DETAILS
  // =========================================================

  const handleViewDetails = (internshipId) => {
    if (!internshipId) {
      return;
    }

    navigate(`/dashboard/internships/${internshipId}`);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="applications-page">
        <div className="applications-heading">
          <h1>My Applications</h1>

          <p>
            Track and manage all your internship applications in one place.
          </p>
        </div>

        <div className="applications-container">
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
            }}
          >
            Loading your applications...
          </div>
        </div>
      </div>
    );
  }

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
          <h2>{stats.total}</h2>
          <p>Total Applications</p>
        </div>

        <div className="application-stat">
          <h2>{stats.underReview}</h2>
          <p>Under Review</p>
        </div>

        <div className="application-stat">
          <h2>{stats.shortlisted}</h2>
          <p>Shortlisted</p>
        </div>

        <div className="application-stat">
          <h2>{stats.rejected}</h2>
          <p>Rejected</p>
        </div>
      </div>

      {/* Applications */}
      <div className="applications-container">
        <div className="applications-top">
          <h2>Recent Applications</h2>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>All Applications</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
            <option>Accepted</option>
          </select>
        </div>

        {error && (
          <div
            style={{
              margin: "20px 0",
              padding: "14px 16px",
              borderRadius: "10px",
              background: "#FFF1E6",
              color: "#C2410C",
              border: "1px solid #FDBA74",
            }}
          >
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && filteredApplications.length === 0 && (
          <div
            style={{
              padding: "50px 20px",
              textAlign: "center",
            }}
          >
            <h3>
              {filter === "All Applications"
                ? "No applications yet"
                : `No ${filter.toLowerCase()} applications`}
            </h3>

            <p>
              {filter === "All Applications"
                ? "Apply to an internship to see it here."
                : "No applications match the selected filter."}
            </p>
          </div>
        )}

        {/* Dynamic Applications */}
        {filteredApplications.map((application) => {
          const internship = application?.internship || {};

          const companyName =
            internship?.company?.companyName || "Company";

          const internshipTitle =
            internship?.title || "Internship";

          const location =
            internship?.location || "Not specified";

          const domain =
            internship?.domain || "Not specified";

          const duration =
            internship?.duration || "Not specified";

          const status = application?.status || "APPLIED";

          return (
            <div
              className="application-card"
              key={application?.id}
            >
              <div className="application-logo">
                {getCompanyInitials(companyName)}
              </div>

              <div className="application-info">
                <div className="application-title">
                  <div>
                    <h3>{internshipTitle}</h3>
                    <p>{companyName}</p>
                  </div>

                  <span
                    className={`status ${getStatusClass(status)}`}
                  >
                    {formatStatus(status)}
                  </span>
                </div>

                <div className="application-meta">
                  <span>
                    <MapPin size={16} />
                    {location}
                  </span>

                  <span>
                    <BriefcaseBusiness size={16} />
                    {domain}
                  </span>

                  <span>
                    <Clock3 size={16} />
                    {duration}
                  </span>
                </div>

                <div className="application-date">
                  <span>
                    <CalendarDays size={16} />
                    Applied on{" "}
                    {formatAppliedDate(application?.appliedAt)}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleViewDetails(internship?.id)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
