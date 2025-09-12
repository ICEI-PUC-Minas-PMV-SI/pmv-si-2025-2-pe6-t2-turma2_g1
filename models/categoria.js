const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  icone: {
    type: String,
  },
  cor: {
    type: String,
  },
});

exports.Categoria = mongoose.model('Categoria', categoriaSchema);
