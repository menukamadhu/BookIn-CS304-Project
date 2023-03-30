package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Client;
import com.bookin.Server.Entity.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ClientRepo extends JpaRepository<Client,Integer> {
    Client findOneByEmailAndPassword(String email,String password);
    Client findByEmail(String email);
}
