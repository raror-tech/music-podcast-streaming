import os
from werkzeug.utils import secure_filename
from uuid import uuid4
from flask import current_app

def upload_to_storage(file):
    filename = secure_filename(file.filename)
    unique_name = f"{uuid4()}_{filename}"

    # uploads/audio/
    upload_dir = os.path.join(current_app.static_folder, "audio")
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, unique_name)
    file.save(file_path)

    return f"/static/audio/{unique_name}"
