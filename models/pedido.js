const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({});

exports.Pedido = mongoose.model('Pedido', pedidoSchema);
