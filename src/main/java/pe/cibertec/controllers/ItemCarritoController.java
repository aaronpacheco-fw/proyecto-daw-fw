package pe.cibertec.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.dto.ItemCarritoRequest;
import pe.cibertec.entities.ItemCarrito;
import pe.cibertec.service.ItemCarritoService;

import java.util.List;

@RestController
@RequestMapping("/api/items-carrito")
public class ItemCarritoController {

    private final ItemCarritoService itemCarritoService;

    public ItemCarritoController(
            ItemCarritoService itemCarritoService) {

        this.itemCarritoService = itemCarritoService;
    }

    // POST - Agregar producto al carrito
    @PostMapping("/carrito/{idCarrito}")
    public ResponseEntity<?> agregarItem(
            @PathVariable Long idCarrito,
            @Valid @RequestBody ItemCarritoRequest request) {

        try {

            ItemCarrito item =
                    itemCarritoService.agregarItem(
                            idCarrito,
                            request
                    );

            return ResponseEntity.ok(item);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // GET - Listar items de un carrito
    @GetMapping("/carrito/{idCarrito}")
    public ResponseEntity<?> listarPorCarrito(
            @PathVariable Long idCarrito) {

        try {

            List<ItemCarrito> items =
                    itemCarritoService
                            .listarPorCarrito(idCarrito);

            if (items.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(items);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // GET - Obtener item por ID
    @GetMapping("/{id}")
    public ResponseEntity<ItemCarrito> obtenerPorId(
            @PathVariable Long id) {

        ItemCarrito item =
                itemCarritoService.obtenerPorId(id);

        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(item);
    }

    // PUT - Actualizar cantidad
    @PutMapping("/{id}/cantidad")
    public ResponseEntity<?> actualizarCantidad(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {

        try {

            ItemCarrito item =
                    itemCarritoService.actualizarCantidad(
                            id,
                            cantidad
                    );

            return ResponseEntity.ok(item);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // DELETE - Eliminar item
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(
            @PathVariable Long id) {

        try {

            boolean eliminado =
                    itemCarritoService.eliminar(id);

            if (!eliminado) {
                return ResponseEntity
                        .notFound()
                        .build();
            }

            return ResponseEntity.ok(
                    "Item eliminado satisfactoriamente."
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}