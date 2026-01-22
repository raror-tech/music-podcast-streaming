from app.extensions import db

class Playlist(db.Model):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(200), nullable=False)
    
    tracks = db.relationship(
        "PlaylistTrack",
        backref="playlist",
        cascade="all, delete-orphan"
    )
