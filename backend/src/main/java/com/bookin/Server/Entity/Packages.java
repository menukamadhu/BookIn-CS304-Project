package com.bookin.Server.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Package")
@Entity
public class Packages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int packageId;
    private String packageName;
    private int duration;
    private String add_ons;
    private String add_onsType;
    private String packagePrice;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "salonId", referencedColumnName = "salonID")
    private Salon salon;



}
