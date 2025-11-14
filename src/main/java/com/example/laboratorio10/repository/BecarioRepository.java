package com.example.laboratorio10.repository;

import com.example.laboratorio10.entity.Becario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BecarioRepository extends JpaRepository<Becario, Integer> {
}
