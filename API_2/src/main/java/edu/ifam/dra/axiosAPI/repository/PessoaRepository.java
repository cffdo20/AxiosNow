package edu.ifam.dra.axiosAPI.repository;

import edu.ifam.dra.axiosAPI.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    @Query("select p from Pessoa p where lower(p.nome) like lower(concat('%', :parNome, '%'))")
    List<Pessoa> findByNome(@Param("parNome") String nome);

    @Query("select p from Pessoa p where  p.matricula = :parMatricula")
    Pessoa findByMatricula(@Param("parMatricula") String matricula);
}