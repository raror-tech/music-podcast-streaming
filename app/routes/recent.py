from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.recently_played import RecentlyPlayed
from app.models.track import Track

bp = Blueprint("recent", __name__)

# -----------------------------
# SAVE / UPDATE PLAYBACK POSITION
# -----------------------------
@bp.route("/recent", methods=["POST"])
@jwt_required()
def update_recent():
    user_id = int(get_jwt_identity())
    data = request.get_json(silent=True) or {}

    track_id = data.get("track_id")
    position = data.get("position", 0)

    if not track_id:
        return jsonify({"msg": "track_id required"}), 400

    recent = RecentlyPlayed.query.filter_by(
        user_id=user_id,
        track_id=track_id
    ).first()

    if recent:
        recent.last_position = position
        # played_at will auto-update if model uses default/onupdate
    else:
        recent = RecentlyPlayed(
            user_id=user_id,
            track_id=track_id,
            last_position=position
        )
        db.session.add(recent)

    db.session.commit()

    return jsonify({"msg": "Position saved"}), 200


# -----------------------------
# GET LAST POSITION (RESUME)
# -----------------------------
@bp.route("/recent/<int:track_id>", methods=["GET"])
@jwt_required()
def get_last_position(track_id):
    user_id = int(get_jwt_identity())

    recent = RecentlyPlayed.query.filter_by(
        user_id=user_id,
        track_id=track_id
    ).first()

    return jsonify({
        "last_position": recent.last_position if recent else 0
    })


# -----------------------------
# GET RECENTLY PLAYED TRACKS
# -----------------------------
@bp.route("/recent", methods=["GET"])
@jwt_required()
def get_recent():
    user_id = int(get_jwt_identity())

    recents = (
        db.session.query(RecentlyPlayed, Track)
        .join(Track, Track.id == RecentlyPlayed.track_id)
        .filter(RecentlyPlayed.user_id == user_id)
        .order_by(RecentlyPlayed.played_at.desc())  # ✅ FIXED
        .limit(20)
        .all()
    )

    return jsonify([
        {
            "id": track.id,
            "title": track.title,
            "artist": track.artist,
            "audio_url": track.audio_url,
            "last_position": recent.last_position,
            "played_at": recent.played_at.isoformat()
            if recent.played_at else None
        }
        for recent, track in recents
    ])
