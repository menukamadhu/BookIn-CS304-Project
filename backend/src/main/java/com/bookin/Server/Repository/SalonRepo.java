package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface SalonRepo extends JpaRepository<Salon,Integer> {
    Salon findOneByEmailAndPassword(String email,String password);
    Salon findByEmail(String email);

    Salon findByName(String name);
}
