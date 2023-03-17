package com.bookin.Server.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
public class SalonDTO {
    private int salonID;
    private String name;
    private String email;
    private String contactNum;
    private String district;
    private String password;
}
