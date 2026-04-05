package com.gapsi.ecommerce.service;

import com.gapsi.ecommerce.config.AppProperties;
import com.gapsi.ecommerce.dto.AppInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppInfoService {

    private final AppProperties appProperties;

    public AppInfoResponse getAppInfo() {
        return new AppInfoResponse(
                appProperties.getWelcomeMessage(),
                appProperties.getVersion()
        );
    }
}
