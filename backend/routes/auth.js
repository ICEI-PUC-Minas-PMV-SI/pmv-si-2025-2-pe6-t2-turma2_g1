const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { validateLogin, validateRegister } = require('../middleware/validation');

const router = express.Router();

// Gerar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/auth/register - Cadastrar novo usuário
router.post('/register', validateRegister, async (req, res) => {
  try {
    const { name, email, password, company, cnpj, phone, role } = req.body;

    // Verificar se email já existe
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        error: 'Email já cadastrado'
      });
    }

    // Verificar se CNPJ já existe
    const existingCNPJ = await executeQuery(
      'SELECT id FROM users WHERE cnpj = ?',
      [cnpj]
    );

    if (existingCNPJ.length > 0) {
      return res.status(400).json({
        error: 'CNPJ já cadastrado'
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário
    const result = await executeQuery(`
      INSERT INTO users (name, email, password, company, cnpj, phone, role, is_active) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `, [name, email, hashedPassword, company, cnpj, phone, role]);

    const userId = result.insertId;
    // Gerar token
    const token = generateToken(userId);

    // Otimização: Construir o objeto de usuário sem uma nova consulta ao banco.
    const userResponse = {
      id: userId,
      name,
      email,
      company,
      cnpj,
      phone,
      role
    };

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/auth/login - Login do usuário
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const users = await executeQuery(
      'SELECT id, name, email, password, company, cnpj, phone, role, is_active FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: 'Email ou senha incorretos'
      });
    }

    const user = users[0];

    // Verificar se usuário está ativo
    if (!user.is_active) {
      return res.status(401).json({
        error: 'Conta desativada. Entre em contato com o suporte.'
      });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        error: 'Email ou senha incorretos'
      });
    }

    // Gerar token
    const token = generateToken(user.id);

    // Remover senha da resposta
    delete user.password;
    delete user.is_active;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/auth/me - Obter dados do usuário logado
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/auth/refresh - Renovar token
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const newToken = generateToken(req.user.id);
    
    res.json({
      message: 'Token renovado com sucesso',
      token: newToken
    });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/auth/logout - Logout (apenas para registro)
router.post('/logout', authenticateToken, (req, res) => {
  // Em uma implementação real, você poderia adicionar o token a uma blacklist
  res.json({
    message: 'Logout realizado com sucesso'
  });
});

// POST /api/auth/change-password - Alterar senha
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Senha atual e nova senha são obrigatórias'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'Nova senha deve ter pelo menos 6 caracteres'
      });
    }

    // Buscar senha atual
    const users = await executeQuery(
      'SELECT password FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    // Verificar senha atual
    const validPassword = await bcrypt.compare(currentPassword, users[0].password);
    if (!validPassword) {
      return res.status(401).json({
        error: 'Senha atual incorreta'
      });
    }

    // Hash da nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha
    await executeQuery(
      'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [hashedNewPassword, req.user.id]
    );

    res.json({
      message: 'Senha alterada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
