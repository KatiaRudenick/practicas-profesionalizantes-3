-- MYSQL SCRIPT
CREATE DATABASE IF NOT EXISTS listado;

CREATE TABLE IF NOT EXISTS Provincia (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Departamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    Provincia_id INT NOT NULL,
    FOREIGN KEY (Provincia_id) REFERENCES provincia(id)
);

CREATE TABLE IF NOT EXISTS Municipio (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    Departamento_id INT NOT NULL,
    FOREIGN KEY (Departamento_id) REFERENCES departamento(id)
);

CREATE TABLE IF NOT EXISTS Localidad (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    Municipio_id  INT NOT NULL,
    FOREIGN KEY (Municipio_id ) REFERENCES municipio(id)
);