package pe.cibertec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cibertec.entities.Producto;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    List<Producto> findByCategoriaId(Long categoriaId);

    List<Producto> findByEstado(String estado);
}
