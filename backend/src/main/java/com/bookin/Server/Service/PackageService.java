package com.bookin.Server.Service;

import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Packages;
import com.bookin.Server.Repository.PackageRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PackageService {
    @Autowired
    private PackageRepo packageRepo;
    @Autowired
    private ModelMapper modelMapper;

    public PackageDTO addPackage(PackageDTO packageDTO){
        Packages packages1 = packageRepo.findByPackageName(packageDTO.getPackageName());
        if (packages1 != null){
            return null;
        }else {
            Packages packages = modelMapper.map(packageDTO,Packages.class);
            packages = packageRepo.save(packages);
            return modelMapper.map(packages1,new TypeToken<PackageDTO>(){}.getType());
//            Packages packages = new Packages();
//            packages.setPackageName(packageDTO.getPackageName());
//            packages.setDuration(packageDTO.getDuration());
//            packages.setAdd_ons(packageDTO.getAdd_ons());
//            packages.setAdd_onsType(packageDTO.getAdd_onsType());
//            packages.setPackagePrice(packageDTO.getPackagePrice());
//
//            Packages p = packageRepo.save(packages);
//            return modelMapper.map(p,new TypeToken<SalonDTO>(){}.getType());
        }
    }


}
