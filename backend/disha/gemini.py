import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Connect to Gemini using the API key from .env
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# Instructions for Disha
DISHA_SYSTEM_PROMPT = """
You are Disha, the AI career guidance assistant for InternSetu.

Help students with:
- Career guidance
- Internship recommendations
- Understanding recommended internships
- Resume and skill improvement tips
- General InternSetu platform questions

Important response rules:
- Do NOT introduce yourself in every response.
- Do NOT repeatedly say "Hi", "Hello", or "I'm Disha".
- Only introduce yourself if the user explicitly asks who you are.
- Answer the user's question directly.
- Use previous conversation context when available.
- If the user says "it", "that", "this", "the internship", etc., determine what they are referring to from the conversation history.
- Do not ask for information that the student has already provided.
- Keep responses concise, encouraging, and student-friendly.
"""


# Stores conversations separately for each session
sessions = {}


def get_gemini_reply(user_message: str, session_id: str = "default") -> str:

    # Create a new conversation for a new session
    if session_id not in sessions:
        sessions[session_id] = []

    # Add the user's message to the conversation
    sessions[session_id].append({
        "role": "USER",
        "text": user_message
    })

    # Build readable conversation history
    conversation_history = "\n".join(
        f"{message['role']}: {message['text']}"
        for message in sessions[session_id]
    )

    # Give Gemini both the instructions and conversation history
    prompt = f"""
{DISHA_SYSTEM_PROMPT}

CONVERSATION HISTORY:
---------------------
{conversation_history}
---------------------

LATEST USER MESSAGE:
{user_message}

Use the conversation history to understand the user's latest message.

Important:
- Answer the latest question directly.
- Remember information the user already provided.
- If the latest message refers to something using words such as "it", "that", "this", or "the internship", use the conversation history to identify what they mean.
- Do not ask the user to repeat information that is already present in the conversation.
"""

    # Ask Gemini for a response
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    reply = response.text

    # Save Disha's response to the conversation
    sessions[session_id].append({
        "role": "ASSISTANT",
        "text": reply
    })

    return reply


def reset_session(session_id: str = "default") -> None:
    """
    Clears the conversation history for a specific session.
    """
    sessions.pop(session_id, None)
