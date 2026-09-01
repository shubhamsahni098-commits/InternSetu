from flask import Flask
from flask_cors import CORS

from disha.chat import disha_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(disha_bp)


if __name__ == "__main__":
    app.run(debug=True, port=5001)