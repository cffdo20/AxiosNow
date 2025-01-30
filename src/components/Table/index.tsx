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

  // Função para buscar os lista de pessoas na API
  // Bloco de código aqui

  // useEffect para buscar os interesses ao montar o componente
  useEffect(() => {
    //  Implementar função paar get interesses
    // Bloco de código aqui
  }, []);

  // useEffect para buscar os dados das pessoas ao montar o componente e ao atualizar a flag de atualização
  useEffect(() => {
    //chamar função que busca lista de pessoas
  }, [refreshFlag]);

  // Função para abrir o modal de edição com os dados da pessoa selecionada
  const handleEditClick = (person: Person) => {
    setCurrentEditData(person);
    setEditModalOpen(true);
  };

  // Função para salvar as alterações feitas na edição
  // Bloco de código aqui

  // Função para deletar uma pessoa pelo número de matrícula
  // Bloco de código aqui

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
                  onClick={() => {}} //Chamar a função de Delete aqui passando como parâmetro o valor de matricula da pessoa
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
        <DialogContent sx={{ overflow: "hidden" }}>
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
              <input
                type="text"
                placeholder="Pesquisa por nome"
                value={currentEditData.nome}
                onChange={(e) =>
                  setCurrentEditData({
                    ...currentEditData,
                    nome: e.target.value,
                  })
                }
                className="search-input-dialog"
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
          <Button onClick={() => {}} color="primary">
            {/*Chamar a função de Edit neste botão para finalizar a edição */}
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
