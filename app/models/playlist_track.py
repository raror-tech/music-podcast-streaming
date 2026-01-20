from app.extensions import db

class PlaylistTrack(db.Model):
    __tablename__ = "playlist_tracks"

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"), nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey("tracks.id"), nullable=False)

    
    track = db.relationship("Track", backref="playlist_tracks")
