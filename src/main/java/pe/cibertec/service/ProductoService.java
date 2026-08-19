package pe.cibertec.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.cibertec.entities.Producto;
import pe.cibertec.repository.ProductoRepository;

import java.util.List;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    @PersistenceContext
    private EntityManager em;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }


    @Transactional
    public void registrarLote(List<Producto> productos){
        int i = 0;
        for(Producto p: productos){
            em.persist(p);
            i++;
            if (i % 10 == 0){
                em.flush();
                em.clear();
            }
        }
    }

    public List<Producto> ListarTodos() {
        return productoRepository.findAll();
    }

    public List<Producto> buscar(String nombre) {
        return productoRepository.findByNombre(nombre);
    }
}
