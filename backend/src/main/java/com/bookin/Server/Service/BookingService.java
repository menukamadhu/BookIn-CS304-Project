package com.bookin.Server.Service;

import com.bookin.Server.Dto.BookingDTO;
import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Entity.Booking;
import com.bookin.Server.Entity.Packages;
import com.bookin.Server.Repository.BookingRepo;
import com.bookin.Server.Util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class BookingService {
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private ModelMapper modelMapper;

    public BookingDTO addBooking(BookingDTO bookingDTO){
        Booking booking = modelMapper.map(bookingDTO,Booking.class);
        Booking b = bookingRepo.save(booking);
        return modelMapper.map(b, new TypeToken<BookingDTO>(){}.getType());
    }

    public String updateBooking(BookingDTO bookingDTO){
        bookingRepo.save(modelMapper.map(bookingDTO,Booking.class));
        return VarList.RSP_SUCCESS;
    }

    public List<BookingDTO> getBookingByDate(String bookingDate){
        List<Booking> list = bookingRepo.findByBookingDate(bookingDate);
        return modelMapper.map(list, new TypeToken<List<BookingDTO>>(){}.getType());
    }

    public List<BookingDTO> getBookingByDone(boolean doneBook){
        List<Booking> list = bookingRepo.findByDoneBook(doneBook);
        return  modelMapper.map(list, new TypeToken<List<BookingDTO>>(){}.getType());
    }

    public List<BookingDTO> getBookingBySalonId(int salonId){
        List<Booking> list = bookingRepo.findBookingBySalonId(salonId);
        return  modelMapper.map(list, new TypeToken<List<BookingDTO>>(){}.getType());
    }

    public List<BookingDTO> getBookingByClientId(int clientId){
        List<Booking> list = bookingRepo.findBookingByClientId(clientId);
        return  modelMapper.map(list, new TypeToken<List<BookingDTO>>(){}.getType());
    }


}
