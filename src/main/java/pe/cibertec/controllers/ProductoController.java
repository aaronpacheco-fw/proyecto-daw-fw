package pe.cibertec.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.entities.Producto;
import pe.cibertec.repository.ProductoRepository;
import pe.cibertec.service.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    private final ProductoService productoService;
    private final ProductoRepository productoRepository;

    public ProductoController(ProductoService productoService, ProductoRepository productoRepository) {
        this.productoService = productoService;
        this.productoRepository = productoRepository;
    }

    @PostMapping("/lote")
    public ResponseEntity<String> registrarLote(@RequestBody List<Producto> productos){
        productoService.registrarLote(productos);
        return ResponseEntity.ok("Productos registrados satisfactoriamente.");
    }

    @GetMapping("/buscar/{nombre}")
    public List<Producto> buscarPorNombre(@PathVariable String nombre){
        return productoService.buscar(nombre);
    }

    @GetMapping
    public List<Producto> listar(){
        return productoService.ListarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id){
        return productoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto){
        Producto nuevo = productoRepository.save(producto);
        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody Producto producto){
        return productoRepository.findById(id)
                .map(prod -> {
                    prod.setNombre(producto.getNombre());
                    prod.setPrecio(producto.getPrecio());
                    Producto actualizado = productoRepository.save(prod);
                    return ResponseEntity.ok(actualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        if(productoRepository.existsById(id)){
            productoRepository.deleteById(id);
            return ResponseEntity.ok("Producto eliminado satisfactoriamente.");
        }
        return ResponseEntity.notFound().build();
    }
}
