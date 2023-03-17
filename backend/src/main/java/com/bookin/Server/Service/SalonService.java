package com.bookin.Server.Service;

import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.SalonDTO;
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
    public SalonDTO registerSalon(SalonDTO salonDTO){
        if (salonRepo.existsById(salonDTO.getSalonID())){
            return null;
        }else {
            Salon salon = new Salon(
                    salonDTO.getSalonID(),
                    salonDTO.getName(),
                    salonDTO.getEmail(),
                    salonDTO.getContactNum(),
                    salonDTO.getDistrict(),
                    this.passwordEncoder.encode(salonDTO.getPassword())
            );
            Salon s=salonRepo.save(salon);

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
    public LoginResponse loginSalon(LoginDTO loginDTO){
        String msg = "";
        Salon salon = salonRepo.findByEmail(loginDTO.getEmail());
        if(salon!=null){
            String password = loginDTO.getPassword();
            String encodedPassword = salon.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password,encodedPassword);
            if (isPwdRight){
                Optional<Salon> salon1 = salonRepo.findOnyByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (salon1.isPresent()){
                    return new LoginResponse("Login Success",true);
                }else {
                    return new LoginResponse("Login Failed",false);
                }
            }else {
                return new LoginResponse("Password not matching",false);
            }
        }else {
            return new LoginResponse("Email not exist",false );
        }
    }
}
