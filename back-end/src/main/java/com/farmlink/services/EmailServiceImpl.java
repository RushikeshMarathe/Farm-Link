package com.farmlink.services;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final RestTemplate restTemplate;

    private static final String EMAIL_API_URL =
            "http://localhost:4000/api/mail"; // Node service

    @Override
    public void sendRegistrationSuccessMail(String email, String name) {

        Map<String, Object> payload = Map.of(
                "type", "REGISTRATION_SUCCESS",
                "to", email,
                "name", name
        );

        send(payload);
    }

    @Override
    public void sendPasswordResetMail(String email, String resetLink) {

        Map<String, Object> payload = Map.of(
                "type", "PASSWORD_RESET",
                "to", email,
                "resetLink", resetLink
        );

        send(payload);
    }

    private void send(Map<String, Object> payload) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(payload, headers);

        restTemplate.postForObject(
                EMAIL_API_URL,
                request,
                String.class
        );
    }
}
