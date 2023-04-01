package com.bookin.Server.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Package")
public class Package {
    private int packageId;
    private String packageName;
    private String packagePrice;

//    @JsonIgnore
//    @ManyToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "salonId", referencedColumnName = "salonID")
//    private Salon salon;



}
