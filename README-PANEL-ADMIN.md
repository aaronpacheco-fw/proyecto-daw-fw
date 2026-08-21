# Panel Administrativo Four Ways — Guía rápida

## Qué se agregó/modificó

### Backend (Spring Boot)
- `UsuarioController`: se agregaron GET /{id}, PUT /{id} y DELETE /{id} para poder
  editar y eliminar trabajadores desde el panel (antes solo existían registrar y listar).
- `CarritoController` + `CarritoService`: se agregó GET /api/carritos (listar todas las
  compras), necesario para el módulo de Gestión de Compra.

### Frontend (Angular, carpeta frontend-angular)
- Se corrigieron imports rotos en `models/` y `services/` que apuntaban a una ruta
  de `Downloads` que no existe en este proyecto.
- Se corrigió el modelo `ItemCarrito` para que coincida con el JSON real que
  devuelve el backend (nombreProducto, precioUnitario, productoId).
- Nuevo `AuthService` (guarda la sesión del trabajador logueado) y `authGuard`
  (protege las rutas /admin/**).
- Nuevo layout `admin-layout` con la barra de navegación (Panel principal,
  Trabajadores, Productos, Almacén, Compras) y botón Salir.
- Login conectado al endpoint real POST /api/auth/login.
- 5 módulos nuevos en `src/app/pages/`:
  - `dashboard`      -> Panel principal (resumen + stock bajo)
  - `trabajadores`   -> CRUD de usuarios/trabajadores
  - `productos-admin`-> CRUD de productos (con categoría, búsqueda)
  - `almacen`        -> Vista de inventario, filtro de stock bajo, edición rápida de stock
  - `compras`        -> Listado de compras (carritos), ver detalle de items, cambiar estado, eliminar

## Cómo ejecutarlo

1. Base de datos: ejecuta `database/four_ways.sql` en MySQL Workbench (sin cambios).
2. Backend:
   ```
   cd TF
   mvn spring-boot:run
   ```
   Corre en http://localhost:8080

3. Frontend:
   ```
   cd frontend-angular
   npm install
   npm start
   ```
   Corre en http://localhost:4200 — abre esa URL y entra con:
   usuario: `admin` / clave: `admin123` (dato de prueba del script SQL).

## Notas
- El campo "categoría" del producto usa el `id` de la tabla `categorias`
  (Polos, Pantalones, Casacas, Vestidos, Accesorios en los datos de prueba).
- "Gestión de Trabajadores" administra la tabla `usuarios` completa (incluye
  también los roles CLIENTE que ya existan); se agregaron los roles VENDEDOR y
  ALMACENERO como opciones típicas de personal interno, edítalos en
  `trabajadores.ts` (`roles = [...]`) si tu negocio usa otros nombres.
- "Gestión de Compra" muestra todas las compras (carritos) de todos los
  usuarios, con su detalle de productos y total calculado en el frontend
  (el backend no expone un campo "total" directamente).
- El umbral de "stock bajo" es 10 unidades; se puede cambiar la constante
  `STOCK_BAJO_LIMITE` en `dashboard.ts` y `almacen.ts`.
