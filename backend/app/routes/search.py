from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.models.track import Track
from app.models.podcast import Podcast
from app.services.musicbrainz_service import search_tracks
from app.services.podcastindex_service import search_podcasts

search_bp = Blueprint("search", __name__)

@search_bp.route("/search", methods=["GET"])
@jwt_required()
def search():
    query = request.args.get("q", "").strip()

    if not query:
        return jsonify({
            "tracks": [],
            "podcasts": [],
            "external_tracks": [],
            "external_podcasts": []
        })

    # 🎵 Local Tracks
    tracks = Track.query.filter(
        Track.title.ilike(f"%{query}%") |
        Track.artist.ilike(f"%{query}%")
    ).all()

    # 🎙 Local Podcasts
    podcasts = Podcast.query.filter(
        Podcast.podcast_name.ilike(f"%{query}%") |
        Podcast.episode_title.ilike(f"%{query}%") |
        Podcast.description.ilike(f"%{query}%")
    ).all()

    # 🌍 External Sources
    external_tracks = search_tracks(query)
    external_podcasts = search_podcasts(query)

    return jsonify({
        "tracks": [
            {
                "id": t.id,
                "title": t.title,
                "artist": t.artist,
                "category": t.category,
                "audio_url": t.audio_url
            }
            for t in tracks
        ],
        "podcasts": [
            {
                "id": p.id,
                "podcast_name": p.podcast_name,
                "episode_title": p.episode_title,
                "description": p.description,
                "audio_url": p.audio_url
            }
            for p in podcasts
        ],
        "external_tracks": external_tracks,
        "external_podcasts": external_podcasts
    })
