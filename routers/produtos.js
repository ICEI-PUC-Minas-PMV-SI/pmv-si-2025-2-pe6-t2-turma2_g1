const Produto = require('../models/produtos');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const produtoLista = await Produto.find();

  if (!produtoLista) {
    res.status(500).json({ success: false });
  }
  res.send(produtoLista);
});

router.post(`/`, (req, res) => {
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

module.exports = router;
