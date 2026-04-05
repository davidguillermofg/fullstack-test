package com.gapsi.ecommerce.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Registra en log cada petición HTTP entrante (antes y después del handler) con método, ruta y código de respuesta.
 */
@Slf4j
@Component
public class IncomingRequestLoggingInterceptor implements HandlerInterceptor {

    private static final String START_NS = IncomingRequestLoggingInterceptor.class.getName() + ".startNs";

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler) {
        request.setAttribute(START_NS, System.nanoTime());
        String qs = request.getQueryString();
        String pathWithQuery = request.getRequestURI() + (StringUtils.hasText(qs) ? "?" + qs : "");
        log.info("→ {} {}", request.getMethod(), pathWithQuery);
        return true;
    }

    @Override
    public void afterCompletion(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler,
            @Nullable Exception ex) {
        Long startNs = (Long) request.getAttribute(START_NS);
        long elapsedMs = startNs != null ? (System.nanoTime() - startNs) / 1_000_000L : -1L;
        log.info(
                "← {} {} status={} {}ms",
                request.getMethod(),
                request.getRequestURI(),
                response.getStatus(),
                elapsedMs);
    }
}
