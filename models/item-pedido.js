const mongoose = require("mongoose");

const itemPedidoSchema = mongoose.Schema({
  quantidade: {
    type: Number,
    required: true,
  },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto", // referência ao model Produto
    required: true,
  },
});

exports.ItemPedido = mongoose.model("ItemPedido", itemPedidoSchema);
