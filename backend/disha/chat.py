from flask import Blueprint, request, jsonify
from disha.gemini import get_gemini_reply, reset_session

disha_bp = Blueprint("disha", __name__, url_prefix="/disha")


@disha_bp.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "message is required"}), 400

    user_message = data["message"]
    session_id = data.get("session_id", "default")

    try:
        reply = get_gemini_reply(user_message, session_id)

        return jsonify({
            "reply": reply,
            "session_id": session_id
        }), 200

    except Exception as e:
        return jsonify({
            "error": f"Gemini API error: {str(e)}"
        }), 500


@disha_bp.route("/chat/reset", methods=["POST"])
def chat_reset():

    data = request.get_json() or {}
    session_id = data.get("session_id", "default")

    reset_session(session_id)

    return jsonify({"status": "reset"}), 200