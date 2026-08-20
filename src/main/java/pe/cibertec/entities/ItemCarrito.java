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

    @Column(name = "producto_id", nullable = false)
    private Long productoId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "producto_id",
            insertable = false,
            updatable = false
    )
    private Producto producto;

    @Column(name = "nombre_producto", nullable = false, length = 120)
    private String nombreProducto;

    @Column(name = "precio_unitario", nullable = false)
    private Double precioUnitario;

    @Column(nullable = false)
    private Integer cantidad;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "carrito_id", nullable = false)
    @JsonIgnore
    private Carrito carrito;

    public Double calcularSubtotal() {

        if (precioUnitario == null || cantidad == null) {
            return 0.0;
        }

        return precioUnitario * cantidad;
    }
}