from app import create_app
from app.extensions import db


from app.models import *

app = create_app()

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {"message": "Backend Running Successfully"}

if __name__ == "__main__":
    app.run(debug=True)
