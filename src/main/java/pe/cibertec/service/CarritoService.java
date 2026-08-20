package pe.cibertec.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.cibertec.entities.Carrito;
import pe.cibertec.entities.Usuario;
import pe.cibertec.repository.CarritoRepository;
import pe.cibertec.repository.UsuarioRepository;

import java.util.List;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;

    public CarritoService(
            CarritoRepository carritoRepository,
            UsuarioRepository usuarioRepository) {

        this.carritoRepository = carritoRepository;
        this.usuarioRepository = usuarioRepository;
    }


    @Transactional
    public Carrito crearCarrito(Long idUsuario) {

        Usuario usuario = usuarioRepository
                .findById(idUsuario)
                .orElseThrow(() ->
                        new RuntimeException(
                                "El usuario con ID "
                                        + idUsuario
                                        + " no existe"
                        ));

        Carrito carrito = new Carrito();

        carrito.setUsuario(usuario);
        carrito.setEstado("ACTIVO");

        return carritoRepository.save(carrito);
    }


    public Carrito obtenerCarrito(Long id) {

        return carritoRepository
                .findById(id)
                .orElse(null);
    }


    public List<Carrito> obtenerCarritosPorUsuario(
            Long idUsuario) {

        if (!usuarioRepository.existsById(idUsuario)) {
            throw new RuntimeException(
                    "El usuario con ID "
                            + idUsuario
                            + " no existe"
            );
        }

        return carritoRepository
                .findByUsuarioIdUsuario(idUsuario);
    }


    @Transactional
    public boolean eliminarCarrito(Long id) {

        if (!carritoRepository.existsById(id)) {
            return false;
        }

        carritoRepository.deleteById(id);

        return true;
    }


    @Transactional
    public Carrito cambiarEstado(
            Long id,
            String nuevoEstado) {

        Carrito carrito = carritoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Carrito no encontrado"
                        ));

        if (!nuevoEstado.equals("ACTIVO")
                && !nuevoEstado.equals("FINALIZADO")
                && !nuevoEstado.equals("ABANDONADO")) {

            throw new RuntimeException(
                    "Estado no válido. Use ACTIVO, FINALIZADO o ABANDONADO"
            );
        }

        carrito.setEstado(nuevoEstado);

        return carritoRepository.save(carrito);
    }
}