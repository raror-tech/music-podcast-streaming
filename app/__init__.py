from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db, jwt



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)
    
    app.static_folder = "uploads"
    app.static_url_path = "/static"

    
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp,url_prefix="/api/auth")
    
    from app.routes.protected_routes import protected_bp
    app.register_blueprint(protected_bp, url_prefix="/api")
    
    from app.routes.music_routes import music_bp
    from app.routes.podcast_routes import podcast_bp

    app.register_blueprint(music_bp)
    app.register_blueprint(podcast_bp)
    
    from app.routes.stream import stream_bp
    app.config["UPLOAD_FOLDER"] = "uploads"
    app.register_blueprint(stream_bp, url_prefix="/api")
    
    from app.routes.playlists import bp as playlists_bp
    app.register_blueprint(playlists_bp, url_prefix="/api")
    
    from app.routes.recent import bp as recent_bp
    app.register_blueprint(recent_bp, url_prefix="/api")
    
    from app.routes.admin import admin_bp
    app.register_blueprint(admin_bp)
    
    from app.routes.search import search_bp
    app.register_blueprint(search_bp, url_prefix="/api")
    
    from app.routes.recommendations import bp as rec_bp
    app.register_blueprint(rec_bp, url_prefix="/api")










    return app
