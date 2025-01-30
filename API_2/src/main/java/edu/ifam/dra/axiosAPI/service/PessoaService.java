package edu.ifam.dra.axiosAPI.service;

import edu.ifam.dra.axiosAPI.dto.PessoaInputDTO;
import edu.ifam.dra.axiosAPI.dto.PessoaOutputDTO;
import edu.ifam.dra.axiosAPI.model.Interesse;
import edu.ifam.dra.axiosAPI.model.Pessoa;
import edu.ifam.dra.axiosAPI.repository.InteresseRepository;
import edu.ifam.dra.axiosAPI.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private InteresseRepository interesseRepository;

    public List<PessoaOutputDTO> list(){
        List<Pessoa> pessoas = pessoaRepository.findAll();
        List<PessoaOutputDTO> pessoaDTO = new ArrayList<>();
        for(Pessoa pessoa:pessoas){
            pessoaDTO.add(new PessoaOutputDTO(pessoa));
        }
        return pessoaDTO;
    }

    public PessoaOutputDTO create(PessoaInputDTO pessoaInputDTO){
        return new PessoaOutputDTO(pessoaRepository.save(pessoaInputDTO.build(interesseRepository)));
    }

    public List<PessoaOutputDTO> findByNome(String nome){
        List<Pessoa> pessoas = pessoaRepository.findByNome(nome);
        List<PessoaOutputDTO> pessoasDTO = new ArrayList<>();
        for(Pessoa pessoa: pessoas){
            pessoasDTO.add(new PessoaOutputDTO(pessoa));
        }
        return pessoasDTO;
    }

    public PessoaOutputDTO getPessoa(String matricula){
        return new PessoaOutputDTO(pessoaRepository.findByMatricula(matricula));
    }

    public boolean delete(String matricula){
        if(pessoaRepository.findByMatricula(matricula) != null){
            pessoaRepository.delete(pessoaRepository.findByMatricula(matricula));
            return true;
        }else{
            return false;
        }
    }

    public PessoaOutputDTO update(PessoaInputDTO pessoaInputDTO){
        Pessoa pessoaAtual = pessoaRepository.findByMatricula(pessoaInputDTO.getMatricula());
        Long id = pessoaAtual.getId();
        Interesse interesse = interesseRepository.findByNome(pessoaInputDTO.getAreaInteresse());
        Pessoa pessoaNovo = new Pessoa(id, pessoaInputDTO, interesse);
        System.out.println(pessoaNovo.getId() + " - " + pessoaNovo.getMatricula() + " - " + pessoaNovo.getNome() + " - " + pessoaNovo.getInteresse().getAreaDeInteresse());
        return new PessoaOutputDTO(pessoaRepository.save(pessoaNovo));
    }
}
