const express = require('express');
const { executeQuery } = require('../config/database');
const { optionalAuth } = require('../middleware/auth');
const { validateId, validatePagination, validateSearch } = require('../middleware/validation');

const router = express.Router();

// GET /api/products - Listar produtos com filtros
router.get('/', optionalAuth, validatePagination, validateSearch, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      sortBy = 'name',
      sortOrder = 'ASC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = ['p.is_active = 1'];
    let queryParams = [];

    // Filtro por busca
    if (search) {
      whereConditions.push('(p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    // Filtro por categoria
    if (category) {
      whereConditions.push('c.slug = ?');
      queryParams.push(category);
    }

    // Filtro por preço
    if (minPrice) {
      whereConditions.push('p.price >= ?');
      queryParams.push(minPrice);
    }

    if (maxPrice) {
      whereConditions.push('p.price <= ?');
      queryParams.push(maxPrice);
    }

    // Ordenação válida
    const validSortFields = ['name', 'price', 'created_at', 'stock'];
    const validSortOrders = ['ASC', 'DESC'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    const sortDirection = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    // Query principal
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    const productsQuery = `
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
        p.created_at,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.${sortField} ${sortDirection}
      LIMIT ? OFFSET ?
    `;

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;

    queryParams.push(parseInt(limit), offset);

    const [products, countResult] = await Promise.all([
      executeQuery(productsQuery, queryParams.slice(0, -2).concat([parseInt(limit), offset])),
      executeQuery(countQuery, queryParams.slice(0, -2))
    ]);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Processar produtos
    const processedProducts = products.map(product => ({
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : [],
      features: product.features ? JSON.parse(product.features) : [],
      category: product.category_name,
      inStock: product.stock > 0
    }));

    res.json({
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
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/products/featured/list - Obter produtos em destaque
router.get('/featured/list', optionalAuth, async (req, res) => {
  try {
    const { limit = 6 } = req.query;

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
        c.name as category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1 AND p.stock > 0
      ORDER BY p.created_at DESC
      LIMIT ?
    `, [parseInt(limit)]);

    // Processar produtos
    const processedProducts = products.map(product => ({
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : [],
      features: product.features ? JSON.parse(product.features) : [],
      category: product.category_name,
      inStock: product.stock > 0
    }));

    res.json({
      products: processedProducts
    });

  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/products/search/suggestions - Sugestões de busca
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await executeQuery(`
      SELECT DISTINCT p.name, c.name as category
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1 AND p.name LIKE ?
      LIMIT 10
    `, [`%${q}%`]);

    res.json({ suggestions: suggestions.map(s => ({ name: s.name, category: s.category })) });

  } catch (error) {
    console.error('Erro ao buscar sugestões:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/products/:id - Obter produto por ID
router.get('/:id', optionalAuth, validateId, async (req, res) => {
  try {
    const { id } = req.params;

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
        p.created_at,
        p.updated_at,
        c.name as category_name,
        c.slug as category_slug,
        c.description as category_description
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ? AND p.is_active = 1
    `, [id]);

    if (products.length === 0) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    const product = products[0];
    const processedProduct = {
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : [],
      features: product.features ? JSON.parse(product.features) : [],
      category: product.category_name,
      inStock: product.stock > 0
    };

    res.json({
      product: processedProduct
    });

  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
