package com.farmlink.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequestDto {

    private String to;      // receiver email
    private String type;    // REGISTRATION / RESET_PASSWORD
    private String resetLink; // optional
}
