from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.playlist import Playlist
from app.models.playlist_track import PlaylistTrack

bp = Blueprint("playlists", __name__)


# ------------------------------------
# CREATE PLAYLIST
# ------------------------------------
@bp.route("/playlists", methods=["POST"])
@jwt_required()
def create_playlist():
    user_id = int(get_jwt_identity())

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"msg": "JSON body required"}), 400

    name = data.get("name")
    if not name:
        return jsonify({"msg": "Playlist name required"}), 400

    playlist = Playlist(name=name, user_id=user_id)
    db.session.add(playlist)
    db.session.commit()

    return jsonify({
        "id": playlist.id,
        "name": playlist.name
    }), 201


# ------------------------------------
# GET USER PLAYLISTS
# ------------------------------------
@bp.route("/playlists", methods=["GET"])
@jwt_required()
def get_playlists():
    user_id = int(get_jwt_identity())

    playlists = Playlist.query.filter_by(user_id=user_id).all()

    return jsonify([
        {"id": p.id, "name": p.name}
        for p in playlists
    ])


# ------------------------------------
# ADD TRACK TO PLAYLIST
# ------------------------------------
@bp.route("/playlists/<int:playlist_id>/tracks", methods=["POST"])
@jwt_required()
def add_track(playlist_id):
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"msg": "JSON body required"}), 400

    track_id = data.get("track_id")
    if not track_id:
        return jsonify({"msg": "Track ID required"}), 400

    exists = PlaylistTrack.query.filter_by(
        playlist_id=playlist_id,
        track_id=track_id
    ).first()

    if exists:
        return jsonify({"msg": "Track already added"}), 400

    pt = PlaylistTrack(playlist_id=playlist_id, track_id=track_id)
    db.session.add(pt)
    db.session.commit()

    return jsonify({"msg": "Track added"}), 201


# ------------------------------------
# REMOVE TRACK FROM PLAYLIST
# ------------------------------------
@bp.route("/playlists/<int:playlist_id>/tracks/<int:track_id>", methods=["DELETE"])
@jwt_required()
def remove_track(playlist_id, track_id):
    pt = PlaylistTrack.query.filter_by(
        playlist_id=playlist_id,
        track_id=track_id
    ).first_or_404()

    db.session.delete(pt)
    db.session.commit()

    return jsonify({"msg": "Removed"}), 200


# ------------------------------------
# PLAYLIST DETAILS  ✅ FIXED
# ------------------------------------
@bp.route("/playlists/<int:playlist_id>", methods=["GET"])
@jwt_required()
def playlist_detail(playlist_id):
    playlist = Playlist.query.get_or_404(playlist_id)

    return jsonify({
        "id": playlist.id,
        "name": playlist.name,
        "tracks": [
            {
                "id": pt.track.id,
                "title": pt.track.title,
                "artist": pt.track.artist,
                "audio_url": pt.track.audio_url   # 🔥 THIS LINE FIXES EVERYTHING
            }
            for pt in playlist.tracks
        ]
    })
