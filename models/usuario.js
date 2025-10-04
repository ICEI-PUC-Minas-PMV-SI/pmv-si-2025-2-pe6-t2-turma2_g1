const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Hashsenha: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  rua: {
    type: String,
    default: '',
  },
  apartamento: {
    type: String,
    default: '',
  },
  cep: {
    type: String,
    default: '',
  },
  cidade: {
    type: String,
    default: '',
  },
  estado: {
    type: String,
    default: '',
  },
});

usuarioSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

usuarioSchema.set('toJSON', {
  virtuals: true,
});

exports.Usuario = mongoose.model('Usuario', usuarioSchema);
exports.usuarioSchema = usuarioSchema;
