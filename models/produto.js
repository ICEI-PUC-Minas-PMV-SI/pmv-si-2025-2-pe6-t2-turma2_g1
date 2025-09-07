const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema({
  nome: String,
  imagem: String,
  contagemEstoque: {
    type: Number,
    required: true,
  },
});

exports.Produto = mongoose.model('Produto', produtoSchema);
