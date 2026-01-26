from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from app.models.track import Track

music_bp = Blueprint("music", __name__, url_prefix="/api/music")


# --------------------------------------------------
# 🎵 GET ALL MUSIC (FROM DB)
# --------------------------------------------------
@music_bp.route("", methods=["GET"])
@jwt_required()
def get_all_music():
    tracks = Track.query.all()

    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "artist": t.artist,
            "category": t.category,
            "audio_url": t.audio_url
        }
        for t in tracks
    ])


# --------------------------------------------------
# 🔍 SEARCH MUSIC (DB SEARCH – FIXED)
# --------------------------------------------------
@music_bp.route("/search", methods=["GET"])
@jwt_required()
def search_music():
    q = request.args.get("q")

    if not q:
        return jsonify([])

    tracks = Track.query.filter(
        Track.title.ilike(f"%{q}%") |
        Track.artist.ilike(f"%{q}%")
    ).all()

    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "artist": t.artist,
            "category": t.category,
            "audio_url": t.audio_url
        }
        for t in tracks
    ])
