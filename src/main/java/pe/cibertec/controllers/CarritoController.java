package pe.cibertec.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.entities.Carrito;
import pe.cibertec.entities.ItemCarrito;
import pe.cibertec.entities.Usuario;
import pe.cibertec.repository.CarritoRepository;
import pe.cibertec.repository.ItemCarritoRepository;
import pe.cibertec.repository.UsuarioRepository;

import java.util.List;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {
    private final UsuarioRepository usuarioRepository;
    private final CarritoRepository carritoRepository;
    private final ItemCarritoRepository itemCarritoRepository;

    public CarritoController(UsuarioRepository usuarioRepository, CarritoRepository carritoRepository, ItemCarritoRepository itemCarritoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.carritoRepository = carritoRepository;
        this.itemCarritoRepository = itemCarritoRepository;
    }

    @PostMapping("{idUsuario}/crear")
    public ResponseEntity<?> crear(@PathVariable Long idUsuario, @RequestBody Carrito carrito){
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        if(usuario == null){
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        carrito.setUsuario(usuario);
        return ResponseEntity.ok(carritoRepository.save(carrito));
    }

    @PostMapping("{idCarrito}/agregar-item")
    public ResponseEntity<?> agregarItem(@PathVariable Long idCarrito, @RequestBody ItemCarrito itemCarrito){
        Carrito carrito = carritoRepository.findById(idCarrito).orElse(null);
        if(carrito == null){
            return ResponseEntity.notFound().build();
        }
        itemCarrito.setCarrito(carrito);
        return ResponseEntity.ok(itemCarritoRepository.save(itemCarrito));
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Carrito> historial(@PathVariable Long idUsuario){
        return carritoRepository.findByUsuarioIdUsuario(idUsuario);
    }

    @GetMapping("/{idCarrito}")
    public ResponseEntity<Carrito> obtener(@PathVariable Long idCarrito){
        return carritoRepository.findById(idCarrito)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{idCarrito}")
    public ResponseEntity<?> eliminar(@PathVariable Long idCarrito){
        if(carritoRepository.existsById(idCarrito)){
            carritoRepository.deleteById(idCarrito);
            return ResponseEntity.ok("Carrito eliminado satisfactoriamente.");
        }
        return ResponseEntity.notFound().build();
    }
}
