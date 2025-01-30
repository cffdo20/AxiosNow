package edu.ifam.dra.axiosAPI.repository;

import edu.ifam.dra.axiosAPI.model.Interesse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InteresseRepository extends JpaRepository<Interesse, Long> {
    @Query("select i from Interesse i where i.areaDeInteresse = :parArea")
    Interesse findByNome(@Param("parArea") String area);
}
