const { Pedido } = require("../models/pedido");
const express = require("express");
const { ItemPedido } = require("../models/item-pedido");
const router = express.Router();

// Listar todos os pedidos
router.get(`/`, async (req, res) => {
  const listaPedidos = await Pedido.find()
    .populate("usuario", "nome")
    .sort({ dataPedido: -1 });

  if (!listaPedidos) {
    return res.status(500).json({ sucesso: false });
  }
  res.send(listaPedidos);
});

// Obter um pedido específico
router.get(`/:id`, async (req, res) => {
  const pedido = await Pedido.findById(req.params.id)
    .populate("usuario", "nome")
    .populate({
      path: "itensPedido",
      populate: {
        path: "produto",
        populate: "categoria",
      },
    });

  if (!pedido) {
    return res.status(500).json({ sucesso: false });
  }
  res.send(pedido);
});

// Criar novo pedido
router.post("/", async (req, res) => {
  const itensPedidoIds = Promise.all(
    req.body.itensPedido.map(async (item) => {
      let novoItemPedido = new ItemPedido({
        quantidade: item.quantidade,
        produto: item.produto,
      });

      novoItemPedido = await novoItemPedido.save();
      return novoItemPedido._id;
    }),
  );
  const itensPedidoIdsResolvidos = await itensPedidoIds;

  // Calcular preço total
  const precosTotais = await Promise.all(
    itensPedidoIdsResolvidos.map(async (itemId) => {
      const itemPedido = await ItemPedido.findById(itemId).populate(
        "produto",
        "preco",
      );
      const precoTotal = itemPedido.produto.preco * itemPedido.quantidade;
      return precoTotal;
    }),
  );

  const precoTotalPedido = precosTotais.reduce((a, b) => a + b, 0);

  let pedido = new Pedido({
    itensPedido: itensPedidoIdsResolvidos,
    enderecoEntrega1: req.body.enderecoEntrega1,
    enderecoEntrega2: req.body.enderecoEntrega2,
    cidade: req.body.cidade,
    cep: req.body.cep,
    estado: req.body.estado,
    telefone: req.body.telefone,
    status: req.body.status,
    precoTotal: precoTotalPedido,
    usuario: req.body.usuario,
  });
  pedido = await pedido.save();

  if (!pedido) return res.status(400).send("O pedido não pôde ser criado!");

  res.send(pedido);
});

// Atualizar status de pedido
router.put("/:id", async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );

  if (!pedido) return res.status(400).send("O pedido não pôde ser atualizado!");

  res.send(pedido);
});

// Deletar pedido
router.delete("/:id", (req, res) => {
  Pedido.findByIdAndDelete(req.params.id)
    .then(async (pedido) => {
      if (pedido) {
        await pedido.itensPedido.map(async (item) => {
          await ItemPedido.findByIdAndDelete(item);
        });
        return res
          .status(200)
          .json({ sucesso: true, mensagem: "O pedido foi deletado!" });
      } else {
        return res
          .status(404)
          .json({ sucesso: false, mensagem: "Pedido não encontrado!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ sucesso: false, erro: err });
    });
});

// Vendas totais
router.get("/get/vendasTotais", async (req, res) => {
  const vendasTotais = await Pedido.aggregate([
    { $group: { _id: null, vendasTotais: { $sum: "$precoTotal" } } },
  ]);

  if (!vendasTotais) {
    return res.status(400).send("As vendas não puderam ser calculadas");
  }

  res.send({ vendasTotais: vendasTotais.pop().vendasTotais });
});

// Contagem de pedidos
router.get(`/get/quantidade`, async (req, res) => {
  const qtdPedidos = await Pedido.countDocuments();

  if (!qtdPedidos) {
    res.status(500).json({ sucesso: false });
  }
  res.send({
    quantidadePedidos: qtdPedidos,
  });
});

// Pedidos por usuário
router.get(`/get/pedidosUsuario/:usuarioId`, async (req, res) => {
  const listaPedidosUsuario = await Pedido.find({
    usuario: req.params.usuarioId,
  })
    .populate({
      path: "itensPedido",
      populate: {
        path: "produto",
        populate: "categoria",
      },
    })
    .sort({ dataPedido: -1 });

  if (!listaPedidosUsuario) {
    res.status(500).json({ sucesso: false });
  }
  res.send(listaPedidosUsuario);
});

module.exports = router;
