package pe.cibertec.service;

import org.springframework.stereotype.Service;
import pe.cibertec.entities.Categoria;
import pe.cibertec.repository.CategoriaRepository;

import java.util.List;
import java.util.Optional;
@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }


    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }


    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }


    public Categoria crear(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }


    public Optional<Categoria> actualizar(Long id, Categoria nuevaCategoria) {

        return categoriaRepository.findById(id).map(categoria -> {

            if (nuevaCategoria.getNombre() != null &&
                    !nuevaCategoria.getNombre().trim().isEmpty()) {

                categoria.setNombre(nuevaCategoria.getNombre().trim());
            }

            return categoriaRepository.save(categoria);
        });
    }


    public boolean eliminar(Long id) {

        if (!categoriaRepository.existsById(id)) {
            return false;
        }

        categoriaRepository.deleteById(id);
        return true;
    }


    public List<Categoria> buscarPorNombre(String nombre) {
        return categoriaRepository.findByNombreContainingIgnoreCase(nombre);
    }
}

