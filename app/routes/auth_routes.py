from flask import Blueprint,request, jsonify
from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token

auth_bp=Blueprint("auth",__name__)

@auth_bp.route("/register",methods=["POST"])
def register():
    data=request.get_json()
    username=data.get("username")
    email=data.get("email")
    password=data.get("password")
    
    if not username or not email or not password:
        return jsonify({"msg": "Username, email and password are required"}), 400
    
    if User.query.filter(User.email == email).first():
        return jsonify({"msg":"User already exists"}),409
    
    user=User(
        username=username,
        email=email
        )
    
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"msg":"User registered successfully"}),201

@auth_bp.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    
    email=data.get("email")
    password=data.get("password")
    
    if not email or not password:
        return jsonify({"msg":"Email and password are required"}),400
    
    user = User.query.filter(User.email == email).first()

    
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid email or password"}), 401
    
    access_token = create_access_token(
    identity=str(user.id),   # ✅ subject must be string
    additional_claims={
        "username": user.username,
        "email": user.email,
        "role": user.role
    }
)


    
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role":user.role
        }
    }), 200
    
    
        