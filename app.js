const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

const produtosRouter = require('./routers/produtos');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny')); //formato de log de registro de eventos da API no console/terminal

//Routers
app.use(`${api}/produtos`, produtosRouter);

//string de conexão com banco
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Conexao com banco de dados pronta');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('server rodando http://localhost:3000');
});
