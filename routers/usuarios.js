const { Usuario } = require("../models/usuario");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
  const usuarioLista = await Usuario.find();

  if (!usuarioLista) {
    res.status(500).json({ success: false });
  }
  res.send(usuarioLista);
});

router.get("/:id", async (req, res) => {
  const usuario = await Usuario.findById(req.params.id).select("-Hashsenha");

  if (!usuario) {
    res
      .status(500)
      .json({ message: "O usuário com o ID especificado não foi encontrado." });
  }
  res.status(200).send(usuario);
});

router.post("/", async (req, res) => {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    Hashsenha: bcrypt.hashSync(req.body.senha, 10),
    telefone: req.body.telefone,
    isAdmin: req.body.isAdmin,
    rua: req.body.rua,
    apartamento: req.body.apartamento,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
  });
  usuario = await usuario.save();

  if (!usuario) return res.status(400).send("O usuário não pode ser criado!");

  res.send(usuario);
});

router.put("/:id", async (req, res) => {
  const usuarioExiste = await Usuario.findById(req.params.id);
  let novaSenha;
  if (req.body.senha) {
    novaSenha = bcrypt.hashSync(req.body.senha, 10);
  } else {
    novaSenha = usuarioExiste.Hashsenha;
  }

  const usuario = await Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      email: req.body.email,
      Hashsenha: novaSenha,
      telefone: req.body.telefone,
      isAdmin: req.body.isAdmin,
      rua: req.body.rua,
      apartamento: req.body.apartamento,
      cep: req.body.cep,
      cidade: req.body.cidade,
      estado: req.body.estado,
    },
    { new: true },
  );

  if (!usuario) return res.status(400).send("O usuário não pode ser criado!");

  res.send(usuario);
});

router.post("/login", async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.body.email });
  const secret = process.env.SECRET;
  if (!usuario) {
    return res.status(400).send("O usuário não foi encontrado");
  }

  if (usuario && bcrypt.compareSync(req.body.senha, usuario.Hashsenha)) {
    const token = jwt.sign(
      {
        usuarioId: usuario.id,
        isAdmin: usuario.isAdmin,
      },
      secret,
      { expiresIn: "1d" },
    );

    res.status(200).send({ usuario: usuario.email, token: token });
  } else {
    res.status(400).send("A senha está incorreta!");
  }
});

router.post("/registrar", async (req, res) => {
  let usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    Hashsenha: bcrypt.hashSync(req.body.senha, 10),
    telefone: req.body.telefone,
    isAdmin: req.body.isAdmin,
    rua: req.body.rua,
    apartamento: req.body.apartamento,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
  });
  usuario = await usuario.save();

  if (!usuario) return res.status(400).send("O usuário não pode ser criado!");

  res.send(usuario);
});

router.delete("/:id", (req, res) => {
  Usuario.findByIdAndDelete(req.params.id)
    .then((usuario) => {
      if (usuario) {
        return res
          .status(200)
          .json({ success: true, message: "O usuário foi deletado!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Usuário não encontrado!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/quantidade`, async (req, res) => {
  const usuarioQuantidade = await Usuario.quantidadeDocuments(
    (quantidade) => quantidade,
  );

  if (!usuarioQuantidade) {
    res.status(500).json({ success: false });
  }
  res.send({
    usuarioQuantidade: usuarioQuantidade,
  });
});

module.exports = router;
