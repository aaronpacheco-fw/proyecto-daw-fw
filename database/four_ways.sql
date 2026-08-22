

CREATE DATABASE IF NOT EXISTS four_ways
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE four_ways;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS items_carrito;
DROP TABLE IF EXISTS carritos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE usuarios (
    id_usuario BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_usuario),
    CONSTRAINT uk_usuarios_username UNIQUE (username),
    CONSTRAINT ck_usuarios_rol CHECK (rol IN ('ADMIN', 'VENDEDOR', 'ALMACENERO', 'CLIENTE'))
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE categorias (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_categorias_nombre UNIQUE (nombre)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE productos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(120) NOT NULL,
    marca VARCHAR(80) NOT NULL,
    categoria_id BIGINT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    talla VARCHAR(15) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'DISPONIBLE',
    version INT NOT NULL DEFAULT 0,
    imagen VARCHAR(255) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    CONSTRAINT fk_productos_categoria
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    CONSTRAINT ck_productos_precio CHECK (precio >= 0),
    CONSTRAINT ck_productos_stock CHECK (stock >= 0),
    CONSTRAINT ck_productos_estado CHECK (estado IN ('DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'))
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE carritos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
    PRIMARY KEY (id),
    CONSTRAINT fk_carritos_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario),
    CONSTRAINT ck_carritos_estado CHECK (estado IN ('ACTIVO', 'FINALIZADO', 'ABANDONADO'))
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE items_carrito (
    id BIGINT NOT NULL AUTO_INCREMENT,
    producto_id BIGINT NOT NULL,
    nombre_producto VARCHAR(120) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    carrito_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_items_carrito_producto
        FOREIGN KEY (producto_id) REFERENCES productos(id),
    CONSTRAINT fk_items_carrito_carrito
        FOREIGN KEY (carrito_id) REFERENCES carritos(id),
    CONSTRAINT ck_items_carrito_precio CHECK (precio_unitario >= 0),
    CONSTRAINT ck_items_carrito_cantidad CHECK (cantidad > 0)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- Índices de apoyo para las consultas usadas por el backend.
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_estado ON productos(estado);
CREATE INDEX idx_carritos_usuario ON carritos(usuario_id);
CREATE INDEX idx_carritos_estado ON carritos(estado);
CREATE INDEX idx_items_carrito_carrito ON items_carrito(carrito_id);
CREATE INDEX idx_items_carrito_producto ON items_carrito(producto_id);

-- =============================================================
-- Datos finales de la BD entregada por el usuario
-- =============================================================

INSERT INTO categorias (id, nombre) VALUES
    (1, 'Polos'),
    (2, 'Chaquetas'),
    (3, 'Camisas'),
    (4, 'Jeans'),
    (5, 'Accesorios');

-- Contraseñas de demostración para el proyecto académico.
-- En producción deben almacenarse con hash.
INSERT INTO usuarios (id_usuario, username, password, nombre, rol) VALUES
    (1, 'admin', 'admin123', 'Administrador Four Ways', 'ADMIN'),
    (2, 'deyvis', 'deyvis123', 'Deyvis', 'CLIENTE'),
    (3, 'ana', 'ana123', 'Ana Torres', 'CLIENTE'),
    (4, 'luis', 'luis123', 'Luis Ramos', 'CLIENTE'),
    (5, 'sofia', 'sofia123', 'Sofía Vega', 'CLIENTE');

-- Se limpiaron saltos de línea accidentales del dump original en algunos nombres.
INSERT INTO productos
    (id, nombre, marca, categoria_id, precio, stock, talla, estado, version, imagen)
VALUES
    (1, 'Polo', 'Four Ways', 1, 39.90, 25, 'M', 'DISPONIBLE', 0, 'assets/img/polo1.png'),
    (2, 'Chaqueta', 'Four Ways', 2, 129.90, 18, '32', 'DISPONIBLE', 0, 'assets/img/chaqueta1.png'),
    (3, 'Camisa', 'Four Ways', 3, 149.90, 10, 'L', 'DISPONIBLE', 0, 'assets/img/camisa1.png'),
    (4, 'Jean', 'Four Ways', 4, 119.90, 12, 'S', 'DISPONIBLE', 0, 'assets/img/jean1.png'),
    (5, 'gorro', 'Four Ways', 5, 59.90, 30, 'UNICA', 'DISPONIBLE', 0, 'assets/img/gorra.png');

INSERT INTO carritos
    (id, usuario_id, fecha_creacion, fecha_modificacion, estado)
VALUES
    (1, 1, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ACTIVO'),
    (2, 2, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ACTIVO'),
    (3, 3, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'FINALIZADO'),
    (4, 4, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ABANDONADO'),
    (5, 5, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ACTIVO');

-- nombre_producto conserva el texto histórico del carrito de la BD final.
INSERT INTO items_carrito
    (id, producto_id, nombre_producto, precio_unitario, cantidad, carrito_id)
VALUES
    (1, 1, 'Polo básico negro', 39.90, 2, 1),
    (2, 2, 'Jean slim azul', 129.90, 1, 2),
    (3, 3, 'Casaca denim clásica', 149.90, 1, 3),
    (4, 4, 'Vestido floral midi', 119.90, 1, 4),
    (5, 5, 'Gorra urbana beige', 59.90, 2, 5);


