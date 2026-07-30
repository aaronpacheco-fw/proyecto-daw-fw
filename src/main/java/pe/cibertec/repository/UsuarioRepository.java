package pe.cibertec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cibertec.entities.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByUsername(String username);
}
