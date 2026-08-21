package pe.cibertec.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.cibertec.entities.Usuario;
import pe.cibertec.repository.UsuarioRepository;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario){
        Usuario usuarioRegistrado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioRegistrado);
    }

    @GetMapping
    public List<Usuario>listar(){
        return usuarioRepository.findAll();
    }

    // GET - Obtener trabajador/usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id){
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT - Actualizar trabajador/usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Usuario usuario){
        return usuarioRepository.findById(id)
                .<ResponseEntity<?>>map(existente -> {
                    existente.setUsername(usuario.getUsername());
                    existente.setNombre(usuario.getNombre());
                    existente.setRol(usuario.getRol());
                    // Solo se actualiza la clave si se envía un valor nuevo
                    if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
                        existente.setPassword(usuario.getPassword());
                    }
                    Usuario actualizado = usuarioRepository.save(existente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE - Eliminar trabajador/usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id){
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.ok("Usuario eliminado satisfactoriamente.");
    }
}
