const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//app.use(cors());
//app.options('*', cors()); // Este código aqui está dand erro na aplicação. Preciso investigar

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny')); //formato de log de registro de eventos da API no console/terminal

//Routers
const produtosRouter = require('./routers/produtos');
const categoriasRouter = require('./routers/categorias');
const usuariosRouter = require('./routers/usuarios');
const pedidosRouter = require('./routers/pedidos');

const api = process.env.API_URL;

app.use(`${api}/produtos`, produtosRouter);
app.use(`${api}/categorias`, categoriasRouter);
app.use(`${api}/usuarios`, usuariosRouter);
app.use(`${api}/pedidos`, pedidosRouter);

//conexão com banco
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
