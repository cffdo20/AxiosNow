-- drop database `ifam_dra_lab_axios_api_v2`;
use `ifam_dra_lab_axios_api_v2`;

insert into interesse (area_de_interesse) values
("Dev Web: Front-end"),
("Dev Web: Back-end"),
("Dev Mobile"),
("Ciência de Dados"),
("Machine Learning"),
("Banco de Dados"),
("Cloud e DevOps"),
("Jogos Digitais"),
("Cibersegurança");

insert into pessoa (nome, matricula, interesse) values
("Cristian Franklin Feitoza de Oliveira", "2023003580", 5),
("George Anderson Batista Valente", "2023004309", 1),
("Harley Leite Silva", "2023005600", 1),
("José Diogo Dutra Pacheco", "2023005290", 2);

select * from interesse order by id asc;

select * from pessoa order by id asc;

select matricula, nome, area_de_interesse
from pessoa
join interesse
where pessoa.interesse = interesse.id;