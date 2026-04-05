package com.gapsi.ecommerce.dto;

import com.gapsi.ecommerce.entity.Supplier;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Patrón de diseño: <strong>DTO (Data Transfer Object)</strong> — contrato de la API
 * separado del modelo de persistencia.
 * <p>
 * Patrón de diseño: <strong>Factory Method</strong> — {@link #fromEntity(Supplier)} crea el DTO
 * a partir de la entidad sin exponer el modelo JPA al controlador.
 */
@Getter
@Setter
@NoArgsConstructor
public class SupplierResponse {

    private Long id;
    private String nombre;
    private String razonSocial;
    private String direccion;

    public static SupplierResponse fromEntity(Supplier entity) {
        SupplierResponse dto = new SupplierResponse();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setRazonSocial(entity.getRazonSocial());
        dto.setDireccion(entity.getDireccion());
        return dto;
    }
}
