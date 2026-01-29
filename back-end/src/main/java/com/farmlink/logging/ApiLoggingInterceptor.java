
package com.farmlink.logging;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import com.farmlink.dto.LogRequestDto;
import com.farmlink.security.UserPrincipal;

@Component
public class ApiLoggingInterceptor implements HandlerInterceptor {

    private final RestTemplate restTemplate;

    public ApiLoggingInterceptor(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                Exception ex) {

        String apiPath = request.getRequestURI();
        String method = request.getMethod();
        int status = response.getStatus();

        String userInfo = "ANONYMOUS";

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null
                && auth.isAuthenticated()
                && auth.getPrincipal() instanceof UserPrincipal principal) {

            userInfo = "UserId=" + principal.getUserId()
                    + ", Role=" + principal.getUserRole();
        }

        String logMessage =
                "API: " + method + " " + apiPath +
                " | Status=" + status +
                " | " + userInfo;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        LogRequestDto body = new LogRequestDto(logMessage);

        HttpEntity<LogRequestDto> entity =
                new HttpEntity<>(body, headers);

        restTemplate.postForObject(
                "http://localhost:5275/logger",
                entity,
                String.class
        );
    }
}

