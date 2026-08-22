-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2026 at 05:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `four_ways`
--

-- --------------------------------------------------------

--
-- Table structure for table `carritos`
--

CREATE TABLE `carritos` (
  `id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_modificacion` datetime NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carritos`
--

INSERT INTO `carritos` (`id`, `usuario_id`, `fecha_creacion`, `fecha_modificacion`, `estado`) VALUES
(1, 1, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ACTIVO'),
(2, 2, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ACTIVO'),
(3, 3, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'FINALIZADO'),
(4, 4, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ABANDONADO'),
(5, 5, '2026-08-21 10:44:09', '2026-08-21 10:44:09', 'ACTIVO');

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(5, 'Accesorios'),
(3, 'Camisas'),
(2, 'Chaquetas'),
(4, 'Jeans'),
(1, 'Polos');

-- --------------------------------------------------------

--
-- Table structure for table `items_carrito`
--

CREATE TABLE `items_carrito` (
  `id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  `nombre_producto` varchar(120) NOT NULL,
  `precio_unitario` double NOT NULL,
  `cantidad` int(11) NOT NULL,
  `carrito_id` bigint(20) NOT NULL
) ;

--
-- Dumping data for table `items_carrito`
--

INSERT INTO `items_carrito` (`id`, `producto_id`, `nombre_producto`, `precio_unitario`, `cantidad`, `carrito_id`) VALUES
(1, 1, 'Polo básico negro', 39.9, 2, 1),
(2, 2, 'Jean slim azul', 129.9, 1, 2),
(3, 3, 'Casaca denim clásica', 149.9, 1, 3),
(4, 4, 'Vestido floral midi', 119.9, 1, 4),
(5, 5, 'Gorra urbana beige', 59.9, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `marca` varchar(80) NOT NULL,
  `categoria_id` bigint(20) NOT NULL,
  `precio` double NOT NULL,
  `stock` int(11) NOT NULL,
  `talla` varchar(15) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'DISPONIBLE',
  `version` int(11) DEFAULT 0,
  `imagen` varchar(255) NOT NULL
) ;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `marca`, `categoria_id`, `precio`, `stock`, `talla`, `estado`, `version`, `imagen`) VALUES
(1, 'Polo\r\n', 'Four Ways', 1, 39.9, 25, 'M', 'DISPONIBLE', 0, 'assets/img/polo1.png'),
(2, 'Chaqueta\r\n', 'Four Ways', 2, 129.9, 18, '32', 'DISPONIBLE', 0, 'assets/img/chaqueta1.png'),
(3, 'Camisa\r\n', 'Four Ways', 3, 149.9, 10, 'L', 'DISPONIBLE', 0, 'assets/img/camisa1.png'),
(4, 'Jean', 'Four Ways', 4, 119.9, 12, 'S', 'DISPONIBLE', 0, 'assets/img/jean1.png'),
(5, 'gorro', 'Four Ways\r\n', 5, 59.9, 30, 'UNICA', 'DISPONIBLE', 0, 'assets/img/gorra.png');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `username`, `password`, `nombre`, `rol`) VALUES
(1, 'admin', 'admin123', 'Administrador Four Ways', 'ADMIN'),
(2, 'deyvis', 'deyvis123', 'Deyvis', 'CLIENTE'),
(3, 'ana', 'ana123', 'Ana Torres', 'CLIENTE'),
(4, 'luis', 'luis123', 'Luis Ramos', 'CLIENTE'),
(5, 'sofia', 'sofia123', 'Sofía Vega', 'CLIENTE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carritos_usuario` (`usuario_id`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_categorias_nombre` (`nombre`);

--
-- Indexes for table `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_items_carrito_producto` (`producto_id`),
  ADD KEY `fk_items_carrito_carrito` (`carrito_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productos_categoria` (`categoria_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `uk_usuarios_username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `items_carrito`
--
ALTER TABLE `items_carrito`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `fk_carritos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Constraints for table `items_carrito`
--
ALTER TABLE `items_carrito`
  ADD CONSTRAINT `fk_items_carrito_carrito` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`),
  ADD CONSTRAINT `fk_items_carrito_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
