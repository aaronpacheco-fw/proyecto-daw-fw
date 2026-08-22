package pe.cibertec.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.entities.Categoria;
import pe.cibertec.repository.CategoriaRepository;
import pe.cibertec.service.CategoriaService;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }


    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {

        List<Categoria> categorias = categoriaService.listarTodas();

        if (categorias.isEmpty()) {
            return ResponseEntity.ok(categorias);
        }

        return ResponseEntity.ok(categorias);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(
            @PathVariable Long id) {

        return categoriaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/buscar")
    public ResponseEntity<List<Categoria>> buscarPorNombre(
            @RequestParam String nombre) {

        List<Categoria> resultados =
                categoriaService.buscarPorNombre(nombre);

        if (resultados.isEmpty()) {
            return ResponseEntity.ok(resultados);
        }

        return ResponseEntity.ok(resultados);
    }


    @PostMapping
    public ResponseEntity<Categoria> crear(
            @Valid @RequestBody Categoria categoria) {

        Categoria nuevaCategoria =
                categoriaService.crear(categoria);

        return ResponseEntity.ok(nuevaCategoria);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Categoria categoria) {

        return categoriaService.actualizar(id, categoria)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(
            @PathVariable Long id) {

        boolean eliminado = categoriaService.eliminar(id);

        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Categoría eliminada exitosamente"
        );
    }



}
