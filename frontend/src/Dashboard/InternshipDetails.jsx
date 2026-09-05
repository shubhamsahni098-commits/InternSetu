import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ArrowLeft,
    MapPin,
    Clock3,
    IndianRupee,
    GraduationCap,
    CalendarDays,
    Gift,
    BriefcaseBusiness,
    Info,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    X
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import "./InternshipDetail.css";


const API_BASE_URL = "https://internsetubackend.onrender.com/api";

// =========================================================
// SESSION STORAGE CACHE KEY
// =========================================================

const RECOMMENDATIONS_CACHE_KEY =
    "recommendedInternships";


export default function InternshipDetails() {

    const navigate = useNavigate();

    const { id } = useParams();


    // =========================================================
    // STATE
    // =========================================================

    const [internship, setInternship] =
        useState(null);

    const [student, setStudent] =
        useState(null);

    const [recommendation, setRecommendation] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [analysisOpen, setAnalysisOpen] =
        useState(false);


    // =========================================================
    // GET CACHED RECOMMENDATIONS
    // =========================================================

    const getCachedRecommendations = () => {

        try {

            const cached =
                sessionStorage.getItem(
                    RECOMMENDATIONS_CACHE_KEY
                );


            if (!cached) {
                return [];
            }


            const parsed =
                JSON.parse(cached);


            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Failed to read cached recommendations:",
                error
            );

            return [];

        }

    };


    // =========================================================
    // FETCH INTERNSHIP + CACHED RECOMMENDATION + STUDENT PROFILE
    // =========================================================

    useEffect(() => {

        const fetchAllData = async () => {

            try {

                setLoading(true);

                setError("");


                if (!id) {

                    throw new Error(
                        "Internship ID is missing."
                    );

                }


                // =================================================
                // 1. ACTUAL INTERNSHIP DETAILS
                // =================================================

                const internshipResponse =
                    await fetch(
                        `${API_BASE_URL}/internships/${id}`
                    );


                const internshipResult =
                    await internshipResponse.json();


                if (
                    !internshipResponse.ok
                ) {

                    throw new Error(
                        internshipResult?.message ||
                        "Failed to fetch internship details."
                    );

                }


                const internshipData =
                    internshipResult?.data;


                if (!internshipData) {

                    throw new Error(
                        "Internship details not found."
                    );

                }


                setInternship(
                    internshipData
                );

                // =========================================================
                // SAVE RECENTLY VIEWED INTERNSHIP
                // =========================================================

                try {
                    const storedRecentlyViewed =
                        localStorage.getItem(
                            "recentlyViewedInternships"
                        );

                    const recentlyViewed =
                        storedRecentlyViewed
                            ? JSON.parse(
                                  storedRecentlyViewed
                              )
                            : [];

                    const viewedInternship = {
                        id:
                            internshipData?.internship_id ??
                            internshipData?.id ??
                            id,

                        title:
                            internshipData?.title ??
                            internshipData?.role ??
                            "Internship",

                        company:
                            internshipData?.company?.companyName ??
                            internshipData?.company ??
                            "Company",

                        location:
                            internshipData?.location ??
                            "Not specified",

                        duration:
                            internshipData?.duration ??
                            "Not specified",

                        stipend:
                            internshipData?.stipend ??
                            "Stipend not specified",

                        skills:
                            Array.isArray(
                                internshipData?.skills
                            )
                                ? internshipData.skills
                                : [],

                        viewedAt:
                            new Date().toISOString()
                    };

                    const filteredRecentlyViewed =
                        recentlyViewed.filter(
                            (item) =>
                                String(item?.id) !==
                                String(viewedInternship.id)
                        );

                    const updatedRecentlyViewed = [
                        viewedInternship,
                        ...filteredRecentlyViewed
                    ].slice(0, 3);

                    localStorage.setItem(
                        "recentlyViewedInternships",
                        JSON.stringify(
                            updatedRecentlyViewed
                        )
                    );

                } catch (recentError) {
                    console.error(
                        "Failed to save recently viewed internship:",
                        recentError
                    );
                }


                // =================================================
                // 2. CURRENT STUDENT TOKEN
                // =================================================

                const token =
                    localStorage.getItem("token") ||
                    localStorage.getItem("authToken") ||
                    localStorage.getItem("accessToken");


                if (token) {


                    // =============================================
                    // 2A. READ RECOMMENDATION FROM CACHE
                    // =============================================

                    try {

                        const recommendationList =
                            getCachedRecommendations();


                        const currentRecommendation =
                            recommendationList.find(
                                (item) =>
                                    String(
                                        item?.internship_id
                                    ) === String(id)
                            );


                        if (
                            currentRecommendation
                        ) {

                            setRecommendation(
                                currentRecommendation
                            );

                        } else {

                            setRecommendation(null);

                        }

                    } catch (
                        recommendationError
                    ) {

                        console.error(
                            "Cached recommendation error:",
                            recommendationError
                        );

                        setRecommendation(null);

                    }


                    // =============================================
                    // 2B. STUDENT PROFILE
                    // =============================================

                    try {

                        let profileResponse =
                            await fetch(
                                `${API_BASE_URL}/student/profile`,
                                {
                                    headers: {
                                        Authorization:
                                            `Bearer ${token}`
                                    }
                                }
                            );


                        // ------------------------------------------------
                        // Fallback route
                        // ------------------------------------------------

                        if (
                            !profileResponse.ok
                        ) {

                            profileResponse =
                                await fetch(
                                    `${API_BASE_URL}/students/profile`,
                                    {
                                        headers: {
                                            Authorization:
                                                `Bearer ${token}`
                                        }
                                    }
                                );

                        }


                        if (
                            profileResponse.ok
                        ) {

                            const profileResult =
                                await profileResponse.json();


                            if (
                                profileResult?.data
                            ) {

                                setStudent(
                                    profileResult.data
                                );

                            }

                        }

                    } catch (
                        profileError
                    ) {

                        console.error(
                            "Student profile fetch error:",
                            profileError
                        );

                    }

                }

            } catch (err) {

                console.error(
                    "Internship details error:",
                    err
                );


                setError(
                    err.message ||
                    "Failed to load internship details."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchAllData();

    }, [id]);


    // =========================================================
    // DISPLAY VALUES
    // =========================================================

    const companyName =
        internship?.company?.companyName ||
        internship?.company ||
        "Company";


    const companyInitials =
        companyName
            .substring(0, 3)
            .toUpperCase();


    const title =
        internship?.title ||
        internship?.role ||
        "Internship";


    const internshipLocation =
        internship?.location ||
        "Not specified";


    const duration =
        internship?.duration ||
        "Not specified";


    const stipend =
        internship?.stipend ||
        "Stipend not specified";


    const domain =
        internship?.domain ||
        "Not specified";


    const workMode =
        internship?.workMode ||
        internship?.work_mode ||
        "Not specified";


    const eligibility =
        internship?.eligibility ||
        "Not specified";


    const description =
        internship?.description ||
        "No description available.";


    const skills =
        Array.isArray(
            internship?.skills
        )
            ? internship.skills
            : [];


    const perks =
        Array.isArray(
            internship?.perks
        )
            ? internship.perks
            : [];


    const deadline =
        internship?.deadline
            ? new Date(
                internship.deadline
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            )
            : "Not specified";


    const startDate =
        internship?.startDate ||
        internship?.start_date ||
        "Not specified";


    // =========================================================
    // RECOMMENDATION SCORE
    // =========================================================

    const matchScore =
        recommendation?.personalized_score_100 ??
        recommendation?.final_score_100 ??
        null;


    // =========================================================
    // LOCATION SCORE DETAILS
    // =========================================================

    const locationScore =
        recommendation?.location_score_100 ??
        null;

    const distanceKm =
        recommendation?.distance_km ??
        null;

    const isRemoteLocation =
        String(internshipLocation || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ")
        === "remote" ||
        String(internshipLocation || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ")
        === "work from home";


    // =========================================================
    // NORMALIZE TEXT
    // =========================================================

    const normalizeText = (value) => {

        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(
                /[\s._-]+/g,
                ""
            );

    };


    // =========================================================
    // NORMALIZE SKILL
    // =========================================================

    const SKILL_ALIASES = {
        "ml": "machinelearning",
        "aiml": "machinelearning",
        "machinelearning": "machinelearning",

        "js": "javascript",
        "javascript": "javascript",

        "node": "nodejs",
        "nodejs": "nodejs",

        "reactjs": "react",
        "react": "react",

        "cpp": "c++",
        "c++": "c++",
    };

    const normalizeSkill = (skill) => {

        const normalized = normalizeText(skill);

        return (
            SKILL_ALIASES[normalized] ||
            normalized
        );

    };


    // =========================================================
    // STUDENT SKILLS
    // =========================================================

    const studentSkills =
        Array.isArray(
            student?.skills
        )
            ? student.skills
            : [];


    // =========================================================
    // SKILL GAP ANALYSIS
    // =========================================================

    const skillAnalysis =
        useMemo(() => {

            const studentSkillSet =
                new Set(
                    studentSkills.map(
                        normalizeSkill
                    )
                );


            const matched = [];

            const missing = [];


            skills.forEach(
                (requiredSkill) => {

                    const normalized =
                        normalizeSkill(
                            requiredSkill
                        );


                    if (
                        normalized &&
                        studentSkillSet.has(
                            normalized
                        )
                    ) {

                        matched.push(
                            requiredSkill
                        );

                    } else {

                        missing.push(
                            requiredSkill
                        );

                    }

                }
            );


            const coverage =
                skills.length > 0
                    ? Math.round(
                        (
                            matched.length /
                            skills.length
                        ) * 100
                    )
                    : 0;


            return {
                matched,
                missing,
                coverage
            };

        }, [
            skills,
            studentSkills
        ]);


    // =========================================================
    // HELPER - CHECK TEXT MATCH
    // =========================================================

    const isTextMatch = (
        preferred,
        actual
    ) => {

        if (
            !preferred ||
            !actual
        ) {

            return false;

        }


        const preferredText =
            normalizeText(preferred);

        const actualText =
            normalizeText(actual);


        if (
            preferredText ===
            actualText
        ) {

            return true;

        }


        return (
            actualText.includes(
                preferredText
            ) ||
            preferredText.includes(
                actualText
            )
        );

    };


    // =========================================================
    // HELPER - GET NUMERIC VALUE
    // =========================================================

    const getNumericValue = (
        value
    ) => {

        if (
            value === null ||
            value === undefined
        ) {

            return null;

        }


        const text =
            String(value)
                .replace(
                    /,/g,
                    ""
                )
                .toLowerCase();


        const matches =
            text.match(
                /\d+(?:\.\d+)?/g
            );


        if (
            !matches ||
            matches.length === 0
        ) {

            return null;

        }


        return Number(
            matches[
                matches.length - 1
            ]
        );

    };


    // =========================================================
    // DYNAMIC PROFILE MATCHES
    // =========================================================

    const profileMatches =
        useMemo(() => {

            const preferredRole =
                student?.preferredRole ||
                student?.preferred_role ||
                "";


            const preferredDomain =
                student?.preferredDomain ||
                student?.preferred_domain ||
                "";


            const preferredLocation =
                student?.preferredLocation ||
                student?.preferred_location ||
                student?.location ||
                "";


            const preferredWorkMode =
                student?.preferredWorkMode ||
                student?.preferred_work_mode ||
                "";


            const preferredInternshipType =
                student?.preferredInternshipType ||
                student?.preferred_internship_type ||
                "";


            const preferredStipend =
                student?.preferredStipend ||
                student?.preferred_stipend ||
                student?.minimumStipend ||
                student?.minimum_stipend ||
                null;


            const internshipRole =
                internship?.role ||
                internship?.title ||
                "";


            const internshipType =
                internship?.internshipType ||
                internship?.internship_type ||
                internship?.type ||
                "";


            const stipendValue =
                getNumericValue(
                    stipend
                );


            const preferredStipendValue =
                getNumericValue(
                    preferredStipend
                );


            return {

                role:
                    isTextMatch(
                        preferredRole,
                        internshipRole
                    ),

                domain:
                    isTextMatch(
                        preferredDomain,
                        domain
                    ),

                location:
                    isTextMatch(
                        preferredLocation,
                        internshipLocation
                    ),

                workMode:
                    isTextMatch(
                        preferredWorkMode,
                        workMode
                    ),

                internshipType:
                    isTextMatch(
                        preferredInternshipType,
                        internshipType
                    ),

                stipend:
                    stipendValue !== null &&
                    preferredStipendValue !== null &&
                    stipendValue >=
                    preferredStipendValue

            };

        }, [
            student,
            internship,
            domain,
            internshipLocation,
            workMode,
            stipend,
            internship?.duration
        ]);


    // =========================================================
    // WHY THIS MATCH - FULLY DYNAMIC
    // =========================================================

    const whyThisMatches =
        useMemo(() => {

            const reasons = [];

            // =====================================================
            // HELPER
            // =====================================================

            const addReason = (
                type,
                text
            ) => {
                reasons.push({
                    type,
                    text
                });
            };


            // =====================================================
            // 1. SKILL MATCH
            // =====================================================

            const coverage =
                skillAnalysis.coverage;


            if (skills.length === 0) {

                addReason(
                    "neutral",
                    "No skill requirements were provided for this internship"
                );

            } else if (coverage === 100) {

                addReason(
                    "match",
                    `Excellent skill match — all ${skills.length} required skills match your profile`
                );

            } else if (coverage >= 80) {

                addReason(
                    "match",
                    `Strong skill match — ${coverage}% of required skills match your profile`
                );

            } else if (coverage >= 50) {

                addReason(
                    "match",
                    `Good skill match — ${coverage}% of required skills match your profile`
                );

            } else if (coverage > 0) {

                addReason(
                    "partial",
                    `Partial skill match — ${coverage}% of required skills match your profile`
                );

            } else {

                addReason(
                    "mismatch",
                    "No required skills currently match your profile"
                );

            }


            // =====================================================
            // 2. ROLE MATCH
            // =====================================================

            const preferredRole =
                student?.preferredRole ||
                student?.preferred_role ||
                "";


            const internshipRole =
                internship?.role ||
                internship?.title ||
                "";


            if (
                preferredRole &&
                internshipRole
            ) {

                if (
                    profileMatches.role
                ) {

                    addReason(
                        "match",
                        `Role matches your preference (${internshipRole})`
                    );

                } else {

                    addReason(
                        "mismatch",
                        `Role does not match your preference (Preferred: ${preferredRole}, Internship: ${internshipRole})`
                    );

                }

            } else {

                addReason(
                    "neutral",
                    preferredRole
                        ? `Your preferred role is ${preferredRole}`
                        : "No role preference specified"
                );

            }


            // =====================================================
            // 3. INTERNSHIP TYPE
            // =====================================================

            const preferredInternshipType =
                student?.preferredInternshipType ||
                student?.preferred_internship_type ||
                "";


            const internshipType =
                internship?.internshipType ||
                internship?.internship_type ||
                internship?.type ||
                "";


            if (
                preferredInternshipType &&
                internshipType
            ) {

                if (
                    profileMatches.internshipType
                ) {

                    addReason(
                        "match",
                        `Internship type matches your preference (${internshipType})`
                    );

                } else {

                    addReason(
                        "mismatch",
                        `Internship type does not match your preference (Preferred: ${preferredInternshipType}, Internship: ${internshipType})`
                    );

                }

            } else {

                addReason(
                    "neutral",
                    preferredInternshipType
                        ? `Your preferred internship type is ${preferredInternshipType}`
                        : "No internship type preference specified"
                );

            }


            // =====================================================
            // 4. WORK MODE
            // =====================================================

            const preferredWorkMode =
                student?.preferredWorkMode ||
                student?.preferred_work_mode ||
                "";


            if (
                preferredWorkMode &&
                workMode !== "Not specified"
            ) {

                if (
                    profileMatches.workMode
                ) {

                    addReason(
                        "match",
                        `Work mode matches your preference (${workMode})`
                    );

                } else {

                    addReason(
                        "mismatch",
                        `Work mode does not match your preference (Preferred: ${preferredWorkMode}, Internship: ${workMode})`
                    );

                }

            } else {

                addReason(
                    "neutral",
                    preferredWorkMode
                        ? `Your preferred work mode is ${preferredWorkMode}`
                        : "No work mode preference specified"
                );

            }


            // =====================================================
            // 5. DOMAIN
            // =====================================================

            const preferredDomain =
                student?.preferredDomain ||
                student?.preferred_domain ||
                "";


            if (
                preferredDomain &&
                domain !== "Not specified"
            ) {

                if (
                    profileMatches.domain
                ) {

                    addReason(
                        "match",
                        `Domain matches your preference (${domain})`
                    );

                } else {

                    addReason(
                        "mismatch",
                        `Domain does not match your preference (Preferred: ${preferredDomain}, Internship: ${domain})`
                    );

                }

            } else {

                addReason(
                    "neutral",
                    preferredDomain
                        ? `Your preferred domain is ${preferredDomain}`
                        : "No domain preference specified"
                );

            }


            // =====================================================
            // 6. LOCATION SCORE
            // =====================================================

            const preferredLocation =
                student?.preferredLocation ||
                student?.preferred_location ||
                student?.location ||
                "";


            if (
                locationScore !== null &&
                locationScore !== undefined &&
                internshipLocation !== "Not specified"
            ) {

                const formattedLocationScore =
                    Number(locationScore).toFixed(0);

                if (isRemoteLocation) {

                    addReason(
                        "match",
                        `Location Score: ${formattedLocationScore}/100 | Preferred: ${preferredLocation || "Not specified"} | Internship: ${internshipLocation} | Distance: Not applicable`
                    );

                } else {

                    const formattedDistance =
                        distanceKm !== null &&
                        distanceKm !== undefined &&
                        Number.isFinite(Number(distanceKm))
                            ? `${Number(distanceKm).toFixed(0)} km`
                            : "Not available";

                    addReason(
                        locationScore >= 70
                            ? "match"
                            : locationScore >= 40
                                ? "partial"
                                : "mismatch",
                        `Location Score: ${formattedLocationScore}/100 | Preferred: ${preferredLocation || "Not specified"} | Internship: ${internshipLocation} | Distance: ${formattedDistance}`
                    );

                }

            } else if (preferredLocation) {

                addReason(
                    "neutral",
                    `Preferred Location: ${preferredLocation} | Internship: ${internshipLocation}`
                );

            } else {

                addReason(
                    "neutral",
                    "No location preference specified"
                );

            }


            // =====================================================
            // 7. STIPEND
            // =====================================================

            const preferredStipend =
                student?.preferredStipend ||
                student?.preferred_stipend ||
                student?.minimumStipend ||
                student?.minimum_stipend ||
                "";


            if (
                preferredStipend &&
                stipend !== "Stipend not specified"
            ) {

                if (
                    profileMatches.stipend
                ) {

                    addReason(
                        "match",
                        `Stipend meets your preference (${stipend})`
                    );

                } else {

                    addReason(
                        "mismatch",
                        `Stipend is below your preference (Preferred minimum: ${preferredStipend}, Internship: ${stipend})`
                    );

                }

            } else {

                addReason(
                    "neutral",
                    preferredStipend
                        ? `Your minimum stipend preference is ${preferredStipend}`
                        : "No minimum stipend preference specified"
                );

            }


            // =====================================================
            // 8. DURATION
            // =====================================================

            const preferredDuration =
                student?.preferredDuration ||
                student?.preferred_duration ||
                student?.duration ||
                "";


            const internshipDuration =
                internship?.duration ||
                "";


            if (
                preferredDuration &&
                internshipDuration
            ) {

                const preferredDurationMatch =
                    String(preferredDuration).match(
                        /\d+(?:\.\d+)?/
                    );

                const internshipDurationMatch =
                    String(internshipDuration).match(
                        /\d+(?:\.\d+)?/
                    );


                const preferredMonths =
                    preferredDurationMatch
                        ? Number(
                            preferredDurationMatch[0]
                        )
                        : null;


                const internshipMonths =
                    internshipDurationMatch
                        ? Number(
                            internshipDurationMatch[0]
                        )
                        : null;


                if (
                    preferredMonths !== null &&
                    internshipMonths !== null
                ) {

                    if (
                        preferredMonths ===
                        internshipMonths
                    ) {

                        addReason(
                            "match",
                            `Duration matches your preference (${internshipDuration})`
                        );

                    } else {

                        addReason(
                            "partial",
                            `Duration differs from your preference (Preferred: ${preferredDuration}, Internship: ${internshipDuration})`
                        );

                    }

                } else {

                    addReason(
                        "neutral",
                        `Internship duration is ${internshipDuration}`
                    );

                }

            } else if (
                preferredDuration
            ) {

                addReason(
                    "neutral",
                    `Your preferred duration is ${preferredDuration}`
                );

            } else if (
                internshipDuration
            ) {

                addReason(
                    "neutral",
                    `Internship duration is ${internshipDuration}`
                );

            } else {

                addReason(
                    "neutral",
                    "No duration preference specified"
                );

            }


            return reasons;

        }, [
            skillAnalysis,
            skills,
            student,
            profileMatches,
            internship,
            domain,
            internshipLocation,
            workMode,
            stipend,
            recommendation,
            locationScore,
            distanceKm,
            isRemoteLocation
        ]);


    // =========================================================
    // APPLY
    // =========================================================

    const handleApply = () => {

        if (
            internship?.applicationLink
        ) {

            window.open(
                internship.applicationLink,
                "_blank",
                "noopener,noreferrer"
            );

            return;

        }


        alert(
            "Application link is not available for this internship."
        );

    };


    // =========================================================
    // BACK
    // =========================================================

    const handleBack = () => {

        navigate(
            "/dashboard/internships"
        );

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="internship-details-page">

                <button
                    className="back-btn"
                    onClick={handleBack}
                    type="button"
                >

                    <ArrowLeft size={18} />

                    Back to Internships

                </button>


                <div className="internship-details-card">

                    <div className="details-loading">

                        <div className="details-spinner"></div>

                        <p>
                            Loading internship details...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (
        error ||
        !internship
    ) {

        return (

            <div className="internship-details-page">

                <button
                    className="back-btn"
                    onClick={handleBack}
                    type="button"
                >

                    <ArrowLeft size={18} />

                    Back to Internships

                </button>


                <div className="internship-details-card">

                    <div className="details-error">

                        <h2>
                            Unable to load internship
                        </h2>

                        <p>
                            {error ||
                                "Internship not found."}
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <div className="internship-details-page">


            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <button
                className="back-btn"
                onClick={handleBack}
                type="button"
            >

                <ArrowLeft size={18} />

                Back to Internships

            </button>


            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="internship-details-card">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="details-header">

                    <div className="company-logo">

                        {companyInitials}

                    </div>


                    <div className="header-content">

                        <div className="title-row">

                            <div>

                                <h1>
                                    {title}
                                </h1>


                                <p className="company-name">
                                    {companyName}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    QUICK INFO
                ================================================= */}

                <div className="quick-info">


                    <div className="info-item">

                        <MapPin size={19} />

                        <div>

                            <span>
                                Location
                            </span>

                            <strong>
                                {internshipLocation}
                            </strong>

                        </div>

                    </div>


                    <div className="info-item">

                        <Clock3 size={19} />

                        <div>

                            <span>
                                Duration
                            </span>

                            <strong>
                                {duration}
                            </strong>

                        </div>

                    </div>


                    <div className="info-item">

                        <IndianRupee size={19} />

                        <div>

                            <span>
                                Stipend
                            </span>

                            <strong>
                                {stipend}
                            </strong>

                        </div>

                    </div>


                    <div className="info-item">

                        <BriefcaseBusiness size={19} />

                        <div>

                            <span>
                                Domain
                            </span>

                            <strong>
                                {domain}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MATCH SECTION
                ================================================= */}

                {matchScore !== null && (

                    <div className="match-summary-section">


                        <div className="match-summary-content">


                            <div className="match-summary-icon">

                                <Sparkles size={20} />

                            </div>


                            <div>

                                <span className="match-summary-label">
                                    Your Match
                                </span>


                                <strong className="match-summary-score">

                                    {Number(
                                        matchScore
                                    ).toFixed(0)}%

                                </strong>


                                <span className="match-summary-text">
                                    match with this internship
                                </span>

                            </div>

                        </div>


                        <div className="match-info-wrapper">

                            <button
                                type="button"
                                className="match-info-button"
                                aria-label="Match analysis"
                                title="View match analysis"
                                onClick={() =>
                                    setAnalysisOpen(
                                        true
                                    )
                                }
                            >

                                <Info size={18} />

                            </button>

                        </div>

                    </div>

                )}


                <div className="details-divider"></div>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <section className="details-section">

                    <h2>
                        About the Internship
                    </h2>


                    <div className="description-box">

                        {description}

                    </div>

                </section>


                {/* =================================================
                    SKILLS
                ================================================= */}

                {skills.length > 0 && (

                    <section className="details-section">

                        <h2>
                            Skills Required
                        </h2>


                        <div className="skills-list">

                            {skills.map(
                                (skill, index) => (

                                    <span
                                        className="skill-tag"
                                        key={`${skill}-${index}`}
                                    >

                                        {skill}

                                    </span>

                                )
                            )}

                        </div>

                    </section>

                )}


                {/* =================================================
                    ELIGIBILITY
                ================================================= */}

                <section className="details-section">

                    <h2>
                        Eligibility
                    </h2>


                    <div className="detail-box">

                        <GraduationCap size={20} />

                        <span>
                            {eligibility}
                        </span>

                    </div>

                </section>


                {/* =================================================
                    WORK MODE
                ================================================= */}

                <section className="details-section">

                    <h2>
                        Work Mode
                    </h2>


                    <div className="detail-box">

                        <BriefcaseBusiness size={20} />

                        <span>
                            {workMode}
                        </span>

                    </div>

                </section>


                {/* =================================================
                    IMPORTANT DATES
                ================================================= */}

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
                                    {startDate}
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
                                    {deadline}
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    PERKS
                ================================================= */}

                {perks.length > 0 && (

                    <section className="details-section">

                        <h2>
                            Perks
                        </h2>


                        <div className="perks-list">

                            {perks.map(
                                (perk, index) => (

                                    <div
                                        className="perk-item"
                                        key={`${perk}-${index}`}
                                    >

                                        <Gift size={18} />

                                        <span>
                                            {perk}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </section>

                )}


                {/* =================================================
                    APPLY
                ================================================= */}

                <div className="apply-section">


                    <div>

                        {matchScore !== null ? (

                            <>

                                <p className="apply-label">
                                    Your Match
                                </p>


                                <strong className="apply-match">

                                    {Number(
                                        matchScore
                                    ).toFixed(0)}%
                                    Match

                                </strong>

                            </>

                        ) : (

                            <>

                                <p className="apply-label">
                                    Internship
                                </p>


                                <strong className="apply-match">
                                    {title}
                                </strong>

                            </>

                        )}

                    </div>


                    <button
                        className="apply-btn"
                        onClick={handleApply}
                        type="button"
                    >

                        Apply Now

                    </button>

                </div>


            </div>


            {/* =====================================================
                MATCH ANALYSIS MODAL
            ===================================================== */}

            {analysisOpen && (

                <div
                    className="match-analysis-overlay"
                    onClick={() =>
                        setAnalysisOpen(false)
                    }
                >


                    <div
                        className="match-analysis-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >


                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div className="analysis-header">

                            <div>

                                <p className="analysis-eyebrow">
                                    AI Match Analysis
                                </p>


                                <h2>
                                    Why this match?
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="analysis-close"
                                onClick={() =>
                                    setAnalysisOpen(false)
                                }
                                aria-label="Close analysis"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* =================================================
                            SCORE
                        ================================================= */}

                        {matchScore !== null && (

                            <div className="analysis-score-card">

                                <div className="analysis-score-icon">

                                    <Sparkles size={22} />

                                </div>


                                <div>

                                    <span>
                                        Overall Match
                                    </span>


                                    <strong>
                                        {Number(
                                            matchScore
                                        ).toFixed(0)}%
                                    </strong>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            WHY THIS MATCH
                        ================================================= */}

                        <section className="analysis-section">

                            <div className="analysis-section-title">

                                <CheckCircle2 size={19} />

                                <h3>
                                    Why this match?
                                </h3>

                            </div>


                            <div className="analysis-reasons">

                                {whyThisMatches.map(
                                    (reason, index) => (

                                        <div
                                            className={`analysis-reason ${reason.type}`}
                                            key={`${reason.text}-${index}`}
                                        >

                                            {reason.type === "match" && (
                                                <CheckCircle2 size={17} />
                                            )}

                                            {reason.type === "partial" && (
                                                <AlertCircle size={17} />
                                            )}

                                            {reason.type === "mismatch" && (
                                                <AlertCircle size={17} />
                                            )}

                                            {reason.type === "neutral" && (
                                                <Info size={17} />
                                            )}

                                            <span>
                                                {reason.text}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* =================================================
                            SKILL ANALYSIS
                        ================================================= */}

                        <section className="analysis-section">

                            <div className="analysis-section-title">

                                <Sparkles size={19} />

                                <h3>
                                    Skill Analysis
                                </h3>

                            </div>


                            <div className="skill-analysis-summary">

                                <strong>
                                    {skillAnalysis.coverage}%
                                </strong>

                                <span>
                                    of required skills found in your profile
                                </span>

                            </div>


                            {/* MATCHED SKILLS */}

                            {skillAnalysis.matched.length > 0 && (

                                <div className="analysis-skill-group">

                                    <h4>
                                        Matched Skills
                                    </h4>


                                    <div className="analysis-skill-list">

                                        {skillAnalysis.matched.map(
                                            (skill, index) => (

                                                <span
                                                    className="matched-skill"
                                                    key={`${skill}-${index}`}
                                                >

                                                    <CheckCircle2 size={14} />

                                                    {skill}

                                                </span>

                                            )
                                        )}

                                    </div>

                                </div>

                            )}


                            {/* SKILL GAP */}

                            {skillAnalysis.missing.length > 0 && (

                                <div className="analysis-skill-group">

                                    <h4>
                                        Skill Gap
                                    </h4>


                                    <div className="analysis-skill-list">

                                        {skillAnalysis.missing.map(
                                            (skill, index) => (

                                                <span
                                                    className="missing-skill"
                                                    key={`${skill}-${index}`}
                                                >

                                                    <AlertCircle size={14} />

                                                    {skill}

                                                </span>

                                            )
                                        )}

                                    </div>

                                    <p className="skill-gap-note">
                                        These required skills are not currently listed in your profile.
                                    </p>

                                </div>

                            )}


                            {skills.length === 0 && (

                                <p className="no-skill-data">
                                    No skill requirements were provided for this internship.
                                </p>

                            )}

                        </section>


                        {/* =================================================
                            PROFILE FIT
                        ================================================= */}

                        <section className="analysis-section">

                            <div className="analysis-section-title">

                                <Info size={19} />

                                <h3>
                                    Profile Fit
                                </h3>

                            </div>


                            <div className="fit-grid">


                                <div className="fit-item">

                                    <span>
                                        Preferred Role
                                    </span>

                                    <strong>
                                        {student?.preferredRole ||
                                            student?.preferred_role ||
                                            "Not specified"}
                                    </strong>

                                </div>


                                <div className="fit-item">

                                    <span>
                                        Internship Domain
                                    </span>

                                    <strong>
                                        {domain}
                                    </strong>

                                </div>


                                <div className="fit-item">

                                    <span>
                                        Preferred Location
                                    </span>

                                    <strong>
                                        {student?.preferredLocation ||
                                            student?.preferred_location ||
                                            student?.location ||
                                            "Not specified"}
                                    </strong>

                                </div>


                                <div className="fit-item">

                                    <span>
                                        Work Mode
                                    </span>

                                    <strong>
                                        {workMode}
                                    </strong>

                                </div>


                            </div>

                        </section>


                    </div>

                </div>

            )}

        </div>

    );

}