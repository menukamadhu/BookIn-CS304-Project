package com.bookin.Server.Controller;

import com.bookin.Server.Dto.UserLoginDTO;
import com.bookin.Server.Repository.LoginRepo;
import com.bookin.Server.Response.LoginResponse;
import com.bookin.Server.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @Autowired
    private LoginRepo loginRepo;

    @PostMapping(value = "/userLogin")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDTO userLoginDTO){
        LoginResponse loginResponse = loginService.loginUser(userLoginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
