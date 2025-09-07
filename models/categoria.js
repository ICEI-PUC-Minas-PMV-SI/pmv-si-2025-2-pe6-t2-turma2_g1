const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({});

exports.Categoria = mongoose.model('Categoria', categoriaSchema);
