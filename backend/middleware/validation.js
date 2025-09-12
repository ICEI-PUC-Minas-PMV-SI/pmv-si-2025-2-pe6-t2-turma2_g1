const { body, param, query, validationResult } = require('express-validator');

// Middleware para verificar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

// Validações para autenticação
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  handleValidationErrors
];

const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome da empresa deve ter entre 2 e 100 caracteres'),
  body('cnpj')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    .withMessage('CNPJ deve estar no formato 00.000.000/0000-00'),
  body('phone')
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    .withMessage('Telefone deve estar no formato (00) 00000-0000'),
  body('role')
    .isIn(['Gerente de Compras', 'Coordenador de TI', 'Coordenador de Logística', 'Diretor', 'Outro'])
    .withMessage('Cargo inválido'),
  handleValidationErrors
];

// Validações para produtos
const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Nome do produto deve ter entre 3 e 200 caracteres'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Descrição deve ter entre 10 e 1000 caracteres'),
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Preço deve ser um número positivo'),
  body('category')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Categoria deve ter entre 2 e 50 caracteres'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Estoque deve ser um número inteiro não negativo'),
  handleValidationErrors
];

// Validações para carrinho
const validateCartItem = [
  body('productId')
    .isInt({ min: 1 })
    .withMessage('ID do produto deve ser um número inteiro positivo'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantidade deve ser um número inteiro positivo'),
  handleValidationErrors
];

// Validações para pedidos
const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Pedido deve ter pelo menos um item'),
  body('items.*.productId')
    .isInt({ min: 1 })
    .withMessage('ID do produto inválido'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantidade inválida'),
  body('shippingAddress')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Endereço de entrega deve ter entre 10 e 200 caracteres'),
  handleValidationErrors
];

// Validações para parâmetros
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID deve ser um número inteiro positivo'),
  handleValidationErrors
];

// Validações para query parameters
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser entre 1 e 100'),
  handleValidationErrors
];

const validateSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Termo de busca deve ter entre 2 e 100 caracteres'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateRegister,
  validateProduct,
  validateCartItem,
  validateOrder,
  validateId,
  validatePagination,
  validateSearch
};


