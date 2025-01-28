import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";

import { Button } from '@mui/material'


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Person[]>(
          "http://10.100.38.226:8080/api/pessoas"
        );
        setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  /* const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/pessoas/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro");
      }
    }
  }; */

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Matricula</th>
          <th>Nome</th>
          <th>Interesse</th>
        </tr>
      </thead>
      <tbody>
        {data.map((person) => (
          <tr key={person.matricula}>
            <td>{person.matricula}</td>
            <td>{person.nome}</td>
            <td>{person.areaInteresse}</td>
            <td>
              <Button variant = "contained"
                className="btn-danger"
                onClick={() => handleDelete(person.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
