package pe.cibertec.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.cibertec.dto.ItemCarritoRequest;
import pe.cibertec.entities.Carrito;
import pe.cibertec.entities.ItemCarrito;
import pe.cibertec.entities.Producto;
import pe.cibertec.repository.CarritoRepository;
import pe.cibertec.repository.ItemCarritoRepository;
import pe.cibertec.repository.ProductoRepository;

import java.util.List;

@Service
public class ItemCarritoService {

    private final ItemCarritoRepository itemCarritoRepository;
    private final CarritoRepository carritoRepository;
    private final ProductoRepository productoRepository;

    public ItemCarritoService(
            ItemCarritoRepository itemCarritoRepository,
            CarritoRepository carritoRepository,
            ProductoRepository productoRepository) {

        this.itemCarritoRepository = itemCarritoRepository;
        this.carritoRepository = carritoRepository;
        this.productoRepository = productoRepository;
    }


    @Transactional
    public ItemCarrito agregarItem(
            Long idCarrito,
            ItemCarritoRequest request) {


        Carrito carrito = carritoRepository
                .findById(idCarrito)
                .orElseThrow(() ->
                        new RuntimeException(
                                "El carrito con ID "
                                        + idCarrito
                                        + " no existe"
                        ));


        if (!"ACTIVO".equalsIgnoreCase(carrito.getEstado())) {
            throw new RuntimeException(
                    "No se pueden agregar productos. " +
                            "El carrito no está ACTIVO."
            );
        }


        Producto producto = productoRepository
                .findById(request.getProductoId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "El producto con ID "
                                        + request.getProductoId()
                                        + " no existe"
                        ));


        if (!"DISPONIBLE".equalsIgnoreCase(producto.getEstado())) {
            throw new RuntimeException(
                    "El producto no está disponible."
            );
        }


        if (producto.getStock() < request.getCantidad()) {
            throw new RuntimeException(
                    "Stock insuficiente. Stock disponible: "
                            + producto.getStock()
            );
        }


        ItemCarrito item = new ItemCarrito();

        item.setCarrito(carrito);
        item.setProductoId(producto.getId());
        item.setProducto(producto);
        item.setNombreProducto(producto.getNombre());
        item.setPrecioUnitario(producto.getPrecio());
        item.setCantidad(request.getCantidad());


        producto.setStock(
                producto.getStock() - request.getCantidad()
        );

        productoRepository.save(producto);


        return itemCarritoRepository.save(item);
    }


    public List<ItemCarrito> listarPorCarrito(
            Long idCarrito) {

        if (!carritoRepository.existsById(idCarrito)) {
            throw new RuntimeException(
                    "El carrito con ID "
                            + idCarrito
                            + " no existe"
            );
        }

        return itemCarritoRepository
                .findByCarritoId(idCarrito);
    }


    public ItemCarrito obtenerPorId(Long id) {

        return itemCarritoRepository
                .findById(id)
                .orElse(null);
    }

    @Transactional
    public ItemCarrito actualizarCantidad(
            Long id,
            Integer nuevaCantidad) {

        if (nuevaCantidad == null || nuevaCantidad <= 0) {
            throw new RuntimeException(
                    "La cantidad debe ser mayor a 0."
            );
        }

        ItemCarrito item = itemCarritoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Item del carrito no encontrado"
                        ));

        Carrito carrito = item.getCarrito();

        if (!"ACTIVO".equalsIgnoreCase(carrito.getEstado())) {
            throw new RuntimeException(
                    "No se puede modificar un carrito que no está ACTIVO."
            );
        }

        Producto producto = productoRepository
                .findById(item.getProductoId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado"
                        ));

        int cantidadAnterior = item.getCantidad();

        int diferencia = nuevaCantidad - cantidadAnterior;


        if (diferencia > 0) {

            if (producto.getStock() < diferencia) {
                throw new RuntimeException(
                        "Stock insuficiente. Stock disponible: "
                                + producto.getStock()
                );
            }

            producto.setStock(
                    producto.getStock() - diferencia
            );
        }


        else if (diferencia < 0) {

            producto.setStock(
                    producto.getStock() + Math.abs(diferencia)
            );
        }

        item.setCantidad(nuevaCantidad);

        productoRepository.save(producto);

        return itemCarritoRepository.save(item);
    }


    @Transactional
    public boolean eliminar(Long id) {

        ItemCarrito item = itemCarritoRepository
                .findById(id)
                .orElse(null);

        if (item == null) {
            return false;
        }

        Carrito carrito = item.getCarrito();


        if (!"ACTIVO".equalsIgnoreCase(carrito.getEstado())) {
            throw new RuntimeException(
                    "No se puede modificar un carrito que no está ACTIVO."
            );
        }


        Producto producto = productoRepository
                .findById(item.getProductoId())
                .orElse(null);

        if (producto != null) {

            producto.setStock(
                    producto.getStock() + item.getCantidad()
            );

            productoRepository.save(producto);
        }

        itemCarritoRepository.delete(item);

        return true;
    }
}
