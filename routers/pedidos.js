const { Pedido } = require('../models/pedido');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const pedidoLista = await Pedido.find();

  if (!pedidoLista) {
    res.status(500).json({ success: false });
  }
  res.send(pedidoLista);
});

module.exports = router;
