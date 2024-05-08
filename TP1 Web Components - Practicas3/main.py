from flask import Flask, request, jsonify
from flask_cors import CORS #Import the CORS extension
import mysql.connector
import json


app = Flask(__name__)
CORS(app)

# Función para verificar si la base de datos existe
def check_database(cursor):
    cursor.execute("SHOW DATABASES")
    databases = cursor.fetchall()
    for database in databases:
        if database[0] == 'account':
            return True
    return False

# Función para verificar si un nombre de usuario ya existe en la base de datos
def check_existing_username(username):
    query = "SELECT * FROM User WHERE username = %s"
    cursor.execute(query, (username,))
    existing_user = cursor.fetchone()
    return existing_user is not None

# Función para crear las tablas si no existen
def create_tables(cursor):
    cursor.execute("CREATE TABLE IF NOT EXISTS User (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(45) NOT NULL, saldo VARCHAR(45) NOT NULL)")

# Configuración de la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
)

cursor = db.cursor()

# Verificar si la base de datos existe
if not check_database(cursor):
    cursor.execute("CREATE DATABASE account")
    db.commit()

# Conectar a la base de datos myagenda
db = mysql.connector.connect(
    host="localhost",
    user="root",
    database="account"
)
cursor = db.cursor()

# Crear las tablas si no existen
create_tables(cursor)


# Leer los datos del archivo cuentas.json y subirlos a la base de datos
def load_data_from_json():
  with open('cuentas.json') as f:
    data = json.load(f)
    cuentas = data['cuentas']  # Acceder a la lista de cuentas
    for item in cuentas:
      username = item['username']
      saldo = item['saldo']

      # Verificar si el nombre de usuario ya existe
      if check_existing_username(username):
          print(f"El nombre de usuario '{username}' ya existe y se omitirá")
          continue  # Saltar a la siguiente iteración del bucle

      query = "INSERT INTO User (username, saldo) VALUES (%s, %s)"
      cursor.execute(query, (username, saldo))
  db.commit()

# Ruta para obtener todos los usuarios
@app.route('/get_users', methods=['GET'])
def get_users():
    cursor.execute("SELECT * FROM User")
    users = cursor.fetchall()
    users_json = []
    for user in users:
        user_dict = {
            "id": user[0],
            "username": user[1],
            "saldo": user[2]
        }
        users_json.append(user_dict)
    return jsonify(users_json)

# Ruta para crear un nuevo usuario
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    username = data['username']
    saldo = data['saldo']

    # Verificar si el nombre de usuario ya existe
    if check_existing_username(username):
        return jsonify({"error": "El nombre de usuario ya existe"}), 400

    query = "INSERT INTO User (username, saldo) VALUES (%s, %s)"
    cursor.execute(query, (username, saldo))
    db.commit()
    return jsonify({"mensaje": "Usuario creado exitosamente"})

# Ruta para actualizar un usuario existente
@app.route('/update_user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.json
    username = data.get('username')
    saldo = data.get('saldo')
    query = "UPDATE User SET username = %s, saldo = %s WHERE id = %s"
    cursor.execute(query, (username, saldo, id))
    db.commit()
    return jsonify({"mensaje": "Usuario actualizado exitosamente"})

# Ruta para eliminar un usuario
@app.route('/delete_user/<int:id>', methods=['DELETE'])
def delete_user(id):
    query = "DELETE FROM User WHERE id = %s"
    cursor.execute(query, (id,))
    db.commit()
    return jsonify({"mensaje": "Usuario eliminado exitosamente"})

if __name__ == '__main__':
    load_data_from_json()  # Cargar datos desde cuentas.json a la base de datos
    app.run(debug=True)