package edu.ifam.dra.axiosAPI.dto;

import edu.ifam.dra.axiosAPI.model.Pessoa;
import edu.ifam.dra.axiosAPI.repository.InteresseRepository;

public class PessoaInputDTO{

    private String nome;
    private String matricula;
    private String areaInteresse;

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

    public String getAreaInteresse() {
        return areaInteresse;
    }

    public void setAreaInteresse(String areaInteresse) {
        this.areaInteresse = areaInteresse;
    }

    public Pessoa build(InteresseRepository interesseRepository){
        Pessoa pessoa = new Pessoa();
        pessoa.setNome(this.nome);
        pessoa.setMatricula(this.matricula);
        pessoa.setInteresse(interesseRepository.findByNome(this.areaInteresse));
        return pessoa;
    }
}
