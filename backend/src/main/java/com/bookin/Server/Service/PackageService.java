package com.bookin.Server.Service;

import com.bookin.Server.Dto.PackageDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Packages;
import com.bookin.Server.Entity.Salon;
import com.bookin.Server.Repository.PackageRepo;
import com.bookin.Server.Util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
            Packages p = packageRepo.save(packages);
//            Salon salon = new Salon();
//            salon.setSalonID(salon.getSalonID());
//            packages.setSalon(salon);
            return modelMapper.map(p,new TypeToken<PackageDTO>(){}.getType());
        }
    }

    public List<PackageDTO> getAllPackages(){
        List<Packages> list = packageRepo.findAll();
        return modelMapper.map(list, new TypeToken<List<PackageDTO>>(){}.getType());
    }

    public List<PackageDTO> getPackagesBySalonId(int salonId){
        List<Packages> list = packageRepo.getPackagesBySalonId(salonId);
        return modelMapper.map(list, new TypeToken<List<PackageDTO>>(){}.getType());
    }

    public PackageDTO getPackageById(int packageId){
        Packages packages = packageRepo.findById(packageId);
        return modelMapper.map(packages, new TypeToken<PackageDTO>(){}.getType());
    }

    public PackageDTO getPackageByName(String packageName){
        Packages packages = packageRepo.findByPackageName(packageName);
        return  modelMapper.map(packages, new TypeToken<PackageDTO>(){}.getType());
    }

    public String updatePackage(PackageDTO packageDTO){
        packageRepo.save(modelMapper.map(packageDTO, Packages.class));
        return VarList.RSP_SUCCESS;
    }

    public String deletePackage(int packageId){
        packageRepo.deleteById(packageId);
        return VarList.RSP_SUCCESS;
    }
}
