from app.extensions import db

class Track(db.Model):
    __tablename__ = "tracks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    artist = db.Column(db.String(200))
    category = db.Column(db.String(100), nullable=False)   
    audio_url = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.Text)
    duration = db.Column(db.Integer)  
