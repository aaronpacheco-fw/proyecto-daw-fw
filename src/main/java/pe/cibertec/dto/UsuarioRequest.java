package pe.cibertec.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class UsuarioRequest {

    @NotBlank(message = "El username es obligatorio")
    @Size(max = 50, message = "El username no puede superar los 50 caracteres")
    private String username;

    @NotBlank(message = "El password es obligatorio")
    @Size(max = 100, message = "El password no puede superar los 100 caracteres")
    private String password;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String nombre;

    @NotBlank(message = "El rol es obligatorio")
    @Size(max = 30, message = "El rol no puede superar los 30 caracteres")
    private String rol;
}