package edu.ifam.dra.axiosAPI.service;

import edu.ifam.dra.axiosAPI.dto.InteresseOutputDTO;
import edu.ifam.dra.axiosAPI.model.Interesse;
import edu.ifam.dra.axiosAPI.repository.InteresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InteresseService {

    @Autowired
    private InteresseRepository interesseRepository;

    public List<InteresseOutputDTO> list(){
        List<Interesse> interesses = interesseRepository.findAll();
        List<InteresseOutputDTO> interessesDTO = new ArrayList<>();
        for(Interesse interesse: interesses){
            interessesDTO.add(new InteresseOutputDTO(interesse));
        }
        return interessesDTO;
    }
}
