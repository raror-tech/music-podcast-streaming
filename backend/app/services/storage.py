import os
import uuid
from supabase import create_client

# Create Supabase client (once)
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

BUCKET_NAME = "audio"

def upload_to_storage(file):
    """
    Upload audio file to Supabase Storage
    Returns public audio URL
    """

    # generate unique filename
    filename = f"{uuid.uuid4()}_{file.filename}"

    # upload file to Supabase Storage
    supabase.storage.from_(BUCKET_NAME).upload(
        filename,
        file.read(),
        {
            "content-type": file.content_type
        }
    )

    # generate public URL
    audio_url = (
        f"{os.getenv('SUPABASE_URL')}"
        f"/storage/v1/object/public/{BUCKET_NAME}/{filename}"
    )

    return audio_url
