-- Script de inicialización de la base de datos
-- Sistema de Evaluaciones Orales - Facultad de Derecho

-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE evaluaciones_orales;

-- Conectarse a la base de datos
-- \c evaluaciones_orales;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('estudiante', 'profesor', 'admin')),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tokens de recuperación de contraseña
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    expira_en TIMESTAMP NOT NULL,
    usado BOOLEAN DEFAULT false,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de sesiones (opcional, para tracking)
CREATE TABLE IF NOT EXISTS sesiones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP NOT NULL,
    activa BOOLEAN DEFAULT true
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_sesiones_usuario_id ON sesiones(usuario_id);
CREATE INDEX idx_sesiones_token ON sesiones(token);

-- Insertar usuario admin por defecto (contraseña: admin123)
-- La contraseña debe ser hasheada en la aplicación
INSERT INTO usuarios (nombre, apellido, email, password, rol) 
VALUES ('Admin', 'Sistema', 'admin@derecho.edu', '$2a$10$XQYQvZkXQQZQZQZQZQZQZuN6KVZv.3eVVLZQ8LZQ8LZQ8LZQ8LZQ8O', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insertar usuario de prueba profesor
INSERT INTO usuarios (nombre, apellido, email, password, rol) 
VALUES ('Juan', 'Pérez', 'juan.perez@derecho.edu', '$2a$10$XQYQvZkXQQZQZQZQZQZQZuN6KVZv.3eVVLZQ8LZQ8LZQ8LZQ8LZQ8O', 'profesor')
ON CONFLICT (email) DO NOTHING;

-- Insertar usuario de prueba estudiante
INSERT INTO usuarios (nombre, apellido, email, password, rol) 
VALUES ('María', 'González', 'maria.gonzalez@derecho.edu', '$2a$10$XQYQvZkXQQZQZQZQZQZQZuN6KVZv.3eVVLZQ8LZQ8LZQ8LZQ8LZQ8O', 'estudiante')
ON CONFLICT (email) DO NOTHING;

-- Comentarios
COMMENT ON TABLE usuarios IS 'Almacena todos los usuarios del sistema (estudiantes, profesores, admins)';
COMMENT ON TABLE password_reset_tokens IS 'Tokens temporales para recuperación de contraseña';
COMMENT ON TABLE sesiones IS 'Registro de sesiones activas de usuarios';
