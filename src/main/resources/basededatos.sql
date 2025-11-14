CREATE DATABASE IF NOT EXISTS multiverso_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE multiverso_db;

DROP TABLE IF EXISTS becario;

CREATE TABLE becario (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         nombre_completo VARCHAR(200) NOT NULL,
                         carrera VARCHAR(200) NOT NULL,
                         universidad VARCHAR(200) NOT NULL,
                         email VARCHAR(150) NOT NULL UNIQUE,
                         pais VARCHAR(100) NOT NULL,
                         estado VARCHAR(50) NOT NULL
);
