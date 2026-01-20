from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.utils.decorators import admin_required
from app.models.track import Track
from app.extensions import db
from app.services.storage import upload_to_storage

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/admin/upload", methods=["POST"])
@jwt_required()
@admin_required
def upload_audio():
    # ✅ SAFE access
    file = request.files.get("audio")
    title = request.form.get("title")
    artist = request.form.get("artist")
    category = request.form.get("category")

    # ✅ Validation (prevents 500 errors)
    if not file:
        return jsonify({"msg": "Audio file is required"}), 400

    if not title or not artist or not category:
        return jsonify({"msg": "Title, artist and category are required"}), 400

    audio_url = upload_to_storage(file)

    track = Track(
        title=title,
        artist=artist,
        category=category,
        audio_url=audio_url
    )

    db.session.add(track)
    db.session.commit()

    return jsonify({"msg": "Uploaded successfully"}), 201
