const { Categoria } = require('../models/categoria');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoriaLista = await Categoria.find();

  if (!categoriaLista) {
    res.status(500).json({ success: false });
  }
  res.send(categoriaLista);
});

module.exports = router;
