package com.bookin.Server.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Salon")
public class Salon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int salonID;
    private String name;
    private String email;
    private String contactNum;
    private String type;
    private String district;
    private String password;

    @OneToMany(mappedBy = "salon")
    private List<Packages> packages;

    @OneToMany(mappedBy = "salon" )
    private List<Review> review;

    @OneToMany(mappedBy = "salon")
    private List<Booking> booking;
}
