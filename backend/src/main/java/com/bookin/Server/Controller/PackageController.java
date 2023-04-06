package com.bookin.Server.Controller;

import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Dto.ResponseDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Service.PackageService;
import com.bookin.Server.Util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
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
    public ResponseEntity addPackage(@RequestBody PackageDTO packageDTO){
        try {
            Map<String, Object> map = new LinkedHashMap<>();
            PackageDTO res = packageService.addPackage(packageDTO);
            if (res!=null){
                map.put("status",1);
                map.put("data",res);
                map.put("message","Success");
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
}
