package com.bookin.Server.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClientDTO {
    private int clientID;
    private String firstName;
    private String lastName;
    private String email;
    private  String gender;
    private  String contactNum;
    private String password;
}
