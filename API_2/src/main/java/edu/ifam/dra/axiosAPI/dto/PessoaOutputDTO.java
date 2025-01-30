package edu.ifam.dra.axiosAPI.dto;

import edu.ifam.dra.axiosAPI.model.Pessoa;

public class PessoaOutputDTO {

    private String nome;
    private String matricula;
    private String areaInteresse;

    public PessoaOutputDTO(Pessoa pessoa){
        this.nome = pessoa.getNome();
        this.matricula = pessoa.getMatricula();
        this.areaInteresse = pessoa.getInteresse().getAreaDeInteresse();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getAreaInteresse() {
        return areaInteresse;
    }

    public void setAreaInteresse(String areaInteresse) {
        this.areaInteresse = areaInteresse;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
}
