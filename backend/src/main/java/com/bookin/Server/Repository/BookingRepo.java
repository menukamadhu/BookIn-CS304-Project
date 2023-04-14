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
    @Query(value = "SELECT * FROM bookin.booking WHERE salon_id=?1", nativeQuery = true)
    List<Booking> findBookingBySalonId(int salonId);

    @Query(value = "SELECT * FROM bookin.booking WHERE client_id=?1", nativeQuery = true)
    List<Booking> findBookingByClientId(int clientId);

//    List<Booking> findBookingByClientIdAndDone(int clientId,boolean doneBook);
}
