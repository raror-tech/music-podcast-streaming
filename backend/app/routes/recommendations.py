from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.recently_played import RecentlyPlayed
from app.models.track import Track

bp = Blueprint("recommendations", __name__)

@bp.route("/recommendations", methods=["GET"])
@jwt_required()
def get_recommendations():
    user_id = int(get_jwt_identity())

    # 1️⃣ Get recently played track IDs
    recent_tracks = (
        RecentlyPlayed.query
        .filter_by(user_id=user_id)
        .order_by(RecentlyPlayed.played_at.desc())
        .limit(5)
        .all()
    )

    if not recent_tracks:
        # fallback: popular tracks
        tracks = Track.query.limit(10).all()
    else:
        # 2️⃣ Get artists user listens to
        artist_ids = [
            t.track.artist for t in recent_tracks
            if t.track
        ]

        # 3️⃣ Recommend similar tracks (same artist)
        tracks = (
            Track.query
            .filter(Track.artist.in_(artist_ids))
            .limit(10)
            .all()
        )

    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "artist": t.artist,
            "audio_url": t.audio_url
        }
        for t in tracks
    ])
