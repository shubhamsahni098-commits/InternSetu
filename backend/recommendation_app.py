from flask import Flask, request, jsonify

from recommendation_engine import recommend_internships


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
# Run Flask Server
# ============================================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )