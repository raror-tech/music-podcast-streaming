from flask_jwt_extended import get_jwt
from functools import wraps

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        claims = get_jwt()          # 👈 get full JWT claims
        if claims.get("role") != "admin":
            return {"msg": "Admin only"}, 403
        return fn(*args, **kwargs)
    return wrapper
