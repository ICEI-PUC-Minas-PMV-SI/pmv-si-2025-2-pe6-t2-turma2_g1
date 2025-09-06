const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema({
  nome: String,
  imagem: String,
  contagemEstoque: Number,
});

exports.Produto = mongoose.model('Produto', produtoSchema);
