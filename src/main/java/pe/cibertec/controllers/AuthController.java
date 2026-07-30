package pe.cibertec.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.cibertec.dto.LoginRequest;
import pe.cibertec.entities.Usuario;
import pe.cibertec.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        Usuario usuario = usuarioRepository.findByUsername(loginRequest.getUsername()).orElse(null);

        if(usuario == null || !usuario.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(401).body("Credenciales invalidas");
        }

        return ResponseEntity.ok(usuario);
    }
}
