from flask import Flask, request, jsonify
from flask_cors import CORS #Import the CORS extension
# import mysql.connector
import mysql.connector
import csv

app = Flask(__name__)
CORS(app)

# MySQL configuration
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'database': 'listado'
}

# Función para conectar a la base de datos MySQL
def connect_to_db():
    try:
        conn = mysql.connector.connect(**mysql_config)
        return conn
    except Exception as e:
        print("Error conectando a la base de datos:", e)
        return None

# Función para ejecutar consultas SQL de inserción
def execute_sql_insert(sql_insert):
    try: 
        conn = connect_to_db()
        cursor = conn.cursor()
        cursor.execute(sql_insert)
        conn.commit()
    except Exception as e:
        raise e
    finally:
        cursor.close()
        conn.close()

# Función para inicializar la tabla 'provincia'
def initialize_provincias():
    print("Inicializando tabla provincia ...")
    with open('provincias.csv', 'r', encoding='utf-8') as provinciasCsv:
        csvreader = csv.reader(provinciasCsv)
        try:
            conn = connect_to_db()
            cursor = conn.cursor()
            for row in csvreader:
                # Consulta para insertar una provincia si no existe
                query = "INSERT IGNORE INTO Provincia (nombre) VALUES (%s)"
                cursor.execute(query, (row[0],))
            conn.commit()
            print(f'{cursor.rowcount} provincias insertadas.')
        except Exception as e:
            print("Error al inicializar la tabla 'provincia':", e)
            raise e
        finally:
            cursor.close()
            conn.close()


def initialize_departamentos():
    print("Inicializando tabla departamento ...")
    with open('departamentos.csv', 'r', encoding='utf-8') as departamentosCsv:
        csvreader = csv.reader(departamentosCsv)
        try:
            conn = connect_to_db()
            cursor = conn.cursor()
            for row in csvreader:
                # Consulta para insertar un departamento si no existe, seleccionando el id de la provincia relacionada
                query = "INSERT IGNORE INTO Departamento (nombre, Provincia_id) SELECT %s, id FROM Provincia WHERE nombre = %s"
                cursor.execute(query, (row[0], row[1]))
            conn.commit()
            print(f'Se insertaron {cursor.rowcount} departamentos.')
        except Exception as e:
            print("Error al inicializar la tabla 'departamento':", e)
            raise e
        finally:
            cursor.close()
            conn.close()

def initialize_municipios():
    print("Inicializando tabla municipio ...")
    with open('municipios.csv', 'r', encoding='utf-8') as municipiosCsv:
        csvreader = csv.reader(municipiosCsv)
        try:
            conn = connect_to_db()
            cursor = conn.cursor()
            for row in csvreader:
                # Consulta para insertar un municipio si no existe, seleccionando el id del departamento relacionado
                query = "INSERT IGNORE INTO Municipio (nombre, Departamento_id) SELECT %s, id FROM Departamento WHERE nombre = %s"
                cursor.execute(query, (row[0], row[1]))
            conn.commit()
            print(f'Se insertaron {cursor.rowcount} municipios.')
        except Exception as e:
            print("Error al inicializar la tabla 'municipio':", e)
            raise e
        finally:
            cursor.close()
            conn.close()

def initialize_localidades():
    print("Inicializando tabla localidad ...")
    with open('localidades.csv', 'r', encoding='utf-8') as localidadesCsv:
        csvreader = csv.reader(localidadesCsv)
        try:
            conn = connect_to_db()
            cursor = conn.cursor()
            for row in csvreader:
                # Consulta para insertar una localidad si no existe, seleccionando el id del municipio relacionado
                query = "INSERT IGNORE INTO Localidad (nombre, Municipio_id) SELECT %s, id FROM Municipio WHERE nombre = %s"
                cursor.execute(query, (row[0], row[1]))
            conn.commit()
            print(f'Se insertaron {cursor.rowcount} localidades.')
        except Exception as e:
            print("Error al inicializar la tabla 'localidad':", e)
            raise e
        finally:
            cursor.close()
            conn.close()

#Function to initialize the DB 

def initialize_db():
    try:
        #Establecer la conexión con la base de datos
        conn = connect_to_db()

        # Crear un objeto cursor
        cursor = conn.cursor()

        # Leer el script SQL desde el archivo
        with open('init_db.sql', 'r') as sql_file:
            sql_script = sql_file.read()

        # Ejecutar el script SQL
        cursor.execute(sql_script, multi=True)

        # Confirmar los cambios (si los hay)
        conn.commit()

        # Inicializar las tablas provincias, departamentos, municipios y localidades
        initialize_provincias()
        initialize_departamentos()
        initialize_municipios()
        initialize_localidades()
        
    except Exception as e:
        print("Error al inicializar la base de datos:", e)
        #raise e
    finally:
        #Cerrar el cursor y la conexión
        cursor.close()
        conn.close()

# Route to populate dropdowns
@app.route('/provincia/all', methods=['GET'])
def getAllProvincias():
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor()
        try:
            query = "SELECT id, nombre FROM Provincia"
            cursor.execute(query)
            data = cursor.fetchall()
            return jsonify([{'id': row[0], 'nombre': row[1]} for row in data])
        except Exception as e:
            print("Error de la base de datos:", e)
            return jsonify({'error': f'Ocurrió un error de la base de datos al obtener todas las provincias: {e}'}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Fallo al conectar a la base de datos'}), 500

# Route to populate dropdowns
@app.route('/departamento/byProvincia/<int:Provincia_id>', methods=['GET'])
def getDepartamentosByProvincia(Provincia_id):
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor(dictionary=True)  # Establecer el cursor en modo de diccionario
        try:
            # Consulta para obtener datos de la base de datos
            query = f"SELECT id, nombre FROM Departamento WHERE Provincia_id = {Provincia_id}"
            cursor.execute(query)
            data = cursor.fetchall()
            return jsonify(data)  # Serializar los resultados de la consulta directamente como JSON
        except Exception as e:
            print("Error de la base de datos:", e)
            return jsonify({'error': f'Ocurrió un error de la base de datos al obtener departamentos por provincia: {e}'}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Fallo al conectar a la base de datos'}), 500

# Route to populate dropdowns
@app.route('/municipio/byDepartamento/<int:Departamento_id>', methods=['GET'])
def getMunicipiosByDepartamento(Departamento_id):
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor(dictionary=True)  # Establecer el cursor en modo de diccionario
        try:
            # Consulta para obtener datos de la base de datos
            query = f"SELECT id, nombre FROM Municipio WHERE Departamento_id = {Departamento_id}"
            cursor.execute(query)
            data = cursor.fetchall()
            return jsonify(data)  # Serializar los resultados de la consulta directamente como JSON
        except Exception as e:
            print("Error de la base de datos:", e)
            return jsonify({'error': f'Ocurrió un error de la base de datos al obtener municipios por departamento: {e}'}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Fallo al conectar a la base de datos'}), 500

# Route to populate dropdowns
@app.route('/localidad/byMunicipio/<int:Municipio_id>', methods=['GET'])
def getLocalidadesByMunicipio(Municipio_id):
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor(dictionary=True)  # Establecer el cursor en modo de diccionario
        try:
            # Consulta para obtener datos de la base de datos
            query = f"SELECT id, nombre FROM localidad WHERE Municipio_id = {Municipio_id}"
            cursor.execute(query)
            data = cursor.fetchall()
            return jsonify(data)  # Serializar los resultados de la consulta directamente como JSON
        except Exception as e:
            print("Error de la base de datos:", e)
            return jsonify({'error': f'Ocurrió un error de la base de datos al obtener localidades por municipio: {e}'}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Fallo al conectar a la base de datos'}), 500

if __name__ == '__main__':
    mydb = mysql.connector.connect(
        host=mysql_config['host'],
        user=mysql_config['user'],
    )
    mycursor = mydb.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS listado CHARACTER SET utf8 COLLATE utf8_general_ci")
    conn = connect_to_db()  # Establish database connection

    if conn:
        initialize_db()  # Inicializar las tablas de la base de datos
        app.run(debug=True)  # Start the Flask app
    else:
        print("Failed to connect to the database. Exiting.")