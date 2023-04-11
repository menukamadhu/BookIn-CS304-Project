package com.bookin.Server.Service;

import com.bookin.Server.Dto.BookingDTO;
import com.bookin.Server.Dto.ReviewDTO;
import com.bookin.Server.Entity.Booking;
import com.bookin.Server.Entity.Review;
import com.bookin.Server.Repository.ReviewRepo;
import com.bookin.Server.Util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;
    @Autowired
    private ModelMapper modelMapper;
    public ReviewDTO addReview(ReviewDTO reviewDTO){
        Review review = modelMapper.map(reviewDTO,Review.class);
        Review r = reviewRepo.save(review);
        return modelMapper.map(r, new TypeToken<ReviewDTO>(){}.getType());
    }

    public List<ReviewDTO> getReviewBySalonId(int salonId){
        List<Review> list = reviewRepo.findBySalonId(salonId);
        return modelMapper.map(list, new TypeToken<List<ReviewDTO>>(){}.getType());
    }
    public String deleteReview(int reviewId){
        reviewRepo.deleteById(reviewId);
        return VarList.RSP_SUCCESS;
    }


}
