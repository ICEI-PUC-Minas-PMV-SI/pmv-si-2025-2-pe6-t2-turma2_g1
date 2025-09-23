const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  descricaoDetalhada: {
    type: String,
    default: '',
  },
  imagem: {
    type: String,
    default: '',
  },
  marca: {
    type: String,
    default: '',
  },
  preco: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  contagemEstoque: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

exports.Produto = mongoose.model('Produto', produtoSchema);
