package com.bookin.Server.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

}
