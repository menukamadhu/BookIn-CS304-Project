package com.bookin.Server.Controller;

import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Dto.ResponseDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Packages;
import com.bookin.Server.Service.PackageService;
import com.bookin.Server.Util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/salon/package")
public class PackageController {
    @Autowired
    private PackageService packageService;
    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/addPackage")
    public ResponseEntity<?> addPackage(@RequestBody PackageDTO packageDTO){
        try {
            Map<String, Object> map = new LinkedHashMap<String, Object>();
            PackageDTO res = packageService.addPackage(packageDTO);
            if (res!=null){
                map.put("status",1);
                map.put("message","Success");
                map.put("data",res);
                return new ResponseEntity(map, HttpStatus.ACCEPTED);

            }else  {
                map.clear();
                map.put("status",0);
                map.put("message","Package not added");
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getAllPackages")
    public ResponseEntity getAllPackages(){
        try {
            Map<String,Object> map = new LinkedHashMap<String,Object>();
            List<PackageDTO> packageDTOList = packageService.getAllPackages();
            if (!packageDTOList.isEmpty()){
                map.put("status",1);
                map.put("message","Success");
                map.put("data",packageDTOList);
                return new ResponseEntity(map, HttpStatus.ACCEPTED);

            }else{
                map.clear();
                map.put("status",0);
                map.put("message","Package list is not found");
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getPackagesBySalonId/{salonId}")
    public ResponseEntity getPackagesBySalonId(@PathVariable int salonId){
        try {
            Map<String,Object> map = new LinkedHashMap<String,Object>();
            List<PackageDTO> packageDTOList = packageService.getPackagesBySalonId(salonId);
            if (!packageDTOList.isEmpty()){
                map.put("status",1);
                map.put("message","Success");
                map.put("data",packageDTOList);
                return new ResponseEntity(map, HttpStatus.ACCEPTED);

            }else{
                map.clear();
                map.put("status",0);
                map.put("message","Package list is not found");
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
