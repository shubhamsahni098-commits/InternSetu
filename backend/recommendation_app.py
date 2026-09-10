from flask import Flask, request, jsonify
import re
import numpy as np

from recommendation_engine import recommend_internships, get_model


app = Flask(__name__)


# ============================================================
# Health Check
# ============================================================

@app.get("/health")
def health():
    return jsonify({
        "success": True,
        "message": "Recommendation service is running"
    })


# ============================================================
# Recommendation Endpoint
# ============================================================

@app.post("/recommend")
def recommend():

    try:
        data = request.get_json(silent=True) or {}

        student = data.get("student")
        internships = data.get("internships", [])
        feedback_history = data.get(
            "feedback_history",
            []
        )

        if not student:
            return jsonify({
                "success": False,
                "message": "Student data is required"
            }), 400

        if not isinstance(internships, list):
            return jsonify({
                "success": False,
                "message": "Internships must be an array"
            }), 400

        if not isinstance(feedback_history, list):
            return jsonify({
                "success": False,
                "message": "Feedback history must be an array"
            }), 400

        recommendations = recommend_internships(
            student=student,
            internships=internships,
            feedback_history=feedback_history
        )

        return jsonify({
            "success": True,
            "message": "Recommendations generated successfully",
            "count": len(recommendations),
            "recommendations": recommendations
        })

    except Exception as error:

        print(
            "Recommendation engine error:",
            repr(error)
        )

        return jsonify({
            "success": False,
            "message": "Failed to generate recommendations",
            "error": str(error)
        }), 500


# ============================================================
# Resume Skills Section Extraction
# ============================================================

SKILLS_SECTION_HEADINGS = [
    "skills",
    "technical skills",
    "technical skill",
    "skills & technologies",
    "skills and technologies",
    "technical skills & technologies",
    "core skills",
    "key skills",
    "programming skills",
    "technical expertise",
]


STOP_SECTION_HEADINGS = [
    "education",
    "academic background",
    "experience",
    "work experience",
    "professional experience",
    "internship",
    "internships",
    "projects",
    "academic projects",
    "personal projects",
    "certifications",
    "certification",
    "achievements",
    "achievement",
    "awards",
    "award",
    "languages",
    "interests",
    "hobbies",
    "summary",
    "professional summary",
    "objective",
    "career objective",
    "profile",
    "contact",
    "extra curricular",
    "extracurricular",
    "activities",
    "declaration",
    "references",
]


# ============================================================
# Heading Normalization
# ============================================================

def normalize_heading(text):
    """
    Normalize a possible resume section heading.
    """

    text = str(text).strip().lower()

    text = re.sub(
        r"^[\s•\-–—:|]+",
        "",
        text
    )

    text = re.sub(
        r"[\s:|]+$",
        "",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text


# ============================================================
# Extract ONLY Skills Section
# ============================================================

def extract_skills_section(resume_text):
    """
    Extract ONLY the content between the Skills heading
    and the next major resume section heading.

    Skills are NOT inferred from:
    - Projects
    - Experience
    - Education
    - Summary
    - Certifications
    - Other sections
    """

    if not resume_text:
        return ""

    lines = resume_text.splitlines()

    skills_start = None

    # --------------------------------------------------------
    # Find Skills heading
    # --------------------------------------------------------

    for index, line in enumerate(lines):

        normalized = normalize_heading(line)

        if normalized in SKILLS_SECTION_HEADINGS:
            skills_start = index + 1
            break

    if skills_start is None:
        return ""

    # --------------------------------------------------------
    # Find next major section
    # --------------------------------------------------------

    skills_end = len(lines)

    for index in range(
        skills_start,
        len(lines)
    ):

        normalized = normalize_heading(
            lines[index]
        )

        if normalized in STOP_SECTION_HEADINGS:
            skills_end = index
            break

    # --------------------------------------------------------
    # Get Skills section lines
    # --------------------------------------------------------

    skills_lines = lines[
        skills_start:skills_end
    ]

    skills_lines = [
        line.strip()
        for line in skills_lines
        if line.strip()
    ]

    return "\n".join(skills_lines)


# ============================================================
# Split Resume Skills
# ============================================================

def split_resume_skills(skills_text):
    """
    Convert the extracted Skills section into
    individual skill phrases.

    This function ONLY processes the Skills section.
    """

    if not skills_text:
        return []

    text = skills_text.replace(
        "\r",
        "\n"
    )

    # --------------------------------------------------------
    # Convert common bullet characters into new lines
    # --------------------------------------------------------

    text = re.sub(
        r"[•▪●◦◆◇►▸➤]",
        "\n",
        text
    )

    lines = text.split("\n")

    skills = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        # ----------------------------------------------------
        # Remove bullet / numbering formats
        # ----------------------------------------------------

        line = re.sub(
            r"^[\-\*\d\.\)\(]+\s*",
            "",
            line
        )

        if not line:
            continue

        # ----------------------------------------------------
        # Split comma / semicolon / pipe separated skills
        # ----------------------------------------------------

        parts = re.split(
            r"[,;|]",
            line
        )

        for part in parts:

            skill = part.strip()

            if skill:
                skills.append(skill)

    # --------------------------------------------------------
    # Remove duplicate extracted skills
    # --------------------------------------------------------

    unique_skills = []

    seen = set()

    for skill in skills:

        key = skill.lower().strip()

        if key not in seen:
            seen.add(key)
            unique_skills.append(skill)

    return unique_skills


# ============================================================
# Semantic Skill Matching
# ============================================================

def semantic_match_skills(
    extracted_skills,
    predefined_skills,
    threshold=0.70
):
    """
    Match resume-extracted skills against the
    canonical predefined skills using
    SentenceTransformer embeddings.

    Example:

        JS
        ↓
        JavaScript

        Node
        ↓
        Node.js

    Only matches >= threshold are accepted.
    """

    if not extracted_skills:
        return []

    if not predefined_skills:
        return []

    # --------------------------------------------------------
    # Reuse recommendation engine's SentenceTransformer
    # --------------------------------------------------------

    model = get_model()

    # --------------------------------------------------------
    # Encode extracted resume skills
    # --------------------------------------------------------

    resume_embeddings = model.encode(
        extracted_skills,
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    # --------------------------------------------------------
    # Encode canonical predefined skills
    # --------------------------------------------------------

    predefined_embeddings = model.encode(
        predefined_skills,
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    # --------------------------------------------------------
    # Cosine similarity
    #
    # Since embeddings are normalized:
    #
    # cosine similarity = dot product
    # --------------------------------------------------------

    similarity_matrix = np.matmul(
        resume_embeddings,
        predefined_embeddings.T
    )

    matched_skills = []

    # --------------------------------------------------------
    # Find best match for every extracted skill
    # --------------------------------------------------------

    for resume_index, resume_skill in enumerate(
        extracted_skills
    ):

        similarities = similarity_matrix[
            resume_index
        ]

        best_index = int(
            np.argmax(similarities)
        )

        best_score = float(
            similarities[best_index]
        )

        matched_skill = predefined_skills[
            best_index
        ]

        # ----------------------------------------------------
        # Accept only sufficiently similar matches
        # ----------------------------------------------------

        if best_score >= threshold:

            matched_skills.append({
                "resume_skill": resume_skill,
                "matched_skill": matched_skill,
                "similarity_score": round(
                    best_score * 100,
                    2
                )
            })

    # --------------------------------------------------------
    # Remove duplicate canonical skills
    #
    # Example:
    #
    # JS         -> JavaScript
    # JavaScript -> JavaScript
    #
    # Keep only highest similarity.
    # --------------------------------------------------------

    best_matches = {}

    for match in matched_skills:

        canonical_skill = match[
            "matched_skill"
        ]

        if (
            canonical_skill not in best_matches
            or match["similarity_score"]
            > best_matches[
                canonical_skill
            ]["similarity_score"]
        ):
            best_matches[
                canonical_skill
            ] = match

    return list(
        best_matches.values()
    )


# ============================================================
# Resume Skill Extraction Endpoint
# ============================================================

@app.post("/extract-resume-skills")
def extract_resume_skills():

    try:

        data = request.get_json(
            silent=True
        ) or {}

        resume_text = data.get(
            "resume_text",
            ""
        )

        # ----------------------------------------------------
        # Node backend sends the 162 canonical skills
        # from skills.constants.ts
        # ----------------------------------------------------

        predefined_skills = data.get(
            "predefined_skills",
            []
        )

        # ----------------------------------------------------
        # Validation
        # ----------------------------------------------------

        if not resume_text:
            return jsonify({
                "success": False,
                "message": "Resume text is required"
            }), 400

        if not isinstance(
            predefined_skills,
            list
        ):
            return jsonify({
                "success": False,
                "message":
                    "predefined_skills must be an array"
            }), 400

        if not predefined_skills:
            return jsonify({
                "success": False,
                "message":
                    "Predefined skills are required"
            }), 400

        # ----------------------------------------------------
        # STEP 1
        # Extract ONLY Skills section
        # ----------------------------------------------------

        skills_section = extract_skills_section(
            resume_text
        )

        # ----------------------------------------------------
        # Skills section not found
        # ----------------------------------------------------

        if not skills_section:

            return jsonify({
                "success": True,
                "message":
                    "Skills section not found in resume",
                "skills_section_found": False,
                "extracted_skills": [],
                "matched_skills": [],
                "skills": []
            })

        # ----------------------------------------------------
        # STEP 2
        # Split Skills section
        # ----------------------------------------------------

        extracted_skills = split_resume_skills(
            skills_section
        )

        # ----------------------------------------------------
        # STEP 3
        # Semantic matching
        # ----------------------------------------------------

        matched_skills = semantic_match_skills(
            extracted_skills=extracted_skills,
            predefined_skills=predefined_skills,
            threshold=0.70
        )

        # ----------------------------------------------------
        # STEP 4
        # Get canonical skills
        # ----------------------------------------------------

        canonical_skills = [
            item["matched_skill"]
            for item in matched_skills
        ]

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return jsonify({
            "success": True,
            "message":
                "Resume skills extracted successfully",

            "skills_section_found": True,

            "extracted_skills":
                extracted_skills,

            "matched_skills":
                matched_skills,

            "skills":
                canonical_skills
        })

    except Exception as error:

        print(
            "Resume skill extraction error:",
            repr(error)
        )

        return jsonify({
            "success": False,
            "message":
                "Failed to extract resume skills",
            "error": str(error)
        }), 500


# ============================================================
# Run Flask Server
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )