from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/submit', methods=['POST'])
def handle_form():
    data = request.get_json() or {}
    name = data.get('name', 'Anonymous')
    email = data.get('email', 'No email provided')
    message = data.get('message', '')

    processed_response = {
        "status": "success",
        "message": f"Hello {name}, your submission has been processed by the Flask backend!",
        "received_data": {
            "name": name,
            "email": email,
            "message": message
        }
    }
    return jsonify(processed_response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)