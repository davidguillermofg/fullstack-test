package com.gapsi.ecommerce.controller;

import com.gapsi.ecommerce.dto.AppInfoResponse;
import com.gapsi.ecommerce.service.AppInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/app")
@RequiredArgsConstructor
public class AppInfoController {

    private final AppInfoService appInfoService;

    /**
     * Mensaje de bienvenida y versión en una sola respuesta.
     */
    @GetMapping("/info")
    public AppInfoResponse info() {
        return appInfoService.getAppInfo();
    }
}
