from __future__ import annotations

from typing import Any, Dict, List, Optional, Tuple
from math import radians, sin, cos, sqrt, atan2

import numpy as np
import requests
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


# ============================================================
# Model
# ============================================================

MODEL_NAME = "all-MiniLM-L6-v2"

_model: Optional[SentenceTransformer] = None


def get_model() -> SentenceTransformer:
    """
    Load the embedding model once and reuse it.
    """
    global _model

    if _model is None:
        _model = SentenceTransformer(MODEL_NAME, device="cpu")
    return _model


# ============================================================
# Skill normalization
# ============================================================

SKILL_ALIASES = {
    "ml": "machine learning",
    "ai/ml": "machine learning",
    "machine learning": "machine learning",

    "js": "javascript",
    "javascript": "javascript",

    "node": "node.js",
    "nodejs": "node.js",
    "node.js": "node.js",

    "reactjs": "react",
    "react.js": "react",
    "react": "react",

    "cpp": "c++",
    "c++": "c++",
}


def normalize_skill(skill: Any) -> str:
    value = str(skill).strip().lower()
    return SKILL_ALIASES.get(value, value)


def normalize_skills(skills: Any) -> List[str]:
    if not skills:
        return []

    if isinstance(skills, str):
        skills = [item.strip() for item in skills.split(",")]

    if not isinstance(skills, list):
        return []

    return [
        normalize_skill(skill)
        for skill in skills
        if str(skill).strip()
    ]


# ============================================================
# Generic helpers
# ============================================================

def is_missing(value: Any) -> bool:
    if value is None:
        return True

    try:
        return bool(pd_isna(value))
    except Exception:
        return False


def pd_isna(value: Any) -> bool:
    """
    Small helper so pandas is not required by the API layer.
    """
    try:
        result = np.isnan(value)
        return bool(result)
    except Exception:
        return False


def safe_float(value: Any) -> Optional[float]:
    if value is None:
        return None

    try:
        if isinstance(value, float) and np.isnan(value):
            return None

        return float(value)
    except (TypeError, ValueError):
        return None


# ============================================================
# Work mode
# ============================================================

def normalize_work_mode(mode: Any) -> Optional[str]:
    if mode is None:
        return None

    value = str(mode).strip().lower()

    if value in {"remote", "work from home"}:
        return "Remote"

    if value == "hybrid":
        return "Hybrid"

    if value in {"on_site", "on-site", "onsite", "on site"}:
        return "On-site"

    return str(mode).strip()


def calculate_work_mode_score(
    internship_mode: Optional[str],
    student_mode: Optional[str]
) -> float:

    if not student_mode:
        return np.nan

    student_mode = normalize_work_mode(student_mode)
    internship_mode = normalize_work_mode(internship_mode)

    if student_mode == "Any":
        return 100.0

    if internship_mode == student_mode:
        return 100.0

    if (
        student_mode in {"Remote", "On-site"}
        and internship_mode == "Hybrid"
    ):
        return 50.0

    return 0.0


# ============================================================
# Eligibility
# ============================================================

def is_eligible(
    internship_eligibility: Any,
    student_education: Any
) -> bool:

    if internship_eligibility is None:
        return True

    eligibility = (
        str(internship_eligibility)
        .strip()
        .lower()
    )

    education = (
        str(student_education or "")
        .strip()
        .lower()
    )

    if not eligibility:
        return True

    # Same logic as notebook:
    # both undergraduate and postgraduate accepted
    if (
        "undergraduate" in eligibility
        and "postgraduate" in eligibility
    ):
        return True

    if education and education in eligibility:
        return True

    return False


# ============================================================
# Internship type score
# ============================================================

def normalize_internship_type(value: Any) -> Optional[str]:
    if value is None:
        return None

    normalized = str(value).strip().lower()

    if normalized in {"technical", "tech"}:
        return "Technical"

    if normalized in {
        "non technical",
        "non-technical",
        "nontechnical"
    }:
        return "Non-Technical"

    if normalized == "any":
        return "Any"

    return str(value).strip()


def calculate_internship_type_score(
    internship_type: Any,
    student_type: Any
) -> float:

    if internship_type is None:
        return np.nan

    student_type = normalize_internship_type(student_type)
    internship_type = normalize_internship_type(internship_type)

    if student_type == "Any":
        return 100.0

    if internship_type == student_type:
        return 100.0

    return 0.0


# ============================================================
# Domain score
# ============================================================

def calculate_domain_score(
    internship_domain: Any,
    student_domain: Any
) -> float:

    if not student_domain:
        return np.nan

    student_domain = str(student_domain).strip()

    if student_domain == "Any Domain":
        return 100.0

    return (
        100.0
        if str(internship_domain).strip() == student_domain
        else 0.0
    )


# ============================================================
# Location / Geocoding
# ============================================================

NOMINATIM_URL = (
    "https://nominatim.openstreetmap.org/search"
)

HEADERS = {
    "User-Agent": (
        "InternSetu/1.0 "
        "(internship recommendation project)"
    )
}


def geocode_city(
    city: Any
) -> Tuple[Optional[float], Optional[float]]:

    if city is None:
        return None, None

    city = str(city).strip()

    if not city:
        return None, None

    if city.lower() in {
        "remote",
        "work from home"
    }:
        return None, None

    try:
        response = requests.get(
            NOMINATIM_URL,
            params={
                "q": f"{city}, India",
                "format": "json",
                "limit": 1
            },
            headers=HEADERS,
            timeout=10
        )

        response.raise_for_status()

        results = response.json()

        if not results:
            return None, None

        return (
            float(results[0]["lat"]),
            float(results[0]["lon"])
        )

    except (
        requests.RequestException,
        ValueError,
        KeyError,
        TypeError
    ):
        return None, None


def haversine_distance(
    lat1: Optional[float],
    lon1: Optional[float],
    lat2: Optional[float],
    lon2: Optional[float]
) -> float:

    if None in (lat1, lon1, lat2, lon2):
        return np.nan

    R = 6371

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    return R * c


def distance_to_score(
    distance: Any
) -> float:

    if distance is None:
        return np.nan

    try:
        if np.isnan(distance):
            return np.nan
    except TypeError:
        return np.nan

    distance = max(float(distance), 0.0)

    # Exact notebook formula
    score = 100 * np.exp(
        -distance / 500
    )

    return round(score, 2)


# ============================================================
# Stipend
# ============================================================

def calculate_stipend_score(
    stipend_min: Any,
    student_min_stipend: Any
) -> float:

    if stipend_min is None:
        return np.nan

    try:
        if np.isnan(stipend_min):
            return np.nan
    except TypeError:
        pass

    if student_min_stipend is None:
        return np.nan

    try:
        stipend_min = float(stipend_min)
        student_min_stipend = float(
            student_min_stipend
        )
    except (TypeError, ValueError):
        return np.nan

    if stipend_min >= student_min_stipend:
        return 100.0

    if student_min_stipend <= 0:
        return 0.0

    score = (
        stipend_min
        / student_min_stipend
    ) * 100

    return round(
        max(0.0, min(score, 100.0)),
        2
    )


# ============================================================
# Duration
# ============================================================

def parse_duration_months(
    duration: Any
) -> Optional[float]:

    if duration is None:
        return None

    if isinstance(duration, (int, float)):
        return float(duration)

    text = str(duration).strip().lower()

    if not text:
        return None

    # Examples:
    # "3 Months"
    # "1 Month"
    # "6 months"
    import re

    match = re.search(
        r"(\d+(?:\.\d+)?)",
        text
    )

    if not match:
        return None

    return float(match.group(1))


def calculate_duration_score(
    internship_duration: Any,
    preferred_duration: Any
) -> float:

    internship_duration = parse_duration_months(
        internship_duration
    )

    preferred_duration = parse_duration_months(
        preferred_duration
    )

    if (
        internship_duration is None
        or preferred_duration is None
    ):
        return np.nan

    if internship_duration == preferred_duration:
        return 100.0

    difference = abs(
        internship_duration
        - preferred_duration
    )

    score = 100 / (1 + difference)

    return round(score, 2)


# ============================================================
# Semantic Skill Matching
# ============================================================

def calculate_skill_score(
    student_skills: List[str],
    internship_skills: List[str]
) -> float:

    if not student_skills or not internship_skills:
        return 0.0

    model = get_model()

    student_embeddings = model.encode(
        student_skills,
        normalize_embeddings=True
    )

    internship_embeddings = model.encode(
        internship_skills,
        normalize_embeddings=True
    )

    similarity_matrix = cosine_similarity(
        student_embeddings,
        internship_embeddings
    )

    best_matches = similarity_matrix.max(
        axis=1
    )

    return round(
        float(np.mean(best_matches)),
        6
    )


def calculate_role_similarity(
    student_role: Any,
    internship_roles: List[str]
) -> List[float]:

    if not student_role:
        return [
            np.nan for _ in internship_roles
        ]

    model = get_model()

    student_role_embedding = model.encode(
        [str(student_role)],
        normalize_embeddings=True
    )

    internship_role_embeddings = model.encode(
        [
            str(role or "")
            for role in internship_roles
        ],
        normalize_embeddings=True
    )

    similarities = cosine_similarity(
        student_role_embedding,
        internship_role_embeddings
    )[0]

    return [
        round(float(value * 100), 2)
        for value in similarities
    ]


def calculate_interest_scores(
    interest_text: Any,
    descriptions: List[str]
) -> List[float]:

    if not interest_text:
        return [
            np.nan for _ in descriptions
        ]

    model = get_model()

    student_interest_embedding = model.encode(
        [str(interest_text)],
        normalize_embeddings=True
    )

    description_embeddings = model.encode(
        [
            str(description or "")
            for description in descriptions
        ],
        normalize_embeddings=True
    )

    similarities = cosine_similarity(
        student_interest_embedding,
        description_embeddings
    )[0]

    return [
        round(float(value * 100), 2)
        for value in similarities
    ]


# ============================================================
# Final score
# ============================================================

FINAL_SCORE_WEIGHTS = {
    "skill_match_score_100": 0.25,
    "role_similarity_100": 0.15,
    "domain_match_100": 0.15,
    "interest_score_100": 0.15,
    "work_mode_match_100": 0.10,
    "location_score_100": 0.05,
    "stipend_score_100": 0.05,
    "duration_score_100": 0.05,
    "internship_type_score_100": 0.05
}


def calculate_final_score(
    candidate: Dict[str, Any]
) -> float:

    weighted_sum = 0.0
    total_available_weight = 0.0

    for feature, weight in FINAL_SCORE_WEIGHTS.items():

        value = candidate.get(feature)

        if value is None:
            continue

        try:
            if np.isnan(value):
                continue
        except TypeError:
            pass

        try:
            value = float(value)
        except (TypeError, ValueError):
            continue

        weighted_sum += (
            value * weight
        )

        total_available_weight += weight

    if total_available_weight == 0:
        return 0.0

    score = (
        weighted_sum
        / total_available_weight
    )

    return round(score, 2)


# ============================================================
# Feedback Personalization
# ============================================================

def build_feedback_maps(
    feedback_history: List[Dict[str, Any]]
) -> Tuple[
    Dict[str, float],
    Dict[str, float]
]:

    domain_feedback: Dict[str, float] = {}
    role_feedback: Dict[str, float] = {}

    for feedback in feedback_history:

        value = feedback.get(
            "feedback"
        )

        if value == "like":
            feedback_value = 1.0

        elif value == "dislike":
            feedback_value = -1.0

        else:
            continue

        domain = feedback.get("domain")
        role = feedback.get("role")

        if domain:
            domain_feedback[domain] = (
                domain_feedback.get(
                    domain,
                    0.0
                )
                + feedback_value
            )

        if role:
            role_feedback[role] = (
                role_feedback.get(
                    role,
                    0.0
                )
                + feedback_value
            )

    return domain_feedback, role_feedback


def calculate_feedback_score(
    candidate: Dict[str, Any],
    domain_feedback: Dict[str, float],
    role_feedback: Dict[str, float]
) -> float:

    role_score = role_feedback.get(
        candidate.get("role"),
        0.0
    )

    domain_score = domain_feedback.get(
        candidate.get("domain"),
        0.0
    )

    # Exact notebook logic:
    # 0.6 role + 0.4 domain
    return (
        0.6 * role_score
        + 0.4 * domain_score
    )


def feedback_to_adjustment(
    feedback_score: float
) -> float:

    # Exact notebook influence
    feedback_influence = 10

    adjustment = (
        np.tanh(
            feedback_score / 3
        )
        * feedback_influence
    )

    return round(
        float(adjustment),
        2
    )


# ============================================================
# Recommendation Reasons
# ============================================================

def generate_reasons(
    candidate: Dict[str, Any]
) -> List[str]:

    reasons: List[str] = []

    skill_score = safe_float(
        candidate.get(
            "skill_match_score_100"
        )
    )

    role_score = safe_float(
        candidate.get(
            "role_similarity_100"
        )
    )

    domain_score = safe_float(
        candidate.get(
            "domain_match_100"
        )
    )

    work_mode_score = safe_float(
        candidate.get(
            "work_mode_match_100"
        )
    )

    location_score = safe_float(
        candidate.get(
            "location_score_100"
        )
    )

    stipend_score = safe_float(
        candidate.get(
            "stipend_score_100"
        )
    )

    duration_score = safe_float(
        candidate.get(
            "duration_score_100"
        )
    )

    internship_type_score = safe_float(
        candidate.get(
            "internship_type_score_100"
        )
    )

    interest_score = safe_float(
        candidate.get(
            "interest_score_100"
        )
    )

    if (
        skill_score is not None
        and skill_score >= 60
    ):
        reasons.append(
            "Strong skill match"
        )

    elif (
        skill_score is not None
        and skill_score >= 40
    ):
        reasons.append(
            "Good skill match"
        )

    if (
        role_score is not None
        and role_score >= 50
    ):
        reasons.append(
            "Strong role similarity"
        )

    if (
        domain_score is not None
        and domain_score >= 100
    ):
        reasons.append(
            "Preferred domain match"
        )

    if (
        work_mode_score is not None
        and work_mode_score >= 100
    ):
        reasons.append(
            "Preferred work mode"
        )

    if (
        location_score is not None
        and location_score >= 70
    ):
        reasons.append(
            "Good location match"
        )

    if (
        stipend_score is not None
        and stipend_score >= 80
    ):
        reasons.append(
            "Meets stipend preference"
        )

    if (
        duration_score is not None
        and duration_score >= 80
    ):
        reasons.append(
            "Good duration match"
        )

    if (
        internship_type_score is not None
        and internship_type_score >= 100
    ):
        reasons.append(
            "Preferred internship type"
        )

    if (
        interest_score is not None
        and interest_score >= 50
    ):
        reasons.append(
            "Strong interest/description similarity"
        )

    if not reasons:
        reasons.append(
            "Relevant based on overall profile"
        )

    return reasons


# ============================================================
# Main recommendation function
# ============================================================

def recommend_internships(
    student: Dict[str, Any],
    internships: List[Dict[str, Any]],
    feedback_history: Optional[
        List[Dict[str, Any]]
    ] = None
) -> List[Dict[str, Any]]:
    """
    Run the complete InternSetu recommendation pipeline.

    Input:
        student:
            Student profile + preferences from DB.

        internships:
            Internship records from MySQL.

        feedback_history:
            Previous feedback records.

    Output:
        Top 5 personalized recommendations.
    """

    if feedback_history is None:
        feedback_history = []


    # ========================================================
    # 1. Student data
    # ========================================================

    preferences = (
        student.get("preferences") or {}
    )

    student_skills = normalize_skills(
        student.get("skills")
    )

    student_role = (
        student.get("preferredRole")
        or ""
    )

    student_education = (
        student.get("education")
        or ""
    )

    student_location = (
        preferences.get(
            "preferredCity"
        )
        or student.get("preferredLocation")
        or student.get("location")
        or ""
    )

    student_domain = (
        preferences.get(
            "preferred_domain"
        )
        or preferences.get(
            "preferredDomain"
        )
        or ""
    )

    student_work_mode = (
        preferences.get(
            "workMode"
        )
        or ""
    )

    student_internship_type = (
        preferences.get(
            "internshipType"
        )
        or ""
    )

    student_min_stipend = (
        preferences.get(
            "minimum_stipend"
        )
        or preferences.get(
            "minStipend"
        )
        or preferences.get(
            "stipendPreference"
        )
    )

    student_duration = (
        preferences.get(
            "preferred_duration"
        )
        or preferences.get(
            "preferredDuration"
        )
        or preferences.get(
            "duration"
        )
    )

    location_preference = (
        preferences.get(
            "locationPreference"
        )
        or ""
    )

    # Optional. Student schema currently does not
    # have a dedicated interest-text field.
    student_interest = (
        student.get("interest")
        or preferences.get("interest")
        or ""
    )


    # ========================================================
    # 2. Normalize internship records
    # ========================================================

    normalized_internships = []

    for internship in internships:

        company_data = (
            internship.get("company")
            if isinstance(
                internship.get("company"),
                dict
            )
            else {}
        )

        skills = normalize_skills(
            internship.get("skills")
        )

        normalized_internships.append({
            "internship_id":
                internship.get("id"),

            "role":
                internship.get("title")
                or "",

            "company":
                company_data.get(
                    "companyName",
                    ""
                ),

            "location":
                internship.get("location")
                or "",

            "skills":
                skills,

            "eligibility":
                internship.get(
                    "eligibility"
                ),

            "stipend":
                internship.get(
                    "stipend"
                ),

            "duration":
                internship.get(
                    "duration"
                ),

            "deadline":
                internship.get(
                    "deadline"
                ),

            "description":
                internship.get(
                    "description"
                )
                or "",

            "domain":
                internship.get(
                    "domain"
                )
                or "",

            "work_mode":
                normalize_work_mode(
                    internship.get(
                        "workMode"
                    )
                ),

            "internship_type":
                normalize_internship_type(
                    internship.get(
                        "internshipType"
                    )
                ),

            "companyId":
                internship.get(
                    "companyId"
                )
        })


    # ========================================================
    # 3. Eligibility filtering
    # ========================================================

    eligible_internships = [
        internship
        for internship
        in normalized_internships
        if is_eligible(
            internship.get(
                "eligibility"
            ),
            student_education
        )
    ]

    if not eligible_internships:
        return []


    # ========================================================
    # 4. Explicit preferences
    # ========================================================

    has_explicit_preferences = any([
        student_internship_type
        not in [None, "", "Any"],

        student_work_mode
        not in [None, "", "Any"],

        student_domain
        not in [None, "", "Any Domain"],

        location_preference
        not in [None, "", "Any City"],

        student_min_stipend
        not in [None, ""],

        student_duration
        not in [None, ""]
    ])


    # ========================================================
    # 5. Precompute role scores
    # ========================================================

    role_scores = calculate_role_similarity(
        student_role,
        [
            internship["role"]
            for internship
            in eligible_internships
        ]
    )


    # ========================================================
    # 6. Precompute interest scores
    # ========================================================

    interest_scores = calculate_interest_scores(
        student_interest,
        [
            internship["description"]
            for internship
            in eligible_internships
        ]
    )


    # ========================================================
    # 7. Location coordinates
    # ========================================================

    unique_locations = sorted({
        internship["location"].strip()
        for internship
        in eligible_internships
        if internship["location"]
    })

    location_coordinates = {}

    for location in unique_locations:

        if location.lower() in {
            "remote",
            "work from home"
        }:
            location_coordinates[
                location
            ] = (None, None)

            continue

        location_coordinates[
            location
        ] = geocode_city(location)


    # Student coordinates only needed when
    # location-based scoring is relevant.
    student_lat, student_lon = geocode_city(
        student_location
    )


    # ========================================================
    # 8. Calculate feature scores
    # ========================================================

    for index, internship in enumerate(
        eligible_internships
    ):

        # ----------------------------------------------------
        # Skill
        # ----------------------------------------------------

        skill_raw = calculate_skill_score(
            student_skills,
            internship["skills"]
        )

        internship[
            "skill_match_score_100"
        ] = round(
            skill_raw * 100,
            2
        )


        # ----------------------------------------------------
        # Role
        # ----------------------------------------------------

        internship[
            "role_similarity_100"
        ] = role_scores[index]


        # ----------------------------------------------------
        # Domain
        # ----------------------------------------------------

        internship[
            "domain_match_100"
        ] = calculate_domain_score(
            internship["domain"],
            student_domain
        )


        # ----------------------------------------------------
        # Work mode
        # ----------------------------------------------------

        internship[
            "work_mode_match_100"
        ] = calculate_work_mode_score(
            internship["work_mode"],
            student_work_mode
        )


        # ----------------------------------------------------
        # Location
        # ----------------------------------------------------

        # Remote / Work From Home is a perfect location match
        # because the student is not required to be physically
        # present in the internship city.
        internship_location = str(
            internship.get("location") or ""
        ).strip().lower()

        if internship_location in {
            "remote",
            "work from home"
        }:
            internship[
                "location_score_100"
            ] = 100.0

        elif (
            student_lat is not None
            and student_lon is not None
            and internship["location"]
        ):

            internship_lat, internship_lon = (
                location_coordinates.get(
                    internship["location"],
                    (None, None)
                )
            )

            distance = haversine_distance(
                student_lat,
                student_lon,
                internship_lat,
                internship_lon
            )

            internship["distance_km"] = (
                round(float(distance), 2)
                if not np.isnan(distance)
                else None
            )

            internship[
                "location_score_100"
            ] = distance_to_score(
                distance
            )

        else:
            internship[
                "location_score_100"
            ] = np.nan


        # ----------------------------------------------------
        # Stipend
        # ----------------------------------------------------

        # DB currently stores stipend as a string.
        # Extract the first numeric value when possible.
        stipend_min = extract_first_number(
            internship["stipend"]
        )

        internship[
            "stipend_score_100"
        ] = calculate_stipend_score(
            stipend_min,
            extract_first_number(
                student_min_stipend
            )
        )


        # ----------------------------------------------------
        # Duration
        # ----------------------------------------------------

        internship[
            "duration_score_100"
        ] = calculate_duration_score(
            internship["duration"],
            student_duration
        )


        # ----------------------------------------------------
        # Internship type
        # ----------------------------------------------------

        internship[
            "internship_type_score_100"
        ] = calculate_internship_type_score(
            internship[
                "internship_type"
            ],
            student_internship_type
        )


        # ----------------------------------------------------
        # Interest
        # ----------------------------------------------------

        internship[
            "interest_score_100"
        ] = interest_scores[index]


    # ========================================================
    # 9. Preference scores
    # ========================================================

    preference_columns = [
        "internship_type_score_100",
        "work_mode_match_100",
        "domain_match_100",
        "location_score_100",
        "stipend_score_100",
        "duration_score_100"
    ]

    for internship in eligible_internships:

        values = []

        for column in preference_columns:

            value = internship.get(column)

            if value is None:
                continue

            try:
                if np.isnan(value):
                    continue
            except TypeError:
                pass

            values.append(
                float(value)
            )

        if values:
            internship[
                "preference_score_100"
            ] = round(
                float(np.mean(values)),
                2
            )
        else:
            internship[
                "preference_score_100"
            ] = 0.0


    # ========================================================
    # 10. Candidate selection
    # ========================================================

    if not has_explicit_preferences:

        candidate_internships = (
            eligible_internships.copy()
        )

    else:

        preference_top = sorted(
            eligible_internships,
            key=lambda item:
                item.get(
                    "preference_score_100",
                    0
                ),
            reverse=True
        )[:80]

        skill_top = sorted(
            eligible_internships,
            key=lambda item:
                item.get(
                    "skill_match_score_100",
                    0
                ),
            reverse=True
        )[:20]

        combined = (
            preference_top
            + skill_top
        )

        seen_ids = set()
        candidate_internships = []

        for internship in combined:

            internship_id = internship.get(
                "internship_id"
            )

            if internship_id in seen_ids:
                continue

            seen_ids.add(
                internship_id
            )

            candidate_internships.append(
                internship
            )

        if len(candidate_internships) > 100:

            candidate_internships = sorted(
                candidate_internships,
                key=lambda item:
                    item.get(
                        "preference_score_100",
                        0
                    ),
                reverse=True
            )[:100]


    # ========================================================
    # 11. Final weighted score
    # ========================================================

    for internship in candidate_internships:

        internship[
            "final_score_100"
        ] = calculate_final_score(
            internship
        )


    # ========================================================
    # 12. Base ranking
    # ========================================================

    candidate_internships.sort(
        key=lambda item:
            item.get(
                "final_score_100",
                0
            ),
        reverse=True
    )


    # ========================================================
    # 13. Feedback personalization
    # ========================================================

    (
        domain_feedback,
        role_feedback
    ) = build_feedback_maps(
        feedback_history
    )

    for internship in candidate_internships:

        feedback_score = (
            calculate_feedback_score(
                internship,
                domain_feedback,
                role_feedback
            )
        )

        internship[
            "feedback_personalization"
        ] = feedback_score

        internship[
            "feedback_adjustment"
        ] = feedback_to_adjustment(
            feedback_score
        )

        internship[
            "personalized_score_100"
        ] = round(
            max(
                0.0,
                min(
                    100.0,
                    internship[
                        "final_score_100"
                    ]
                    + internship[
                        "feedback_adjustment"
                    ]
                )
            ),
            2
        )


    # ========================================================
    # 14. Personalized ranking
    # ========================================================

    candidate_internships.sort(
        key=lambda item:
            item.get(
                "personalized_score_100",
                0
            ),
        reverse=True
    )


    # ========================================================
    # 15. Top 5
    # ========================================================

    top_5 = candidate_internships[:5]


    # ========================================================
    # 16. Final output formatting
    # ========================================================

    results = []

    for rank, internship in enumerate(
        top_5,
        start=1
    ):

        result = {
            "rank":
                rank,

            "internship_id":
                internship.get(
                    "internship_id"
                ),

            "role":
                internship.get(
                    "role"
                ),

            "company":
                internship.get(
                    "company"
                ),

            "location":
                internship.get(
                    "location"
                ),

            "location_score_100":
                internship.get(
                    "location_score_100"
                ),

            "distance_km":
                internship.get(
                    "distance_km"
                ),

            "work_mode":
                internship.get(
                    "work_mode"
                ),

            "domain":
                internship.get(
                    "domain"
                ),

            "internship_type":
                internship.get(
                    "internship_type"
                ),

            "stipend":
                internship.get(
                    "stipend"
                ),

            "duration":
                internship.get(
                    "duration"
                ),

            "eligibility":
                internship.get(
                    "eligibility"
                ),

            "deadline":
                internship.get(
                    "deadline"
                ),

            "final_score_100":
                internship.get(
                    "final_score_100"
                ),

            "feedback_personalization":
                internship.get(
                    "feedback_personalization"
                ),

            "personalized_score_100":
                internship.get(
                    "personalized_score_100"
                ),

            "recommendation_reasons":
                generate_reasons(
                    internship
                )
        }

        results.append(result)

    return results


# ============================================================
# Stipend helper
# ============================================================

def extract_first_number(
    value: Any
) -> Optional[float]:

    if value is None:
        return None

    if isinstance(value, (int, float)):

        try:
            if np.isnan(value):
                return None
        except TypeError:
            pass

        return float(value)

    import re

    text = str(value)

    match = re.search(
        r"\d+(?:\.\d+)?",
        text.replace(",", "")
    )

    if not match:
        return None

    try:
        return float(match.group(0))
    except ValueError:
        return None