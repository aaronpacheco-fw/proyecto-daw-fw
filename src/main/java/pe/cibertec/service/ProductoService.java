package pe.cibertec.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.cibertec.dto.ProductoRequest;
import pe.cibertec.entities.Categoria;
import pe.cibertec.entities.Producto;
import pe.cibertec.repository.CategoriaRepository;
import pe.cibertec.repository.ProductoRepository;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    @PersistenceContext
    private EntityManager em;

    public ProductoService(
            ProductoRepository productoRepository,
            CategoriaRepository categoriaRepository) {

        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    // LISTAR TODOS
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    // BUSCAR POR ID
    public Producto buscarPorId(Long id) {
        return productoRepository.findById(id).orElse(null);
    }

    // BUSCAR POR NOMBRE
    public List<Producto> buscar(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    // BUSCAR POR CATEGORÍA
    public List<Producto> listarPorCategoria(Long categoriaId) {
        return productoRepository.findByCategoriaId(categoriaId);
    }

    // CREAR PRODUCTO
    public Producto crear(ProductoRequest request) {

        Categoria categoria = categoriaRepository
                .findById(request.getCategoriaId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "La categoría con ID "
                                        + request.getCategoriaId()
                                        + " no existe"
                        ));

        Producto producto = new Producto();

        producto.setNombre(request.getNombre());
        producto.setMarca(request.getMarca());
        producto.setCategoria(categoria);
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setTalla(request.getTalla());

        if (request.getEstado() == null ||
                request.getEstado().trim().isEmpty()) {

            producto.setEstado("DISPONIBLE");

        } else {

            producto.setEstado(request.getEstado());
        }

        return productoRepository.save(producto);
    }

    // ACTUALIZAR PRODUCTO
    public Producto actualizar(Long id, ProductoRequest request) {

        Producto producto = productoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado"
                        ));

        Categoria categoria = categoriaRepository
                .findById(request.getCategoriaId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "La categoría con ID "
                                        + request.getCategoriaId()
                                        + " no existe"
                        ));

        producto.setNombre(request.getNombre());
        producto.setMarca(request.getMarca());
        producto.setCategoria(categoria);
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setTalla(request.getTalla());

        if (request.getEstado() != null &&
                !request.getEstado().trim().isEmpty()) {

            producto.setEstado(request.getEstado());
        }

        return productoRepository.save(producto);
    }

    // ELIMINAR PRODUCTO
    public boolean eliminar(Long id) {

        if (!productoRepository.existsById(id)) {
            return false;
        }

        productoRepository.deleteById(id);

        return true;
    }

    // REGISTRAR PRODUCTOS EN LOTE
    @Transactional
    public void registrarLote(List<Producto> productos) {

        int i = 0;

        for (Producto producto : productos) {

            em.persist(producto);

            i++;

            if (i % 10 == 0) {
                em.flush();
                em.clear();
            }
        }
    }
}
