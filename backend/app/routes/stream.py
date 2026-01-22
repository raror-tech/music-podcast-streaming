import os
from flask import Blueprint, request, Response, current_app

stream_bp = Blueprint("stream", __name__)

@stream_bp.route("/stream/<filename>")
def stream_audio(filename):
    file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
    if not os.path.exists(file_path):
        return {"error": "Audio file not found"}, 404
    file_size = os.path.getsize(file_path)
    range_header = request.headers.get("Range", None)
    if range_header:
        byte_range = range_header.replace("bytes=", "").split("-") 
        start = int(byte_range[0]) 
        end = int(byte_range[1]) if byte_range[1] else file_size - 1 
        length = end - start + 1
        
        with open(file_path, "rb") as f: 
            f.seek(start) 
            data = f.read(length)
            
        return Response(
        data,
        206,
        mimetype="audio/mpeg",
        headers={
        "Content-Range": f"bytes {start}-{end}/{file_size}",
        "Accept-Ranges": "bytes",
        "Content-Length": str(length),
    },
)
    return Response(open(file_path, "rb"), mimetype="audio/mpeg")




