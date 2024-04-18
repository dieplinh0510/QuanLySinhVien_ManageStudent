package com.example.demo.repo;

import com.example.demo.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
  @Query(value = "select * from users u where u.username = :userName", nativeQuery = true)
  User getUserByUsername(String userName);
}
