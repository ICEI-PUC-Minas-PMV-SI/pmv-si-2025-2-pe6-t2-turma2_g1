const { Categoria } = require('../models/categoria');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoriaLista = await Categoria.find();

  if (!categoriaLista) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoriaLista);
});

router.get('/:id', async (req, res) => {
  const categoria = await Categoria.findById(req.params.id);
  if (!categoria) {
    res.status(500).json({
      massage: 'A categoria esta com o ID fornecido nao foi encontrada ',
    });
  }
  res.status(200).send(categoria);
});

router.post('/', async (req, res) => {
  let categoria = new Categoria({
    nome: req.body.nome,
    icone: req.body.icone,
    cor: req.body.cor,
  });
  categoria = await categoria.save();

  if (!categoria)
    return res.status(400).send('A categoria nao pode ser criada!');

  res.send(categoria);
});

router.put('/:id', async (req, res) => {
  const categoria = await Categoria.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      icone: req.body.icone,
      cor: req.body.cor,
    },
    { new: true },
  );

  if (!categoria)
    return res.status(400).send('A categoria nao pode ser criada!');

  res.send(categoria);
});

router.delete('/:id', (req, res) => {
  Categoria.findByIdAndDelete(req.params.id)
    .then((categoria) => {
      if (categoria) {
        return res
          .status(200)
          .json({ success: true, message: 'A categoria foi deletada!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Categoria nao encontrada!' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
