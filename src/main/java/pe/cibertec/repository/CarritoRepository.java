package pe.cibertec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cibertec.entities.Carrito;

import java.util.List;
import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {

    List<Carrito> findByUsuarioIdUsuario(Long idUsuario);

    Optional<Carrito> findByIdAndUsuarioIdUsuario(
            Long idCarrito,
            Long idUsuario
    );

    List<Carrito> findByEstado(String estado);
}