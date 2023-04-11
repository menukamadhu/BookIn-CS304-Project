package com.bookin.Server.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientID;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String contactNum;
    private String password;

//    @OneToOne(mappedBy = "client",cascade = CascadeType.REMOVE)
//    private Login login;

    @OneToMany(mappedBy = "client",cascade = CascadeType.REMOVE)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "client",cascade = CascadeType.REMOVE)
    private List<Review> review;
}
