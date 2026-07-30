package pe.cibertec.service;

import org.springframework.stereotype.Service;
import pe.cibertec.entities.Carrito;
import pe.cibertec.repository.CarritoRepository;

@Service
public class CarritoService {
    private final CarritoRepository carritoRepository;

    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    public Carrito crearCarrito(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public Carrito obtenerCarrito(Long id) {
        return carritoRepository.findById(id).orElse(null);
    }
}
