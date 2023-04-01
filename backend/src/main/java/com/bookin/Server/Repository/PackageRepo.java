package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Packages;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

//@EnableJpaRepositories
@Repository
public interface PackageRepo extends JpaRepository<Packages,Integer> {
}
