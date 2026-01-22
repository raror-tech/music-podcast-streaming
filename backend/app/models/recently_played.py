from app.extensions import db
from datetime import datetime

class RecentlyPlayed(db.Model):
    __tablename__ = "recently_played"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    track_id = db.Column(
        db.Integer,
        db.ForeignKey("tracks.id"),
        nullable=False
    )

    
    last_position = db.Column(db.Float, default=0)

    
    played_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
