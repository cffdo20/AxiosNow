import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button } from '@mui/material';

interface Person {
  id: number;
  nome: string;
  matricula: string;
  areaInteresse: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchNome, setSearchNome] = useState<string>(""); // Filtro por nome
  const [searchInteresse, setSearchInteresse] = useState<string>(""); // Filtro por interesse

  const fetchData = async () => {
    try {
      const response = await axios.get<Person[]>(
        "http://10.100.38.226:8080/api/pessoas"
      );
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
      await axios.delete(`http://10.100.38.226:8080/api/pessoas/${matricula}`);
      setRefreshFlag(prev => !prev);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao deletar registro");
      }
    }
  };

  // Filtro combinado de nome e interesse
  const filteredData = data.filter((person) =>
    person.nome.toLowerCase().includes(searchNome.toLowerCase()) &&
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
            <th>Matricula</th>
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
};

export default DataTable;
