package edu.ifam.dra.axiosAPI.controller;

import edu.ifam.dra.axiosAPI.dto.PessoaInputDTO;
import edu.ifam.dra.axiosAPI.dto.PessoaOutputDTO;
import edu.ifam.dra.axiosAPI.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins="*")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PessoaOutputDTO> create(@RequestBody PessoaInputDTO pessoa){
        try{
            PessoaOutputDTO pessoaDTO = pessoaService.create(pessoa);
            if(pessoaDTO != null)
                return new ResponseEntity<>(pessoaDTO, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PessoaOutputDTO>> list(){
        try{
            List<PessoaOutputDTO> pessoasDTO = pessoaService.list();
            if(pessoasDTO != null)
                return new ResponseEntity<>(pessoasDTO, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping(value = "/{matricula}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PessoaOutputDTO> getById(@PathVariable String matricula){
        try{
            PessoaOutputDTO pessoaDTO = pessoaService.getPessoa(matricula);
            if(pessoaDTO != null)
                return new ResponseEntity<>(pessoaDTO, HttpStatus.FOUND);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping(value = "/nomes/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PessoaOutputDTO>> getByNome(@PathVariable String nome){
        try{
            List<PessoaOutputDTO> pessoasDTO = pessoaService.findByNome(nome);
            if(pessoasDTO != null)
                return new ResponseEntity<>(pessoasDTO, HttpStatus.FOUND);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping(value = "/{matricula}")
    public ResponseEntity<PessoaOutputDTO> update(@RequestBody PessoaInputDTO pessoaInputDTO){
        try{
            PessoaOutputDTO pessoaOutputDTO = pessoaService.update(pessoaInputDTO);
            if(pessoaOutputDTO != null)
                return new ResponseEntity<>(pessoaOutputDTO, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DeleteMapping(value = "/{matricula}")
    public ResponseEntity<String> delete(@PathVariable String matricula){
        try{
            boolean deleted =pessoaService.delete(matricula);
            if (deleted)
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
