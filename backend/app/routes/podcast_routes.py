from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from app.services.podcastindex_service import search_podcasts,get_episodes

podcast_bp = Blueprint("podcasts", __name__, url_prefix="/api/podcasts")

@podcast_bp.route("/search")
@jwt_required()
def search():
    q=request.args.get("q")
    return jsonify(search_podcasts(q))

@podcast_bp.route("/<int:feed_id>/episodes")
@jwt_required()
def episodes(feed_id):
    return jsonify(get_episodes(feed_id))