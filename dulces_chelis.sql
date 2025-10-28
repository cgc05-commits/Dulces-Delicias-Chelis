CREATE DATABASE IF NOT EXISTS dulces_chelis;
USE dulces_chelis;

CREATE TABLE pasteles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tamano VARCHAR(50),
  harina VARCHAR(50),
  relleno VARCHAR(50),
  especificaciones TEXT,
  imagen VARCHAR(255),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  mensaje TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
