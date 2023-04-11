package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface ReviewRepo extends JpaRepository<Review,Integer> {
    @Query(value = "SELECT * FROM bookin.reviews WHERE salon_id=?1", nativeQuery = true)
    List<Review> findBySalonId(int salonId);
}
