from app.extensions import db

class Podcast(db.Model):
    __tablename__ = "podcasts"

    id = db.Column(db.Integer, primary_key=True)
    podcast_name = db.Column(db.String(200), nullable=False)
    episode_title = db.Column(db.String(200))
    audio_url = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
