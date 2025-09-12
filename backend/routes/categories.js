const express = require('express');
const { executeQuery } = require('../config/database');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/categories - Listar todas as categorias
router.get('/', optionalAuth, async (req, res) => {
  try {
    const categories = await executeQuery(`
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.is_active,
        c.created_at,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.name ASC
    `);

    res.json({
      categories: categories.map(category => ({
        ...category,
        productCount: parseInt(category.product_count)
      }))
    });

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/categories/:slug - Obter categoria por slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params;

    const categories = await executeQuery(`
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.description,
        c.is_active,
        c.created_at,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.slug = ? AND c.is_active = 1
      GROUP BY c.id
    `, [slug]);

    if (categories.length === 0) {
      return res.status(404).json({
        error: 'Categoria não encontrada'
      });
    }

    const category = categories[0];

    res.json({
      category: {
        ...category,
        productCount: parseInt(category.product_count)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/categories/:slug/products - Obter produtos de uma categoria
router.get('/:slug/products', optionalAuth, async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 12, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    const offset = (page - 1) * limit;

    // Verificar se categoria existe
    const categories = await executeQuery(
      'SELECT id, name FROM categories WHERE slug = ? AND is_active = 1',
      [slug]
    );

    if (categories.length === 0) {
      return res.status(404).json({
        error: 'Categoria não encontrada'
      });
    }

    const category = categories[0];

    // Validar ordenação
    const validSortFields = ['name', 'price', 'created_at'];
    const validSortOrders = ['ASC', 'DESC'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    const sortDirection = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    // Buscar produtos
    const products = await executeQuery(`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.original_price,
        p.image_url,
        p.stock,
        p.specs,
        p.features,
        p.created_at
      FROM products p
      WHERE p.category_id = ? AND p.is_active = 1
      ORDER BY p.${sortField} ${sortDirection}
      LIMIT ? OFFSET ?
    `, [category.id, parseInt(limit), offset]);

    // Contar total
    const countResult = await executeQuery(
      'SELECT COUNT(*) as total FROM products WHERE category_id = ? AND is_active = 1',
      [category.id]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Processar produtos
    const processedProducts = products.map(product => ({
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : [],
      features: product.features ? JSON.parse(product.features) : [],
      category: category.name,
      inStock: product.stock > 0
    }));

    res.json({
      category: {
        id: category.id,
        name: category.name,
        slug: slug
      },
      products: processedProducts,
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
    console.error('Erro ao buscar produtos da categoria:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;


