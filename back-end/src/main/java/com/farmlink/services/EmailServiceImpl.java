package com.farmlink.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final RestTemplate restTemplate;

    @Value("${email.service.url}")
    private String emailApiUrl;

    // ================= REGISTRATION MAIL =================
    @Override
    public void sendRegistrationSuccessMail(String email, String name) {

        Map<String, Object> payload = new HashMap<>();
        payload.put("type", "REGISTRATION"); // ✅ FIXED
        payload.put("to", email);
        payload.put("name", name);

        send(payload);
    
}

    // ================= PASSWORD RESET MAIL =================
    @Override
    public void sendPasswordResetMail(String email, String resetLink) {

        Map<String, Object> payload = new HashMap<>();
        payload.put("type", "RESET_PASSWORD");
        payload.put("to", email);
        payload.put("resetLink", resetLink);

        send(payload);
    }

    // ================= COMMON SEND =================
    private void send(Map<String, Object> payload) {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(payload, headers);

            restTemplate.postForObject(
                    emailApiUrl,
                    request,
                    String.class
            );

            log.info("📧 Email sent successfully: {}", payload.get("type"));

        } catch (RestClientException ex) {
            log.error("❌ Failed to send email: {}", payload, ex);
            // optional: throw custom exception if needed
        }
    }
}
