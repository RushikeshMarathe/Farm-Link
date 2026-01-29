package com.farmlink.services;

public interface EmailService {
    public void sendRegistrationSuccessMail(String email, String name);
    public void sendPasswordResetMail(String email, String resetLink);

}
