package com.bookin.Server.Dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SalonDTO {
    private int salonID;
    private String name;
    private String email;
    private String contactNum;
    private String type;
    private String district;
    private String password;
}
