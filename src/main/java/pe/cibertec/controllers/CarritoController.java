package pe.cibertec.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.entities.Carrito;
import pe.cibertec.service.CarritoService;

import java.util.List;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    // GET - Listar todas las compras (carritos) para el panel de administración
    @GetMapping
    public ResponseEntity<List<Carrito>> listarTodos() {

        List<Carrito> carritos = carritoService.listarTodos();

        if (carritos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(carritos);
    }

    // POST - Crear carrito para un usuario
    @PostMapping("/{idUsuario}/crear")
    public ResponseEntity<?> crear(
            @PathVariable Long idUsuario) {

        try {

            Carrito carrito =
                    carritoService.crearCarrito(idUsuario);

            return ResponseEntity.ok(carrito);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // GET - Obtener carrito por ID
    @GetMapping("/{idCarrito}")
    public ResponseEntity<Carrito> obtener(
            @PathVariable Long idCarrito) {

        Carrito carrito =
                carritoService.obtenerCarrito(idCarrito);

        if (carrito == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(carrito);
    }

    // GET - Obtener carritos de un usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> listarPorUsuario(
            @PathVariable Long idUsuario) {

        try {

            List<Carrito> carritos =
                    carritoService.obtenerCarritosPorUsuario(
                            idUsuario
                    );

            if (carritos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(carritos);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // PUT - Cambiar estado del carrito
    @PutMapping("/{idCarrito}/estado")
    public ResponseEntity<?> cambiarEstado(
            @PathVariable Long idCarrito,
            @RequestParam String estado) {

        try {

            Carrito carrito =
                    carritoService.cambiarEstado(
                            idCarrito,
                            estado.toUpperCase()
                    );

            return ResponseEntity.ok(carrito);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // DELETE - Eliminar carrito
    @DeleteMapping("/{idCarrito}")
    public ResponseEntity<String> eliminar(
            @PathVariable Long idCarrito) {

        boolean eliminado =
                carritoService.eliminarCarrito(idCarrito);

        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Carrito eliminado satisfactoriamente."
        );
    }
}