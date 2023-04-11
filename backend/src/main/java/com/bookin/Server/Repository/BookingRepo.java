package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface BookingRepo extends JpaRepository<Booking,Integer> {
//    @Query(value = "SELECT * FROM bookin.booking WHERE booking_date=?1", nativeQuery = true)
    List<Booking> findByBookingDate(String bookingDate);
    List<Booking> findByDoneBook(boolean doneBook);
}