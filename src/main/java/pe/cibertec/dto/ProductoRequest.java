package pe.cibertec.dto;

import lombok.Data;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
public class ProductoRequest {

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 120, message = "El nombre no puede superar los 120 caracteres")
    private String nombre;

    @NotBlank(message = "La marca es obligatoria")
    @Size(max = 80, message = "La marca no puede superar los 80 caracteres")
    private String marca;

    @NotNull(message = "La categoría es obligatoria")
    private Long categoriaId;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", message = "El precio no puede ser negativo")
    private Double precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    @NotBlank(message = "La talla es obligatoria")
    @Size(max = 15, message = "La talla no puede superar los 15 caracteres")
    private String talla;

    @Size(max = 20, message = "El estado no puede superar los 20 caracteres")
    private String estado;

}
