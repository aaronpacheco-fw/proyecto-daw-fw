package pe.cibertec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.cibertec.entities.ItemCarrito;

import java.util.List;

public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Long> {
    List<ItemCarrito> findByCarritoId(Long carritoId);
    List<ItemCarrito> findByProductoId(Long productoId);
}
