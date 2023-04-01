package com.bookin.Server.Response;

import com.bookin.Server.Dto.ClientDTO;
import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponse {
    String message;
    boolean status;

    LoginDTO loginDTO;


}
