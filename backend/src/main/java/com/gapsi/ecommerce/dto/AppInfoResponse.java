package com.gapsi.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Respuesta unificada: mensaje de bienvenida y versión de la aplicación.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppInfoResponse {

    private String message;
    private String version;
}
