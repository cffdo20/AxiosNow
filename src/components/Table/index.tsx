// Importação de componentes e ícones de bibliotecas externas
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { PencilLine, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api"; // Importação da instância Axios configurada
import "./styles.css";

// Definição de interfaces para tipos de dados
interface Interesse {
  id: string;
  nomeArea: string;
}

interface Person {
  id: string;
  nome: string;
  matricula: string;
  areaInteresse: string;
}

interface DataTableProps {
  refreshFlag: boolean;
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

// Função principal do componente DataTable
export function DataTable({ refreshFlag, setRefreshFlag }: DataTableProps) {
  // Definição de estados do componente
  const [data, setData] = useState<Person[]>([]); // Estado para armazenar a lista de pessoas
  const [interests, setInterests] = useState<Interesse[]>([]); // Estado para armazenar a lista de interesses
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro
  const [searchNome, setSearchNome] = useState<string>(""); // Estado para armazenar o termo de busca por nome
  const [searchInteresse, setSearchInteresse] = useState<string>(""); // Estado para armazenar o termo de busca por interesse
  const [editModalOpen, setEditModalOpen] = useState(false); // Estado para controlar a abertura do modal de edição
  const [currentEditData, setCurrentEditData] = useState<Person | null>(null); // Estado para armazenar os dados da pessoa em edição

  // Função para buscar os dados das pessoas na API
  const fetchData = async () => {
    try {
      // Chamada GET utilizando Axios para buscar a lista de pessoas
      const response = await api.get<Person[]>("/pessoas");
      setData(response.data); // Atualiza o estado com os dados recebidos
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Armazena a mensagem de erro
      } else {
        setError("Ocorreu um erro desconhecido"); // Mensagem de erro genérica
      }
    } finally {
      setLoading(false); // Define o estado como carregado
    }
  };

  // useEffect para buscar os interesses ao montar o componente
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        // Chamada GET utilizando Axios para buscar a lista de interesses
        const response = await api.get("interesses");
        setInterests(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.log("Erro ao buscar os interesses", error); // Log de erro no console
      }
    };

    fetchInterests();
  }, []);

  // useEffect para buscar os dados das pessoas ao montar o componente e ao atualizar a flag de atualização
  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  // Função para abrir o modal de edição com os dados da pessoa selecionada
  const handleEditClick = (person: Person) => {
    setCurrentEditData(person);
    setEditModalOpen(true);
  };

  // Função para salvar as alterações feitas na edição
  const handleSaveEdit = async () => {
    if (!currentEditData) return;

    try {
      // Chamada PUT utilizando Axios para atualizar os dados da pessoa
      await api.put(`/pessoas/${currentEditData.id}`, currentEditData); //mudar o .id para .matricula quando rodar na API do Diogo.
      setEditModalOpen(false); // Fecha o modal de edição
      setRefreshFlag((prev) => !prev); // Atualiza a flag de atualização para buscar os dados novamente
    } catch (err) {
      console.error("Erro ao salvar alterações:", err); // Log de erro no console
      setError("Erro ao salvar alterações"); // Armazena a mensagem de erro
    }
  };

  // Função para deletar uma pessoa pelo número de matrícula
  const handleDelete = async (id: string) => {
    try {
      // Chamada DELETE utilizando Axios para deletar a pessoa
      await api.delete(`/pessoas/${id}`);
      setRefreshFlag((prev) => !prev); // Atualiza a flag de atualização para buscar os dados novamente
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Armazena a mensagem de erro
      } else {
        setError("Erro ao deletar registro"); // Mensagem de erro genérica
      }
    }
  };

  // Filtra os dados conforme os termos de busca
  const filteredData = data.filter(
    (person) =>
      person.nome.toLowerCase().includes(searchNome.toLowerCase()) &&
      person.areaInteresse.toLowerCase().includes(searchInteresse.toLowerCase())
  );

  // Renderiza o componente de carregamento se os dados estiverem sendo carregados
  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  // Renderiza uma mensagem de erro se houver um erro
  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Renderiza a tabela de dados e os componentes de busca e modais
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
                <Button onClick={() => handleEditClick(person)}>
                  <PencilLine size={20} />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(person.id)} //mudar quando tiver usando a API do Diogo para matricula
                >
                  <Trash size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        fullWidth
      >
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
          {currentEditData && (
            <>
              <TextField
                margin="dense"
                label="Matrícula"
                fullWidth
                variant="standard"
                value={currentEditData.matricula}
                disabled
              />
              <TextField
                margin="dense"
                label="Nome"
                fullWidth
                variant="standard"
                value={currentEditData.nome}
                onChange={(e) =>
                  setCurrentEditData({
                    ...currentEditData,
                    nome: e.target.value,
                  })
                }
              />

              <FormControl fullWidth variant="standard" margin="dense">
                <InputLabel>Área de Interesse</InputLabel>
                <Select
                  value={currentEditData.areaInteresse}
                  onChange={(e) =>
                    setCurrentEditData({
                      ...currentEditData,
                      areaInteresse: e.target.value,
                    })
                  }
                  label="Área de Interesse"
                >
                  <MenuItem value="" disabled>
                    -- Selecione um interesse --
                  </MenuItem>
                  {interests.map((interesse) => (
                    <MenuItem key={interesse.id} value={interesse.nomeArea}>
                      {interesse.nomeArea}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
