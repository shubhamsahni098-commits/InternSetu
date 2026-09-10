import modal

image = (
    modal.Image.debian_slim(python_version="3.10")
    .pip_install_from_requirements("backend/requirements.txt")
    .add_local_dir("backend", remote_path="/root/backend")
)

app = modal.App("internsetu-disha")


@app.function(
    image=image,
    secrets=[modal.Secret.from_name("internsetu-gemini")]
)
@modal.wsgi_app()
def disha_service():
    import sys

    sys.path.insert(0, "/root/backend")

    from app import app as flask_app

    return flask_app