package com.bookin.Server.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDTO {
    private int reviewId;
    private String reviewer;
    private String review;
    private double rate;
    private int salonId;
    private int clientId;
}
