import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

DISHA_SYSTEM_PROMPT = """
You are Disha, a friendly AI career guidance assistant
for InternSetu, a platform that helps students find internships.

Help students with:
- Career guidance
- Internship recommendations
- Understanding recommended internships
- Resume and skill improvement tips
- General InternSetu platform questions

Keep your responses concise, encouraging, and student-friendly.
"""


def get_gemini_reply(user_message: str, session_id: str = "default") -> str:

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=f"""
{DISHA_SYSTEM_PROMPT}

User:
{user_message}
"""
    )

    return response.text


def reset_session(session_id: str = "default") -> None:
    pass