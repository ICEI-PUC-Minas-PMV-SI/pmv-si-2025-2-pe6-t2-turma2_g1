const express = require('express');
const { executeQuery, executeTransaction } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { validateCartItem } = require('../middleware/validation');

const router = express.Router();

// GET /api/cart - Obter itens do carrinho
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartItems = await executeQuery(`
      SELECT 
        ci.id,
        ci.quantity,
        ci.created_at,
        p.id as product_id,
        p.name,
        p.price,
        p.image_url,
        p.stock,
        p.specs,
        p.features,
        c.name as category_name
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      JOIN categories c ON p.category_id = c.id
      WHERE ci.user_id = ? AND p.is_active = 1
      ORDER BY ci.created_at DESC
    `, [req.user.id]);

    // Processar itens
    const processedItems = cartItems.map(item => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      price: parseFloat(item.price),
      image: item.image_url,
      stock: item.stock,
      quantity: item.quantity,
      subtotal: parseFloat(item.price) * item.quantity,
      category: item.category_name,
      specs: item.specs ? JSON.parse(item.specs) : [],
      features: item.features ? JSON.parse(item.features) : [],
      inStock: item.stock > 0,
      canAddMore: item.quantity < item.stock
    }));

    // Calcular totais
    const totalItems = processedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = processedItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      items: processedItems,
      summary: {
        totalItems,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        itemCount: processedItems.length
      }
    });

  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/cart - Adicionar item ao carrinho
router.post('/', authenticateToken, validateCartItem, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Verificar se produto existe e está ativo
    const products = await executeQuery(
      'SELECT id, name, price, stock FROM products WHERE id = ? AND is_active = 1',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    const product = products[0];

    // Verificar estoque
    if (product.stock < quantity) {
      return res.status(400).json({
        error: `Estoque insuficiente. Disponível: ${product.stock} unidades`
      });
    }

    // Verificar se item já existe no carrinho
    const existingItems = await executeQuery(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    );

    if (existingItems.length > 0) {
      // Atualizar quantidade
      const newQuantity = existingItems[0].quantity + quantity;
      
      if (newQuantity > product.stock) {
        return res.status(400).json({
          error: `Quantidade excede o estoque disponível. Disponível: ${product.stock} unidades`
        });
      }

      await executeQuery(
        'UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newQuantity, existingItems[0].id]
      );

      res.json({
        message: 'Quantidade atualizada no carrinho',
        quantity: newQuantity
      });
    } else {
      // Adicionar novo item
      await executeQuery(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [req.user.id, productId, quantity]
      );

      res.status(201).json({
        message: 'Item adicionado ao carrinho',
        quantity
      });
    }

  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/cart/:id - Atualizar quantidade do item
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        error: 'Quantidade deve ser um número positivo'
      });
    }

    // Verificar se item existe e pertence ao usuário
    const cartItems = await executeQuery(`
      SELECT ci.id, ci.quantity, p.stock, p.name
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ? AND ci.user_id = ? AND p.is_active = 1
    `, [id, req.user.id]);

    if (cartItems.length === 0) {
      return res.status(404).json({
        error: 'Item não encontrado no carrinho'
      });
    }

    const cartItem = cartItems[0];

    // Verificar estoque
    if (quantity > cartItem.stock) {
      return res.status(400).json({
        error: `Estoque insuficiente. Disponível: ${cartItem.stock} unidades`
      });
    }

    // Atualizar quantidade
    await executeQuery(
      'UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [quantity, id]
    );

    res.json({
      message: 'Quantidade atualizada',
      quantity
    });

  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/cart/:id - Remover item do carrinho
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se item existe e pertence ao usuário
    const result = await executeQuery(
      'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Item não encontrado no carrinho'
      });
    }

    res.json({
      message: 'Item removido do carrinho'
    });

  } catch (error) {
    console.error('Erro ao remover do carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/cart - Limpar carrinho
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM cart_items WHERE user_id = ?',
      [req.user.id]
    );

    res.json({
      message: 'Carrinho limpo com sucesso'
    });

  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/cart/count - Obter quantidade total de itens
router.get('/count', authenticateToken, async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT SUM(quantity) as total FROM cart_items WHERE user_id = ?',
      [req.user.id]
    );

    const total = result[0].total || 0;

    res.json({
      totalItems: total
    });

  } catch (error) {
    console.error('Erro ao contar itens do carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/cart/validate - Validar carrinho antes do checkout
router.post('/validate', authenticateToken, async (req, res) => {
  try {
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

    const issues = [];
    let totalPrice = 0;

    for (const item of cartItems) {
      // Verificar se produto ainda está ativo
      if (!item.is_active) {
        issues.push({
          type: 'inactive_product',
          message: `Produto "${item.name}" não está mais disponível`,
          itemId: item.id
        });
        continue;
      }

      // Verificar estoque
      if (item.quantity > item.stock) {
        issues.push({
          type: 'insufficient_stock',
          message: `Estoque insuficiente para "${item.name}". Disponível: ${item.stock}`,
          itemId: item.id,
          availableStock: item.stock
        });
        continue;
      }

      totalPrice += parseFloat(item.price) * item.quantity;
    }

    res.json({
      isValid: issues.length === 0,
      issues,
      summary: {
        totalItems: cartItems.length,
        totalPrice: parseFloat(totalPrice.toFixed(2))
      }
    });

  } catch (error) {
    console.error('Erro ao validar carrinho:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;


