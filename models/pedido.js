const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema({
  itensPedido: [
    // mesmo nome usado nas rotas
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemPedido", // corresponde ao modelo ItemPedido
      required: true,
    },
  ],
  enderecoEntrega1: {
    type: String,
    required: true,
  },
  enderecoEntrega2: {
    type: String,
  },
  cidade: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },

  telefone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pendente",
  },
  precoTotal: {
    type: Number,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // referencia a model Usuario
    required: true,
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
});

// cria campo virtual "id" para facilitar
pedidoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

pedidoSchema.set("toJSON", {
  virtuals: true,
});

exports.Pedido = mongoose.model("Pedido", pedidoSchema);
