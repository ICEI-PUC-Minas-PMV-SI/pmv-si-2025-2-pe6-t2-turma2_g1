const { Categoria } = require("../models/categoria");
const { Produto } = require("../models/produto");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//rota get com filtragem por categorias ex: http://localhost:3000/api/v1/produtos?categorias=68d5c2b45a9ca4a5ed0b7c16
router.get(`/`, async (req, res) => {
  let filtro = {};
  if (req.query.categorias) {
    filtro = { categoria: req.query.categorias.split(",") };
  }
  const produtoLista = await Produto.find(filtro).populate("categoria");

  if (!produtoLista) {
    res.status(500).json({ success: false });
  }
  res.send(produtoLista);
});

// solicitacao get apenas para listar um produto
router.get(`/:id`, async (req, res) => {
  const produto = await Produto.findById(req.params.id).populate("categoria");

  if (!produto) {
    res.status(500).json({ success: false });
  }
  res.send(produto);
});

router.post(`/`, async (req, res) => {
  const categoria = await Categoria.findById(req.body.categoria);
  if (!categoria) return res.status(400).send("Categoria invalida");

  let produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    descricaoDetalhada: req.body.descricaoDetalhada,
    imagem: req.body.imagem,
    marca: req.body.marca,
    preco: req.body.preco,
    categoria: req.body.categoria,
    contagemEstoque: req.body.contagemEstoque,
    emDestaque: req.body.emDestaque,
  });
  produto = await produto.save();

  if (!produto) return res.status(500).send("Produto não pode ser criado");

  res.send(produto);
});

module.exports = router;
