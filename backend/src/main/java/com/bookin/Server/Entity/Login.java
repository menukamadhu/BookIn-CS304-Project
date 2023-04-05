package com.bookin.Server.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Login")
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loginId;
    private String email;
    private String password;
    private String role;
    private int id;

//    @JsonIgnore
//    @OneToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "id", referencedColumnName = "salonID")
//    private Salon salon;
//
//    @JsonIgnore
//    @OneToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "id", referencedColumnName = "clientID")
//    private Client client;
}
