package com.bookin.Server.Repository;

import com.bookin.Server.Entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface LoginRepo extends JpaRepository<Login,Integer> {
    Login findOneByEmailAndPassword(String email,String password);
    Login findByEmail(String email);
}
