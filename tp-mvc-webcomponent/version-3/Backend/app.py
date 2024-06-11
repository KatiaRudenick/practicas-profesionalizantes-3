from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        calculation = data['calculation']
        result = eval(calculation) 
        return jsonify({'data': result}), 200
    except Exception as error:
        return jsonify({'error': str(error)}), 409

@app.route('/', methods=['GET'])
def home():
    return "API is running", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)