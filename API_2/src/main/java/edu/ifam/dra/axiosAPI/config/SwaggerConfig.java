package edu.ifam.dra.axiosAPI.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Documentação API de Atividade Prática de Axios")
                        .version("1.0.0")
                        .description("Documentação interativa da API usando Swagger/OpenAPI")
                );
    }
}
