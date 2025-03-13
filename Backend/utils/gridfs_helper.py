from bson import ObjectId
from models.database import fs

def upload_file_to_gridfs(file):
    """Uploads a file to GridFS and returns its ID."""
    file_id = fs.put(file, filename=file.filename)
    return str(file_id)

def get_file_from_gridfs(file_id):
    """Fetches a file from GridFS by its ID."""
    try:
        return fs.get(ObjectId(file_id))
    except:
        return None
