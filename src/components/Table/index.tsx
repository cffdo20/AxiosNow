import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./styles.css";

interface Person {
  id: number;
  nome: string;
  matricula: string;
  areaInteresse: string;
}

export function DataTable() {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchNome, setSearchNome] = useState<string>(""); // Filtro por nome
  const [searchInteresse, setSearchInteresse] = useState<string>(""); // Filtro por interesse

  const fetchData = async () => {
    try {
      const response = await api.get<Person[]>("/pessoas");
      setData(response.data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  const handleDelete = async (matricula: string) => {
    console.log(matricula);
    try {
      await api.delete(`/pessoas${matricula}`);
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao deletar registro");
      }
    }
  };

  // Filtro combinado de nome e interesse
  const filteredData = data.filter(
    (person) =>
      person.nome.toLocaleLowerCase().includes(searchNome.toLowerCase()) &&
      person.areaInteresse.toLowerCase().includes(searchInteresse.toLowerCase())
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Pesquisa por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Pesquisa por Interesse"
          value={searchInteresse}
          onChange={(e) => setSearchInteresse(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Interesse</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person) => (
            <tr key={person.matricula}>
              <td>{person.matricula}</td>
              <td>{person.nome}</td>
              <td>{person.areaInteresse}</td>
              <td>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(person.matricula)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
