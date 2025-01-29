import { useState } from "react";
import "./App.css";
import { ExampleComponent } from "./components/Exemplo";
import { DataTable } from "./components/Table";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handlePersonAdded = () => {
    // Atualiza a flag de atualização para fazer o DataTable buscar os dados novamente
    setRefreshFlag((prev) => !prev);
  };
  return (
    <div className="containerApp">
      <ExampleComponent onPersonAdded={handlePersonAdded} />
      <DataTable refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
    </div>
  );
}

export default App;
