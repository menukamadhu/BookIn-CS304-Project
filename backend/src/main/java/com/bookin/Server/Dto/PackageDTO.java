package com.bookin.Server.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PackageDTO {
    private int packageId;
    private String packageName;
    private int duration;
    private String add_ons;
    private String add_onsType;
    private String packagePrice;
    private int salonId;
}
