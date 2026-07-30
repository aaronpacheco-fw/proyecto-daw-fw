package pe.cibertec.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.entities.Categoria;
import pe.cibertec.repository.CategoriaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    private final CategoriaRepository categoriaRepo;

    public CategoriaController(CategoriaRepository categoriaRepo) {
        this.categoriaRepo = categoriaRepo;
    }


    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Categoria categoria) {
        try {
            if (categoria.getNombre() == null || categoria.getNombre().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre de la categoría es requerido");
            }
            Categoria nueva = categoriaRepo.save(categoria);
            return ResponseEntity.ok(nueva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear categoría: " + e.getMessage());
        }
    }


    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {
        List<Categoria> categorias = categoriaRepo.findAll();
        if (categorias.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categorias);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(@PathVariable Long id) {
        return categoriaRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Categoria nuevo) {
        return categoriaRepo.findById(id).map(cat -> {
            if (nuevo.getNombre() != null && !nuevo.getNombre().trim().isEmpty()) {
                cat.setNombre(nuevo.getNombre());
            }
            Categoria actualizada = categoriaRepo.save(cat);
            return ResponseEntity.ok(actualizada);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        if (categoriaRepo.existsById(id)) {
            categoriaRepo.deleteById(id);
            return ResponseEntity.ok("Categoría eliminada exitosamente");
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/buscar")
    public ResponseEntity<List<Categoria>> buscarPorNombre(
            @RequestParam String nombre
    ) {
        List<Categoria> resultados = categoriaRepo.findByNombreContainingIgnoreCase(nombre);
        if (resultados.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(resultados);
    }
}
