package pe.cibertec.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "items_carrito")
public class ItemCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Se conserva el identificador para que el endpoint reciba {"productoId": 1}.
     * La asociación de solo lectura permite a JPA generar la clave foránea a productos.
     */
    @Column(name = "producto_id", nullable = false)
    private Long productoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", insertable = false, updatable = false)
    @JsonIgnore
    private Producto producto;

    @Column(nullable = false, length = 120)
    private String nombreProducto;

    @Column(nullable = false)
    private Double precioUnitario;

    @Column(nullable = false)
    private Integer cantidad;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "carrito_id", nullable = false)
    @JsonIgnore
    private Carrito carrito;

    public Double calcularSubtotal() {
        if (precioUnitario != null && cantidad != null) {
            return precioUnitario * cantidad;
        }
        return 0.0;
    }
}
