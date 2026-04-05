package com.gapsi.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer(CorsProperties corsProperties) {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                var registration = registry.addMapping(corsProperties.getPathPattern());
                if (!corsProperties.getAllowedOrigins().isEmpty()) {
                    registration.allowedOrigins(
                            corsProperties.getAllowedOrigins().toArray(new String[0])
                    );
                }
                registration.allowedMethods(
                        corsProperties.getAllowedMethods().toArray(new String[0])
                );
                registration.allowedHeaders(
                        corsProperties.getAllowedHeaders().toArray(new String[0])
                );
            }
        };
    }

    /**
     * Log de peticiones entrantes vía SLF4J (solo rutas API, no h2/actuator estáticos).
     */
    @Bean
    public WebMvcConfigurer incomingRequestLoggingConfigurer(IncomingRequestLoggingInterceptor interceptor) {
        return new WebMvcConfigurer() {
            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(interceptor).addPathPatterns("/api/**");
            }
        };
    }
}
