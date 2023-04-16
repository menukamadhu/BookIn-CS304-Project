package com.bookin.Server.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
@Table(name = "Package")
@Entity
public class Packages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int packageId ;
    private String packageName;
    private int duration;
    private String add_ons;
    private String add_onsType;
    private String packagePrice;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "salonId", referencedColumnName = "salonID")
    private Salon salon;

    @OneToMany(mappedBy = "packages")
    private List<Booking> bookings;

}
