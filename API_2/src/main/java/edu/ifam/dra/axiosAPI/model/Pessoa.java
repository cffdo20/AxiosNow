package edu.ifam.dra.axiosAPI.model;

import edu.ifam.dra.axiosAPI.dto.PessoaInputDTO;
import edu.ifam.dra.axiosAPI.repository.InteresseRepository;
import jakarta.persistence.*;

@Entity
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome; //(nn)

    @Column(nullable = false, unique = true)
    private String matricula; //(nn, unique)

    @ManyToOne
    @JoinColumn(name = "interesse", nullable = false)
    private Interesse interesse;

    public Pessoa(){}

    public Pessoa(Long id, PessoaInputDTO pessoaInputDTO, Interesse interesse){
        this.id = id;
        this.nome = pessoaInputDTO.getNome();
        this.interesse = interesse;
        this.matricula = pessoaInputDTO.getMatricula();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Interesse getInteresse() {
        return interesse;
    }

    public void setInteresse(Interesse interesse) {
        this.interesse = interesse;
    }
}
