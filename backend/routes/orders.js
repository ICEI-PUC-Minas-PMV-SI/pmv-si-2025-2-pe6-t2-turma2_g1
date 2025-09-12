const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { executeQuery, executeTransaction } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { validateOrder, validateId } = require('../middleware/validation');

const router = express.Router();

// Gerar número do pedido
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `TP${timestamp}${random}`;
};

// GET /api/orders - Listar pedidos do usuário
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE o.user_id = ?';
    let queryParams = [req.user.id];

    if (status) {
      whereClause += ' AND o.status = ?';
      queryParams.push(status);
    }

    const orders = await executeQuery(`
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total_amount,
        o.shipping_address,
        o.tracking_code,
        o.notes,
        o.created_at,
        o.updated_at,
        COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      ${whereClause}
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, parseInt(limit), offset]);

    // Contar total
    const countResult = await executeQuery(`
      SELECT COUNT(*) as total
      FROM orders o
      ${whereClause}
    `, queryParams);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      orders: orders.map(order => ({
        ...order,
        totalAmount: parseFloat(order.total_amount),
        itemCount: parseInt(order.item_count)
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/orders/:id - Obter detalhes do pedido
router.get('/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar pedido
    const orders = await executeQuery(`
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total_amount,
        o.shipping_address,
        o.tracking_code,
        o.notes,
        o.created_at,
        o.updated_at
      FROM orders o
      WHERE o.id = ? AND o.user_id = ?
    `, [id, req.user.id]);

    if (orders.length === 0) {
      return res.status(404).json({
        error: 'Pedido não encontrado'
      });
    }

    const order = orders[0];

    // Buscar itens do pedido
    const orderItems = await executeQuery(`
      SELECT 
        oi.id,
        oi.quantity,
        oi.unit_price,
        oi.total_price,
        p.id as product_id,
        p.name,
        p.image_url,
        p.specs,
        p.features,
        c.name as category_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN categories c ON p.category_id = c.id
      WHERE oi.order_id = ?
      ORDER BY oi.id
    `, [id]);

    const processedItems = orderItems.map(item => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      image: item.image_url,
      category: item.category_name,
      quantity: item.quantity,
      unitPrice: parseFloat(item.unit_price),
      totalPrice: parseFloat(item.total_price),
      specs: item.specs ? JSON.parse(item.specs) : [],
      features: item.features ? JSON.parse(item.features) : []
    }));

    res.json({
      order: {
        ...order,
        totalAmount: parseFloat(order.total_amount),
        items: processedItems
      }
    });

  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/orders - Criar novo pedido
router.post('/', authenticateToken, validateOrder, async (req, res) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    // Validar itens do carrinho
    const cartItems = await executeQuery(`
      SELECT 
        ci.id,
        ci.quantity,
        p.id as product_id,
        p.name,
        p.price,
        p.stock,
        p.is_active
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [req.user.id]);

    if (cartItems.length === 0) {
      return res.status(400).json({
        error: 'Carrinho vazio'
      });
    }

    // Validar cada item
    const orderItems = [];
    let totalAmount = 0;
    const cartItemMap = new Map(cartItems.map(item => [item.product_id, item]));

    for (const item of items) {
      const cartItem = cartItemMap.get(item.productId);
      
      if (!cartItem) {
        return res.status(400).json({
          error: `Produto ${item.productId} não encontrado no carrinho`
        });
      }

      if (!cartItem.is_active) {
        return res.status(400).json({
          error: `Produto "${cartItem.name}" não está mais disponível`
        });
      }

      if (item.quantity > cartItem.stock) {
        return res.status(400).json({
          error: `Estoque insuficiente para "${cartItem.name}". Disponível: ${cartItem.stock}`
        });
      }

      if (item.quantity !== cartItem.quantity) {
        return res.status(400).json({
          error: `Quantidade do item "${cartItem.name}" não confere com o carrinho`
        });
      }

      const unitPrice = parseFloat(cartItem.price);
      const totalPrice = unitPrice * item.quantity;
      totalAmount += totalPrice;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        totalPrice
      });
    }

    // Criar pedido em transação
    const orderNumber = generateOrderNumber();
    
    const queries = [
      {
        query: `
          INSERT INTO orders (order_number, user_id, total_amount, shipping_address, notes) 
          VALUES (?, ?, ?, ?, ?)
        `,
        params: [orderNumber, req.user.id, totalAmount, shippingAddress, notes || null]
      }
    ];

    // Executar transação
    const results = await executeTransaction(queries);
    const orderId = results[0].insertId;

    // Adicionar itens do pedido
    const itemQueries = orderItems.map(item => ({
      query: `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) 
        VALUES (?, ?, ?, ?, ?)
      `,
      params: [orderId, item.productId, item.quantity, item.unitPrice, item.totalPrice]
    }));

    // Atualizar estoque
    const stockQueries = orderItems.map(item => ({
      query: 'UPDATE products SET stock = stock - ? WHERE id = ?',
      params: [item.quantity, item.productId]
    }));

    // Limpar carrinho
    const clearCartQuery = {
      query: 'DELETE FROM cart_items WHERE user_id = ?',
      params: [req.user.id]
    };

    // Executar todas as operações
    await executeTransaction([
      ...itemQueries,
      ...stockQueries,
      clearCartQuery
    ]);

    // Buscar pedido criado
    const newOrder = await executeQuery(`
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.total_amount,
        o.shipping_address,
        o.notes,
        o.created_at
      FROM orders o
      WHERE o.id = ?
    `, [orderId]);

    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order: {
        ...newOrder[0],
        totalAmount: parseFloat(newOrder[0].total_amount)
      }
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/orders/:id/cancel - Cancelar pedido
router.put('/:id/cancel', authenticateToken, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // Verificar se pedido existe e pertence ao usuário
    const orders = await executeQuery(
      'SELECT id, status FROM orders WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        error: 'Pedido não encontrado'
      });
    }

    const order = orders[0];

    if (order.status === 'cancelado') {
      return res.status(400).json({
        error: 'Pedido já está cancelado'
      });
    }

    if (order.status === 'entregue') {
      return res.status(400).json({
        error: 'Não é possível cancelar um pedido já entregue'
      });
    }

    // Buscar itens do pedido para restaurar estoque
    const orderItems = await executeQuery(
      'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
      [id]
    );

    // Restaurar estoque
    const stockQueries = orderItems.map(item => ({
      query: 'UPDATE products SET stock = stock + ? WHERE id = ?',
      params: [item.quantity, item.product_id]
    }));

    // Atualizar status do pedido
    const updateOrderQuery = {
      query: 'UPDATE orders SET status = ?, notes = CONCAT(IFNULL(notes, ""), ?) WHERE id = ?',
      params: ['cancelado', `\nCancelado em ${new Date().toISOString()}. Motivo: ${reason || 'Não informado'}`, id]
    };

    // Executar transação
    await executeTransaction([...stockQueries, updateOrderQuery]);

    res.json({
      message: 'Pedido cancelado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao cancelar pedido:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/orders/stats/summary - Estatísticas do usuário
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const stats = await executeQuery(`
      SELECT 
        COUNT(*) as total_orders,
        SUM(CASE WHEN status = 'entregue' THEN 1 ELSE 0 END) as delivered_orders,
        SUM(CASE WHEN status = 'processando' THEN 1 ELSE 0 END) as processing_orders,
        SUM(CASE WHEN status = 'em_transito' THEN 1 ELSE 0 END) as shipping_orders,
        SUM(CASE WHEN status = 'cancelado' THEN 1 ELSE 0 END) as cancelled_orders,
        SUM(CASE WHEN status = 'entregue' THEN total_amount ELSE 0 END) as total_spent
      FROM orders 
      WHERE user_id = ?
    `, [req.user.id]);

    const result = stats[0];

    res.json({
      summary: {
        totalOrders: parseInt(result.total_orders),
        deliveredOrders: parseInt(result.delivered_orders),
        processingOrders: parseInt(result.processing_orders),
        shippingOrders: parseInt(result.shipping_orders),
        cancelledOrders: parseInt(result.cancelled_orders),
        totalSpent: parseFloat(result.total_spent || 0)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;


