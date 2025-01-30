package edu.ifam.dra.axiosAPI.dto;

import edu.ifam.dra.axiosAPI.model.Interesse;

public class InteresseOutputDTO {
    private String nomeArea;

    public String getNomeArea() {
        return nomeArea;
    }

    public void setNomeArea(String nomeArea) {
        this.nomeArea = nomeArea;
    }

    public InteresseOutputDTO(Interesse interesse){
        this.nomeArea = interesse.getAreaDeInteresse();
    }
}
