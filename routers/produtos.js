const { Categoria } = require('../models/categoria');
const { Produto } = require('../models/produto');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos do e-commerce
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos (com opção de filtrar por categorias)
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: categorias
 *         schema:
 *           type: string
 *         description: IDs das categorias separados por vírgula
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   marca:
 *                     type: string
 *                   preco:
 *                     type: number
 */
//rota get com filtragem por categorias ex: http://localhost:3000/api/v1/produtos?categorias=68d5c2b45a9ca4a5ed0b7c16
router.get(`/`, async (req, res) => {
  let filtro = {};
  if (req.query.categorias) {
    filtro = { categoria: req.query.categorias.split(',') };
  }
  const produtoLista = await Produto.find(filtro).populate('categoria');

  if (!produtoLista) {
    res.status(500).json({ success: false });
  }
  res.send(produtoLista);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */

// solicitacao get apenas para listar um produto
router.get(`/:id`, async (req, res) => {
  const produto = await Produto.findById(req.params.id).populate('categoria');

  if (!produto) {
    res.status(500).json({ success: false });
  }
  res.send(produto);
});

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Fone de Ouvido Bluetooth"
 *               descricao:
 *                 type: string
 *                 example: "Fone sem fio com microfone embutido"
 *               descricaoDetalhada:
 *                 type: string
 *                 example: "Fone de ouvido Bluetooth 5.0 com cancelamento de ruído"
 *               imagem:
 *                 type: string
 *                 example: "https://exemplo.com/imagens/fone.jpg"
 *               marca:
 *                 type: string
 *                 example: "Logitech"
 *               preco:
 *                 type: number
 *                 example: 299.9
 *               categoria:
 *                 type: string
 *                 example: "68d5c2b45a9ca4a5ed0b7c16"
 *               contagemEstoque:
 *                 type: number
 *                 example: 10
 *               emDestaque:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Categoria inválida
 */

router.post(`/`, async (req, res) => {
  const categoria = await Categoria.findById(req.body.categoria);
  if (!categoria) return res.status(400).send('Categoria invalida');

  let produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    descricaoDetalhada: req.body.descricaoDetalhada,
    imagem: req.body.imagem,
    marca: req.body.marca,
    preco: req.body.preco,
    categoria: req.body.categoria,
    contagemEstoque: req.body.contagemEstoque,
    emDestaque: req.body.emDestaque,
  });
  produto = await produto.save();

  if (!produto) return res.status(500).send('Produto não pode ser criado');

  res.send(produto);
});

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               contagemEstoque:
 *                 type: number
 *               emDestaque:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: ID ou categoria inválidos
 */

//atualizar um produto
router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Id do Produto invalido');
  }
  const categoria = await Categoria.findById(req.body.categoria);
  if (!categoria) return res.status(400).send('Categoria invalida');

  const produto = await Produto.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      descricao: req.body.descricao,
      descricaoDetalhada: req.body.descricaoDetalhada,
      imagem: req.body.imagem,
      marca: req.body.marca,
      preco: req.body.preco,
      categoria: req.body.categoria,
      contagemEstoque: req.body.contagemEstoque,
      emDestaque: req.body.emDestaque,
    },
    { new: true },
  );

  if (!produto)
    return res.status(500).send('O produto nao pode ser atualizado!');

  res.send(produto);
});

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */

router.delete('/:id', (req, res) => {
  Produto.findByIdAndDelete(req.params.id)
    .then((produto) => {
      if (produto) {
        return res
          .status(200)
          .json({ success: true, message: 'O produto foi deletado!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'O produto nao foi encontrado!' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});
/**
 * @swagger
 * /produtos/get/quantidade:
 *   get:
 *     summary: Retorna a quantidade total de produtos cadastrados
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Quantidade total de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidadeProduto:
 *                   type: number
 *                   example: 42
 */
//Quantos produtos tenho no banco de dados
router.get(`/get/quantidade`, async (req, res) => {
  const quantidadeProduto = await Produto.countDocuments({});

  if (!quantidadeProduto) {
    res.status(500).json({ success: false });
  }
  res.send({
    quantidadeProduto: quantidadeProduto,
  });
});
/**
 * @swagger
 * /produtos/get/destaque/{quantidade}:
 *   get:
 *     summary: Lista produtos em destaque
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: quantidade
 *         required: false
 *         schema:
 *           type: integer
 *         description: Quantidade máxima de produtos em destaque a retornar
 *     responses:
 *       200:
 *         description: Lista de produtos em destaque
 */
//Rota para produtos em destaque
router.get(`/get/destaque/:quantidade`, async (req, res) => {
  const quantidade = req.params.quantidade ? req.params.quantidade : 0;
  const produtos = await Produto.find({ emDestaque: true }).limit(+quantidade);

  if (!produtos) {
    res.status(500).json({ success: false });
  }
  res.send(produtos);
});

module.exports = router;
