package com.bookin.Server.Controller;

import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Dto.ResponseDTO;
import com.bookin.Server.Dto.ReviewDTO;
import com.bookin.Server.Service.ReviewService;
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
@RequestMapping("/salon/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ResponseDTO responseDTO;
    @PostMapping(value = "/addReview")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO reviewDTO){
        try {
            Map<String, Object> map = new LinkedHashMap<String, Object>();
            ReviewDTO res = reviewService.addReview(reviewDTO);
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

    @GetMapping(value = "/getReviewBySalonId/{salonId}")
    public ResponseEntity getReviewBySalonId(@PathVariable int salonId){
        try {
            Map<String,Object> map = new LinkedHashMap<String,Object>();
            List<ReviewDTO> list = reviewService.getReviewBySalonId(salonId);
            if (!list.isEmpty()){
                map.put("status",1);
                map.put("message","Success");
                map.put("data",list);
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

    @DeleteMapping(value = "/deleteReview/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable int reviewId){
        try {
            String res = reviewService.deleteReview(reviewId);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(true);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Review available for this ID");
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
 }
