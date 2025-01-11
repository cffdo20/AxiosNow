// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

//METODO GET

// Usar o middleware cors
app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const externalData = response.data;

    const additionalData = { relatedInfo: 'Some additional information' };

    const combinedData = {
      externalData,
      additionalData,
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    res.status(500).send('Erro ao fazer a requisição');
  }
});

//METODO POST

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Rota para lidar com requisições POST
app.post('/api/data', async (req, res) => {
  const postData = req.body; // Dados enviados pelo cliente

  try {
    // Fazendo uma requisição POST para uma API externa
    const response = await axios.post('https://api.example.com/data', postData);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    res.status(500).send('Erro ao fazer a requisição');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});