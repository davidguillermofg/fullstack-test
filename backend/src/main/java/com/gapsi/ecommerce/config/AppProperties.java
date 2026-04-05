package com.gapsi.ecommerce.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Configuración externa de textos de la aplicación (application.properties).
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String welcomeMessage = "Bienvenido";
    private String version = "0.0.1";
}
