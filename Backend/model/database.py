from pymongo import MongoClient
import gridfs
from config.config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["file_upload_db"]
fs = gridfs.GridFS(db)
