from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import mysql.connector
import json


app = Flask(__name__)
CORS(app)

# funcion para verificar si la base de datos existe
def check_database(cursor):
    cursor.execute("SHOW DATABASES")
    databases = cursor.fetchall()
    for database in databases:
        if database[0] == "useraccount":
            return True
    return False


# funcion para verificar si un nombre de usuario ya existe en la base de datos
def check_existing_username(username):
    query = "SELECT * FROM User WHERE username = %s"
    cursor.execute(query, (username,))
    existing_user = cursor.fetchone()
    return existing_user is not None


# funcion para crear las tablas si no existen
def create_tables(cursor):
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS User (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(45) NOT NULL, saldo VARCHAR(45) NOT NULL)"
    )


# Configuracion de la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
)

cursor = db.cursor()

# Verifico si la base de datos existe
if not check_database(cursor):
    cursor.execute("CREATE DATABASE useraccount")
    db.commit()

# Conecto a la base de datos useraccount
db = mysql.connector.connect(host="localhost", user="root", database="useraccount")
cursor = db.cursor()

# Crea las tablas si no existen
create_tables(cursor)


def load_data_from_json():
    with open('cuentas.json') as f:
        data = json.load(f)
        cuentas = data['cuentas']  # Accedo a la lista de cuentas
        for item in cuentas:
            username = item['username']
            saldo = item['saldo']

            # Verifico si el nombre de usuario ya existe
            if check_existing_username(username):
                print(f"El nombre de usuario '{username}' ya existe y se omitirá")
                continue  # salta a la siguiente iteración del bucle

            query = "INSERT INTO User (username, saldo) VALUES (%s, %s)"
            cursor.execute(query, (username, saldo))
            db.commit()

# Ruta para obtener todos los usuarios
@app.route("/get_users", methods=["GET"])
def get_users():
    cursor.execute("SELECT * FROM User")
    users = cursor.fetchall()
    users_json = []
    for user in users:
        user_dict = {"id": user[0], "username": user[1], "saldo": user[2]}
        users_json.append(user_dict)
    return jsonify(users_json)


# Ruta para crear un nuevo usuario
@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.json
    username = data["username"]
    saldo = data["saldo"]

    # Verificar si el nombre de usuario ya existe
    if check_existing_username(username):
        return jsonify({"error": "El nombre de usuario ya existe"}), 400

    query = "INSERT INTO User (username, saldo) VALUES (%s, %s)"
    cursor.execute(query, (username, saldo))
    db.commit()
    return jsonify({"mensaje": "Usuario creado exitosamente"})


# Ruta para actualizar un usuario existente
@app.route("/update_user/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.json
    username = data.get("username")
    saldo = data.get("saldo")
    query = "UPDATE User SET username = %s, saldo = %s WHERE id = %s"
    cursor.execute(query, (username, saldo, id))
    db.commit()
    return jsonify({"mensaje": "Usuario actualizado exitosamente"})


# Ruta para eliminar un usuario
@app.route("/delete_user/<int:id>", methods=["DELETE"])
def delete_user(id):
    query = "DELETE FROM User WHERE id = %s"
    cursor.execute(query, (id,))
    db.commit()
    return jsonify({"mensaje": "Usuario eliminado exitosamente"})

# Ruta para buscar un usuario por nombre de usuario
@app.route("/search_user/<string:username>", methods=["GET"])
def search_user(username):
    query = "SELECT * FROM User WHERE username = %s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    if user:
        user_dict = {"id": user[0], "username": user[1], "saldo": user[2]}
        return jsonify(user_dict)
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404


if __name__ == "__main__":
    load_data_from_json()  # Carga los datos desde cuentas.json a la base de datos
    app.run(debug=True)
