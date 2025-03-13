from flask import Flask, jsonify
from flask_cors import CORS
from config.config import PORT
from routes.file_routes import file_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(file_routes)

@app.route('/')
def home():
    return jsonify({'message': 'Flask API with MongoDB is Running!'})

if __name__ == '__main__':
    app.run(debug=True, port=PORT)

