const { Categoria } = require('../models/categoria');
const { Produto } = require('../models/produto');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const produtoLista = await Produto.find();

  if (!produtoLista) {
    res.status(500).json({ success: false });
  }
  res.send(produtoLista);
});

router.post(`/`, async (req, res) => {
  const categoria = await Categoria.findById(req.body.categoria);
  if (!categoria) return res.status(400).send('Categoria invalida');

  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    descricaoDetalhada: req.body.descricaoDetalhada,
    imagem: req.body.imagem,
    marca: req.body.marca,
    preco: req.body.preco,
    categoria: req.body.categoria,
    contagemEstoque: req.body.contagemEstoque, //35:00
  });
  produto = await produto.save();

  if (!produto) return res.status(500).send('Produto não pode ser criado');

  res.send(produto);
});

module.exports = router;
