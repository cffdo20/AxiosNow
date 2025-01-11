// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fazendo a requisição ao backend
    axios.get('http://localhost:3001/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
      });
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Dados Externos:</h1>
      <pre>{JSON.stringify(data.externalData, null, 2)}</pre>
      <h1>Dados Adicionais:</h1>
      <pre>{JSON.stringify(data.additionalData, null, 2)}</pre>
    </div>
  );
};

export default App;