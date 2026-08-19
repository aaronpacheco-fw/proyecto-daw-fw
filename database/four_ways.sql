-- Base de datos inicial del proyecto Four Ways (tienda de ropa).
-- Ejecútalo completo en MySQL Workbench antes de iniciar el backend.

CREATE DATABASE IF NOT EXISTS four_ways
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE four_ways;

DROP TABLE IF EXISTS items_carrito;
DROP TABLE IF EXISTS carritos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id_usuario BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_usuario),
    CONSTRAINT uk_usuarios_username UNIQUE (username)
) ENGINE=InnoDB;

CREATE TABLE categorias (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_categorias_nombre UNIQUE (nombre)
) ENGINE=InnoDB;

CREATE TABLE productos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(120) NOT NULL,
    marca VARCHAR(80) NOT NULL,
    categoria_id BIGINT NOT NULL,
    precio DOUBLE NOT NULL,
    stock INT NOT NULL,
    talla VARCHAR(15) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE',
    version INT DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_productos_categoria
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    CONSTRAINT ck_productos_precio CHECK (precio >= 0),
    CONSTRAINT ck_productos_stock CHECK (stock >= 0)
) ENGINE=InnoDB;

CREATE TABLE carritos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    fecha_modificacion DATETIME NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    PRIMARY KEY (id),
    CONSTRAINT fk_carritos_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE items_carrito (
    id BIGINT NOT NULL AUTO_INCREMENT,
    producto_id BIGINT NOT NULL,
    nombre_producto VARCHAR(120) NOT NULL,
    precio_unitario DOUBLE NOT NULL,
    cantidad INT NOT NULL,
    carrito_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_items_carrito_producto
        FOREIGN KEY (producto_id) REFERENCES productos(id),
    CONSTRAINT fk_items_carrito_carrito
        FOREIGN KEY (carrito_id) REFERENCES carritos(id),
    CONSTRAINT ck_items_carrito_precio CHECK (precio_unitario >= 0),
    CONSTRAINT ck_items_carrito_cantidad CHECK (cantidad > 0)
) ENGINE=InnoDB;

-- Datos de prueba: cinco registros por tabla.
INSERT INTO categorias (nombre) VALUES
    ('Polos'),
    ('Pantalones'),
    ('Casacas'),
    ('Vestidos'),
    ('Accesorios');

INSERT INTO usuarios (username, password, nombre, rol) VALUES
    ('admin', 'admin123', 'Administrador Four Ways', 'ADMIN'),
    ('deyvis', 'deyvis123', 'Deyvis', 'CLIENTE'),
    ('ana', 'ana123', 'Ana Torres', 'CLIENTE'),
    ('luis', 'luis123', 'Luis Ramos', 'CLIENTE'),
    ('sofia', 'sofia123', 'Sofía Vega', 'CLIENTE');

INSERT INTO productos (nombre, marca, categoria_id, precio, stock, talla, estado) VALUES
    ('Polo básico negro', 'Four Ways', 1, 39.90, 25, 'M', 'DISPONIBLE'),
    ('Jean slim azul', 'Levis', 2, 129.90, 18, '32', 'DISPONIBLE'),
    ('Casaca denim clásica', 'Four Ways', 3, 149.90, 10, 'L', 'DISPONIBLE'),
    ('Vestido floral midi', 'Zara', 4, 119.90, 12, 'S', 'DISPONIBLE'),
    ('Gorra urbana beige', 'Nike', 5, 59.90, 30, 'UNICA', 'DISPONIBLE');

INSERT INTO carritos (usuario_id, fecha_creacion, fecha_modificacion, estado) VALUES
    (1, NOW(), NOW(), 'ACTIVO'),
    (2, NOW(), NOW(), 'ACTIVO'),
    (3, NOW(), NOW(), 'FINALIZADO'),
    (4, NOW(), NOW(), 'ABANDONADO'),
    (5, NOW(), NOW(), 'ACTIVO');

INSERT INTO items_carrito (producto_id, nombre_producto, precio_unitario, cantidad, carrito_id) VALUES
    (1, 'Polo básico negro', 39.90, 2, 1),
    (2, 'Jean slim azul', 129.90, 1, 2),
    (3, 'Casaca denim clásica', 149.90, 1, 3),
    (4, 'Vestido floral midi', 119.90, 1, 4),
    (5, 'Gorra urbana beige', 59.90, 2, 5);
