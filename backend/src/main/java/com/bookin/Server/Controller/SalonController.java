package com.bookin.Server.Controller;

import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.ResponseDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Response.LoginResponse;
import com.bookin.Server.Service.SalonService;
import com.bookin.Server.Util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/register")
public class SalonController {

    @Autowired
    private SalonService salonService;
    @Autowired
    private ResponseDTO responseDTO;
    @PostMapping(value = "/registerSalon")
    public ResponseEntity registerSalon(@RequestBody SalonDTO salonDTO){
        try {
            SalonDTO res = salonService.registerSalon(salonDTO);
            if (res!=null){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(res);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else if (res==null){
                responseDTO.setCode(VarList.RSP_DUPLICATE);
                responseDTO.setMessage("Salon registered");
                responseDTO.setContent(salonDTO);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping(value = "/updateSalon")
    public ResponseEntity updateSalon(@RequestBody SalonDTO salonDTO){
        try {
            String res = salonService.updateSalon(salonDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(salonDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else if (res.equals("06")){
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not a registered Salon");
                responseDTO.setContent(salonDTO);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/getAllSalons")
    public ResponseEntity getAllSalons(){
        try {
            List<SalonDTO> salonDTOList = salonService.getAllSalon();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(salonDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/searchSalon/{salonID}")
    public ResponseEntity searchSalon(@PathVariable int salonID){
        try {
            SalonDTO salonDTO = salonService.searchSalon(salonID);
            if (salonDTO!=null){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(salonDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Salon available for this ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping(value = "/deleteSalon/{salonID}")
    public ResponseEntity deleteSalon(@PathVariable int salonID){
        try {
            String res = salonService.deleteSalon(salonID);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(true);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Salon available for this ID");
                responseDTO.setContent(false);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/login")
    public ResponseEntity loginSalon(@RequestBody LoginDTO loginDTO){
        try {
            LoginResponse loginResponse = salonService.loginSalon(loginDTO);
            if (loginResponse!=null){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(loginResponse);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Salon available for this ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
            //return ResponseEntity.ok(loginResponse);
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
