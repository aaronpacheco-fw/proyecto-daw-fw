package pe.cibertec.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.dto.ProductoRequest;
import pe.cibertec.entities.Producto;
import pe.cibertec.service.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // GET - Listar todos los productos
    @GetMapping
    public ResponseEntity<List<Producto>> listar() {

        List<Producto> productos =
                productoService.listarTodos();

        if (productos.isEmpty()) {
            return ResponseEntity.ok(productos);
        }

        return ResponseEntity.ok(productos);
    }

    // GET - Buscar producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(
            @PathVariable Long id) {

        Producto producto =
                productoService.buscarPorId(id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(producto);
    }

    // GET - Buscar productos por nombre
    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<List<Producto>> buscarPorNombre(
            @PathVariable String nombre) {

        List<Producto> productos =
                productoService.buscar(nombre);

        if (productos.isEmpty()) {
            return ResponseEntity.ok(productos);
        }

        return ResponseEntity.ok(productos);
    }

    // GET - Listar productos por categoría
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Producto>> listarPorCategoria(
            @PathVariable Long categoriaId) {

        List<Producto> productos =
                productoService.listarPorCategoria(categoriaId);

        if (productos.isEmpty()) {
            return ResponseEntity.ok(productos);
        }

        return ResponseEntity.ok(productos);
    }

    // POST - Crear producto
    @PostMapping
    public ResponseEntity<?> crear(
            @Valid @RequestBody ProductoRequest request) {

        try {

            Producto producto =
                    productoService.crear(request);

            return ResponseEntity.ok(producto);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // PUT - Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ProductoRequest request) {

        try {

            Producto producto =
                    productoService.actualizar(id, request);

            return ResponseEntity.ok(producto);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    // DELETE - Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(
            @PathVariable Long id) {

        boolean eliminado =
                productoService.eliminar(id);

        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Producto eliminado satisfactoriamente."
        );
    }
}