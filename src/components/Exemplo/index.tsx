// Importação de hooks do React e da instância Axios configurada
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./styles.css";

/* Interfaces */
// Define a estrutura dos dados de Interesse
interface Interesse {
  id: string;
  nomeArea: string;
}

interface ExampleComponentProps {
  onPersonAdded: () => void;
}

// Componente principal
export function ExampleComponent({ onPersonAdded }: ExampleComponentProps) {
  /* useStates */
  // Estados para armazenar os valores dos campos do formulário e a lista de interesses
  const [matricula, setMatricula] = useState("");
  const [nome, setName] = useState("");
  const [interests, setInterests] = useState<Interesse[]>([]);
  const [areaInteresse, setAreaInteresse] = useState("");

  /* useEffect: para obter a lista de interesses na montagem do componente. */
  useEffect(() => {
    //essa parte vai ser implementada
    const fetchInterests = async () => {
      try {
        // Chamada GET utilizando Axios para buscar a lista de interesses
        const response = await api.get("interesses");
        setInterests(response.data); // Atualiza o estado com os dados recebidos
        console.log(response.data); // Log dos dados recebidos para depuração
      } catch (error) {
        console.log("Erro ao buscar os interesses", error); // Log de erro no console
      }
    };

    fetchInterests();
  }, []); // Array de dependências vazio: executa apenas na montagem inicial do componente.

  /* handleChange para atualizar o estado */
  // Função para atualizar o estado da área de interesse quando o usuário seleciona uma opção no select
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAreaInteresse(e.target.value);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
    // essa parte vai ser implementada
    const newPerson = {
      nome,
      matricula,
      areaInteresse,
    };

    // essa parte vai ser implementada
    try {
      console.log(newPerson); // Log dos dados da nova pessoa para depuração
      // Chamada POST utilizando Axios para enviar os dados da nova pessoa para a API
      const response = await api.post("pessoas", newPerson);
      console.log("Pessoa criada!:", response.data); // Log da resposta da API para depuração
      // Chama o callback para informar que uma nova pessoa foi adicionada
      onPersonAdded();
      // Limpando os campos do formulário após o envio bem-sucedido
      setMatricula("");
      setName("");
      setAreaInteresse("");
    } catch (error) {
      console.error("Houve um erro criando a pessoa:", error); // Log de erro no console
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
          {interests && (
            <>
              <label htmlFor="interests">Escolha um interesse:</label>
              <select
                id="interests"
                value={areaInteresse}
                onChange={handleChange}
              >
                <option value="" disabled>
                  {" "}
                  -- Selecione um interesse --
                </option>
                {interests.map((areaInteresse) => (
                  <option
                    key={areaInteresse.nomeArea}
                    value={areaInteresse.nomeArea}
                  >
                    {" "}
                    {areaInteresse.nomeArea}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="btn-container">
          <button type="submit" className="btn btn-primary">
            Cadastrar Pessoa
          </button>
        </div>
      </form>
    </div>
  );
}
