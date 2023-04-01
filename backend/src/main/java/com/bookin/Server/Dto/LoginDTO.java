package com.bookin.Server.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDTO {
    private int loginId;
    private String email;
    private String password;
    private String role;
    private int id;
}
