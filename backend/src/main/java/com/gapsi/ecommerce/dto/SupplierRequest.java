package com.gapsi.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 200)
    private String nombre;

    @NotBlank(message = "La razón social es obligatoria")
    @Size(max = 300)
    private String razonSocial;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 500)
    private String direccion;
}
