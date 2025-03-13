from flask import Blueprint, request, jsonify, send_file
import io
from utils.gridfs_helper import upload_file_to_gridfs, get_file_from_gridfs

file_routes = Blueprint('file_routes', __name__)

@file_routes.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_id = upload_file_to_gridfs(file)

    return jsonify({
        'message': 'File uploaded successfully',
        'file_id': file_id
    })

@file_routes.route('/api/file/<file_id>', methods=['GET'])
def get_file(file_id):
    file_obj = get_file_from_gridfs(file_id)
    
    if not file_obj:
        return jsonify({'error': 'File not found'}), 404

    return send_file(io.BytesIO(file_obj.read()), mimetype=file_obj.content_type, as_attachment=True, download_name=file_obj.filename)
