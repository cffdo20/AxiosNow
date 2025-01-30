package edu.ifam.dra.axiosAPI.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Interesse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String areaDeInteresse;

    @OneToMany(mappedBy = "interesse", fetch = FetchType.LAZY)
    private List<Pessoa> pessoas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAreaDeInteresse() {
        return areaDeInteresse;
    }

    public void setAreaDeInteresse(String areaDeInteresse) {
        this.areaDeInteresse = areaDeInteresse;
    }

    public List<Pessoa> getPessoas() {
        return pessoas;
    }

    public void setPessoas(List<Pessoa> pessoas) {
        this.pessoas = pessoas;
    }
}
