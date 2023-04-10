package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Packages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface PackageRepo extends JpaRepository<Packages,Integer> {
    Packages findByPackageName(String packageName);
    @Query(value = "SELECT * FROM bookin.package WHERE salon_id=?1", nativeQuery = true)
    List<Packages> getPackagesBySalonId(int salonId);

    Packages findById(int packageId);
}
