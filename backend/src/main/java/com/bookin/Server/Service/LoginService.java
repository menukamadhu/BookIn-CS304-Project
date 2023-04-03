package com.bookin.Server.Service;

import com.bookin.Server.Controller.LoginController;
import com.bookin.Server.Dto.ClientDTO;
import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Dto.UserLoginDTO;
import com.bookin.Server.Entity.Client;
import com.bookin.Server.Entity.Login;
import com.bookin.Server.Entity.Salon;
import com.bookin.Server.Repository.ClientRepo;
import com.bookin.Server.Repository.LoginRepo;
import com.bookin.Server.Repository.SalonRepo;
import com.bookin.Server.Response.LoginResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    private LoginRepo loginRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private SalonRepo salonRepo;
    @Autowired
    private ClientRepo clientRepo;
    public LoginDTO addLoginService(LoginDTO data){
        try{
            Login login=loginRepo.save(modelMapper.map(data,Login.class));
            if(login!=null){
                return modelMapper.map(login,new TypeToken<LoginDTO>(){}.getType());
            }
            return null;
        }
        catch (Exception e){
            System.out.println(e.toString());
            return null;
        }
    }
//    public List<Login> getSalonDataById(int SalonID){
//        try {
//            Salon salon = salonRepo.findById(SalonID).orElseThrow(()-> new IllegalArgumentException("User not found"));
//            return loginRepo.findByUserId(salon.getSalonID());
//        }catch (Exception e){
//            System.out.println(e.toString());
//            return null;
//        }
//    }

    public LoginResponse loginUser(UserLoginDTO userLoginDTO){
        String msg="";
        Login login = loginRepo.findByEmail(userLoginDTO.getEmail());
        if (login!=null){
            String password = userLoginDTO.getPassword();
            String encodedPassword = login.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password,encodedPassword);
            if (isPwdRight){
                Login login1 = loginRepo.findOneByEmailAndPassword(userLoginDTO.getEmail(),encodedPassword);
                if (login1!=null){
                    LoginDTO loginDTO=modelMapper.map(login1,new TypeToken<LoginDTO>(){}.getType());
                    return new LoginResponse("Login Success",true, loginDTO);
                }else {
                    return new LoginResponse("Login Failed",false,null);
                }
            }else {
                return new LoginResponse("Password not Matching",false,null);
            }
        }else {
            return new LoginResponse("Email not Exists",false,null);
        }
    }

}
