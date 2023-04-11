package com.bookin.Server.Controller;

import com.bookin.Server.Dto.BookingDTO;
import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Dto.ResponseDTO;
import com.bookin.Server.Service.BookingService;
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
@RequestMapping("/salon/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/addBooking")
    public ResponseEntity addBooking(@RequestBody BookingDTO bookingDTO){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        BookingDTO res = bookingService.addBooking(bookingDTO);
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
    }

    @PutMapping(value = "/updateBooking")
    public ResponseEntity updateBooking(@RequestBody BookingDTO bookingDTO){
        try {
            String res = bookingService.updateBooking(bookingDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(bookingDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            }else if (res.equals("06")){
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not a registered Salon");
                responseDTO.setContent(bookingDTO);
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

    @GetMapping(value = "/getBookingByDate/{bookingDate}")
    public ResponseEntity getBookingByDate(@PathVariable String bookingDate){
        try {
            Map<String,Object> map = new LinkedHashMap<String,Object>();
            List<BookingDTO> bookingDTO = bookingService.getBookingByDate(bookingDate);
            if (bookingDTO!=null){
                map.put("status",1);
                map.put("message","Success");
                map.put("data",bookingDTO);
                return new ResponseEntity(map, HttpStatus.ACCEPTED);

            }else{
                map.clear();
                map.put("status",0);
                map.put("message","Booking list is not found");
                return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getBookingByDone/{doneBook}")
    public ResponseEntity getBookingByDone(@PathVariable boolean doneBook){
        try {
            Map<String,Object> map = new LinkedHashMap<String,Object>();
            List<BookingDTO> bookingDTO = bookingService.getBookingByDone(doneBook);
            if (bookingDTO!=null){
                map.put("status",1);
                map.put("message","Success");
                map.put("data",bookingDTO);
                return new ResponseEntity(map, HttpStatus.ACCEPTED);

            }else{
                map.clear();
                map.put("status",0);
                map.put("message","Booking list is not found");
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
