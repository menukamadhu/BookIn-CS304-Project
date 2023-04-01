package com.bookin.Server.Service;

import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Login;
import com.bookin.Server.Entity.Packages;
import com.bookin.Server.Entity.Salon;
import com.bookin.Server.Repository.SalonRepo;
import com.bookin.Server.Response.LoginResponse;
import com.bookin.Server.Util.VarList;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Var;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SalonService {
    @Autowired
    private SalonRepo salonRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private LoginService loginService;
    public SalonDTO registerSalon(SalonDTO salonDTO){
        Salon salon1 = salonRepo.findByEmail(salonDTO.getEmail());
        if (salon1!=null){
            return null;
        }else {
            Salon salon = new Salon();
            salon.setName(salonDTO.getName());
            salon.setEmail(salonDTO.getEmail());
            salon.setContactNum(salonDTO.getContactNum());
            salon.setType(salonDTO.getType());
            salon.setDistrict(salonDTO.getDistrict());
            salon.setPassword(passwordEncoder.encode(salonDTO.getPassword()));
//
            Salon s=salonRepo.save(salon);

            if(s!=null){
                Login l=new Login();
                l.setRole("Salon");
                l.setId(s.getSalonID());
                l.setEmail(salonDTO.getEmail());
                l.setPassword(passwordEncoder.encode(salonDTO.getPassword()));

                LoginDTO k=loginService.addLoginService(modelMapper.map(l,new TypeToken<LoginDTO>(){}.getType()));
            }

            return modelMapper.map(s,new TypeToken<SalonDTO>(){}.getType());
        }
    }
    public String updateSalon(SalonDTO salonDTO){
        if (salonRepo.existsById(salonDTO.getSalonID())){
            salonRepo.save(modelMapper.map(salonDTO, Salon.class));
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
    public List<SalonDTO> getAllSalon(){
        List<Salon> salonList = salonRepo.findAll();
        return modelMapper.map(salonList, new TypeToken<ArrayList<SalonDTO>>(){

        }.getType());
    }
    public SalonDTO searchSalon(int salonID){
        if (salonRepo.existsById(salonID)){
            Salon salon = salonRepo.findById(salonID).orElse(null );
            return modelMapper.map(salon, SalonDTO.class);
        }else {
            return null;
        }
    }
    public String deleteSalon(int salonID){
        if (salonRepo.existsById(salonID)){
            salonRepo.deleteById(salonID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
//    public LoginResponse loginSalon(LoginDTO loginDTO){
//        String msg = "";
//        Salon salon = salonRepo.findByEmail(loginDTO.getEmail());
////        System.out.println(salon.getSalonID());
//        if(salon!=null){
////            System.out.println("hello world");
//            String password = loginDTO.getPassword();
//            String encodedPassword = salon.getPassword();
//            boolean isPwdRight = passwordEncoder.matches(password,encodedPassword);
//            if (isPwdRight){
//                Salon salon1 = salonRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
//                if (salon1!=null){
//                    SalonDTO salonDTO=modelMapper.map(salon1, new TypeToken<SalonDTO>(){}.getType());
//                    return new LoginResponse("Login Success",true,null,salonDTO);
//                }else {
//                    return new LoginResponse("Login Failed",false,null,null);
//                }
//            }else {
//                return new LoginResponse("Password not matching",false,null,null);
//            }
//        }else {
//            return new LoginResponse("Email not exist",false,null,null);
//        }
//    }
}
