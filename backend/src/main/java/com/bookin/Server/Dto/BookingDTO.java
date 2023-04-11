package com.bookin.Server.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingDTO {
    private int bookingId;
    private String bookingDate;
    private String bookingTime;
    private boolean doneBook;
    private int clientId;
    private int packagesPackageId;

}
