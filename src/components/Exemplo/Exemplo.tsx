import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

const ExampleComponent = () => {
  /* useStates */
  const [matricula, setMatricula] = useState(""); 
  const [nome, setName] = useState("");
  const [interests, setInterests] = useState([]) 
  const [areaInteresse, setAreaInteresse] = useState("")

  /* useEffect: para obter a lista de interesses na montagem do componente. */
  useEffect(() =>{ 
    const fetchInterests = async() => {
      try{
        const response = await axios.get("http://localhost:8080/api/interesses"); 
        setInterests(response.data)
        console.log(response.data)
      }catch(error){
        console.log("Erro ao buscar os interesses", error)
      }
    }

    fetchInterests(); 

  },[]) //array de dependências: executa apenas na montagem inicial do componente. 

  /* handleChange para atualizar o estado */
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => { 
    setAreaInteresse(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson = {
      nome,
      matricula,
      areaInteresse
    }; 

    try {
      console.log(newPerson)
      const response = await axios.post(
        "http://localhost:8080/api/pessoas",
        newPerson
      );
      console.log("Pessoa criada!:", response.data);
      // Limpando os campos do Form
      setMatricula("");
      setName("");
      setAreaInteresse("");
    } catch (error) {
      console.error("Houve um erro criando a pessoa:", error);
    }
  };

  return (
    <div className="container">
      <h2>Criar novo Aluno</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="personMatricula">Matrícula</label>
          <input
            id="personMatricula"
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="personName">Nome</label>
          <input
            id="personName"
            type="text"
            value={nome}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {/* Select para área de interesse */}
        <div>
        {interests &&(
          <>
          <label htmlFor="interests">Escolha um interesse:</label>
        <select id="interests" value = {areaInteresse} onChange = {handleChange}>
          <option value="" disabled> -- Selecione um interesse --</option>
          {interests.map((areaInteresse) => (
            <option key = {areaInteresse.nomeArea} value = {areaInteresse.nomeArea}> {areaInteresse.nomeArea}</option>
          ))}
        </select>
          </>
        )
        
        }

        </div>
        
        <div className="btn-container">
          <button type="submit" className="btn btn-primary">
            Cadastrar Pessoa
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExampleComponent;