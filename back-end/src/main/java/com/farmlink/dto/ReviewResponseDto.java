package com.farmlink.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReviewResponseDto {

    private Long reviewId;
    private Long equipmentId;

    private String equipmentName;
    private String farmerName;

    private Integer rating;
    private String comment;
    private String createdAt;
}

