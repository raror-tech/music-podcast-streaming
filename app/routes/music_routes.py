from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.models.track import Track
from app.services.musicbrainz_service import search_tracks

# Blueprint with prefix
music_bp = Blueprint("music", __name__, url_prefix="/api/music")


# --------------------------------------------------
# ✅ DEFAULT MUSIC LIST (SPOTIFY-LIKE HOME VIEW)
# --------------------------------------------------
@music_bp.route("", methods=["GET"])
@jwt_required()
def get_all_music():
    """
    Called when user opens /music page
    Shows all tracks stored in your database
    """
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
# 🔍 SEARCH MUSIC (MusicBrainz)
# --------------------------------------------------
@music_bp.route("/search", methods=["GET"])
@jwt_required()
def search_music():
    """
    Called when user types in search box
    Fetches results from MusicBrainz
    """
    q = request.args.get("q")

    if not q:
        return jsonify([])

    data = search_tracks(q)

    results = []
    for item in data.get("recordings", []):
        results.append({
            "title": item.get("title"),
            "artist": (
                item["artist-credit"][0]["name"]
                if item.get("artist-credit")
                else None
            )
        })

    return jsonify(results)
