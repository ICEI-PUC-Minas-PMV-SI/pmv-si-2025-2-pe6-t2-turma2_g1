const { Categoria } = require('../models/categoria');
const { Produto } = require('../models/produto');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//rota get com filtragem por categorias ex: http://localhost:3000/api/v1/produtos?categorias=68d5c2b45a9ca4a5ed0b7c16
router.get(`/`, async (req, res) => {
  let filtro = {};
  if (req.query.categorias) {
    filtro = { categoria: req.query.categorias.split(',') };
  }
  const produtoLista = await Produto.find(filtro).populate('categoria');

  if (!produtoLista) {
    res.status(500).json({ success: false });
  }
  res.send(produtoLista);
});

// solicitacao get apenas para listar um produto
router.get(`/:id`, async (req, res) => {
  const produto = await Produto.findById(req.params.id).populate('categoria');

  if (!produto) {
    res.status(500).json({ success: false });
  }
  res.send(produto);
});

router.post(`/`, async (req, res) => {
  const categoria = await Categoria.findById(req.body.categoria);
  if (!categoria) return res.status(400).send('Categoria invalida');

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

  if (!produto) return res.status(500).send('Produto não pode ser criado');

  res.send(produto);
});

//atualizar um produto
router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Id do Produto invalido');
  }
  const categoria = await Categoria.findById(req.body.categoria);
  if (!categoria) return res.status(400).send('Categoria invalida');

  const produto = await Produto.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      descricao: req.body.descricao,
      descricaoDetalhada: req.body.descricaoDetalhada,
      imagem: req.body.imagem,
      marca: req.body.marca,
      preco: req.body.preco,
      categoria: req.body.categoria,
      contagemEstoque: req.body.contagemEstoque,
      emDestaque: req.body.emDestaque,
    },
    { new: true },
  );

  if (!produto)
    return res.status(500).send('O produto nao pode ser atualizado!');

  res.send(produto);
});

router.delete('/:id', (req, res) => {
  Produto.findByIdAndDelete(req.params.id)
    .then((produto) => {
      if (produto) {
        return res
          .status(200)
          .json({ success: true, message: 'O produto foi deletado!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'O produto nao foi encontrado!' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

//Quantos produtos tenho no banco de dados
router.get(`/get/quantidade`, async (req, res) => {
  const quantidadeProduto = await Produto.countDocuments({});

  if (!quantidadeProduto) {
    res.status(500).json({ success: false });
  }
  res.send({
    quantidadeProduto: quantidadeProduto,
  });
});

//Rota para produtos em destaque
router.get(`/get/destaque/:quantidade`, async (req, res) => {
  const quantidade = req.params.quantidade ? req.params.quantidade : 0;
  const produtos = await Produto.find({ emDestaque: true }).limit(+quantidade);

  if (!produtos) {
    res.status(500).json({ success: false });
  }
  res.send(produtos);
});

module.exports = router;
