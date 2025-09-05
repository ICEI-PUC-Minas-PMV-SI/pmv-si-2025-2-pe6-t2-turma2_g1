const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny')); //formato de log de registro de eventos da API no console/terminal

const produtoSchema = mongoose.Schema({
  nome: String,
  imagem: String,
  contagemEstoque: Number,
});

const Produto = mongoose.model('Produto', produtoSchema);

app.get(`${api}/produtos`, async (req, res) => {
  const produtoLista = await Produto.find();

  if (!produtoLista) {
    res.status(500).json({ success: false });
  }
  res.send(produtoLista);
});

app.post(`${api}/produtos`, (req, res) => {
  const produto = new Produto({
    nome: req.body.nome,
    imagem: req.body.imagem,
    contagemEstoque: req.body.contagemEstoque,
  });

  produto
    .save()
    .then((produtoAdicionado) => {
      res.status(201).json(produtoAdicionado);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

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
