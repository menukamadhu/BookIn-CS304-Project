package com.bookin.Server.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;
    private String bookingDate;
    private String bookingTime;
    private boolean doneBook;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "packageId",referencedColumnName = "packageId")
    private Packages packages;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "clientId", referencedColumnName = "clientID")
    private Client client;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "salonId", referencedColumnName = "SalonID")
    private Salon salon;

}
