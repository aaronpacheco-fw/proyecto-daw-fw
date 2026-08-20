package pe.cibertec.service;

import org.springframework.stereotype.Service;
import pe.cibertec.dto.UsuarioRequest;
import pe.cibertec.entities.Usuario;
import pe.cibertec.repository.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario registrar(UsuarioRequest request) {

        usuarioRepository.findByUsername(request.getUsername())
                .ifPresent(u -> {
                    throw new RuntimeException(
                            "El username '" + request.getUsername() + "' ya está en uso"
                    );
                });

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());
        usuario.setNombre(request.getNombre());
        usuario.setRol(request.getRol());

        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(Long id, UsuarioRequest request) {

        Usuario usuario = usuarioRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setUsername(request.getUsername());
        usuario.setNombre(request.getNombre());
        usuario.setRol(request.getRol());

        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            usuario.setPassword(request.getPassword());
        }

        return usuarioRepository.save(usuario);
    }

    public boolean eliminar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            return false;
        }
        usuarioRepository.deleteById(id);
        return true;
    }
}