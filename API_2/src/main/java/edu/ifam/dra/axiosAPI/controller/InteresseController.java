package edu.ifam.dra.axiosAPI.controller;

import edu.ifam.dra.axiosAPI.dto.InteresseOutputDTO;
import edu.ifam.dra.axiosAPI.service.InteresseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/interesses")
@CrossOrigin(origins="*")
public class InteresseController {

    @Autowired
    private InteresseService interesseService;

    @GetMapping
    public ResponseEntity<List<InteresseOutputDTO>> list(){
        try{
            List<InteresseOutputDTO> interessesDTO = interesseService.list();
            if(interessesDTO != null)
                return new ResponseEntity<>(interessesDTO, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
