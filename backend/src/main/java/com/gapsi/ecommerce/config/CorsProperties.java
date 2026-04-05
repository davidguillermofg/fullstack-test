package com.gapsi.ecommerce.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

/**
 * CORS definido en {@code application.properties} bajo el prefijo {@code app.cors}.
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {

    /** Patrón de rutas donde aplica CORS (ej. {@code /api/**}). */
    private String pathPattern = "/api/**";

    /** Orígenes permitidos (p. ej. front Vite en desarrollo). */
    private List<String> allowedOrigins = new ArrayList<>();

    private List<String> allowedMethods = List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");

    private List<String> allowedHeaders = List.of("*");
}
