const express = require('express');
const bcrypt = require('bcryptjs');
const { executeQuery } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateId } = require('../middleware/validation');

const router = express.Router();

// GET /api/users/profile - Obter perfil do usuário
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const users = await executeQuery(`
      SELECT 
        id, name, email, company, cnpj, phone, role, created_at, updated_at
      FROM users 
      WHERE id = ? AND is_active = 1
    `, [req.user.id]);

    if (users.length === 0) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    res.json({
      user: users[0]
    });

  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/users/profile - Atualizar perfil do usuário
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, role } = req.body;

    // Validar dados
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        error: 'Nome deve ter pelo menos 2 caracteres'
      });
    }

    if (phone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone)) {
      return res.status(400).json({
        error: 'Telefone deve estar no formato (00) 00000-0000'
      });
    }

    const validRoles = ['Gerente de Compras', 'Coordenador de TI', 'Coordenador de Logística', 'Diretor', 'Outro'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        error: 'Cargo inválido'
      });
    }

    // Atualizar perfil
    await executeQuery(`
      UPDATE users 
      SET name = ?, phone = ?, role = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [name.trim(), phone, role, req.user.id]);

    // Buscar dados atualizados
    const updatedUser = await executeQuery(`
      SELECT id, name, email, company, cnpj, phone, role, created_at, updated_at
      FROM users 
      WHERE id = ?
    `, [req.user.id]);

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: updatedUser[0]
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/users - Listar usuários (apenas admin)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role, isActive } = req.query;
    const offset = (page - 1) * limit;

    let whereConditions = [];
    let queryParams = [];

    if (search) {
      whereConditions.push('(name LIKE ? OR email LIKE ? OR company LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (role) {
      whereConditions.push('role = ?');
      queryParams.push(role);
    }

    if (isActive !== undefined) {
      whereConditions.push('is_active = ?');
      queryParams.push(isActive === 'true');
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const users = await executeQuery(`
      SELECT 
        id, name, email, company, cnpj, phone, role, is_active, created_at, updated_at
      FROM users 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, parseInt(limit), offset]);

    // Contar total
    const countResult = await executeQuery(`
      SELECT COUNT(*) as total
      FROM users 
      ${whereClause}
    `, queryParams);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      users,
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
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/users/:id - Obter usuário por ID (apenas admin)
router.get('/:id', authenticateToken, requireAdmin, validateId, async (req, res) => {
  try {
    const { id } = req.params;

    const users = await executeQuery(`
      SELECT 
        id, name, email, company, cnpj, phone, role, is_active, created_at, updated_at
      FROM users 
      WHERE id = ?
    `, [id]);

    if (users.length === 0) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    res.json({
      user: users[0]
    });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/users/:id/status - Ativar/desativar usuário (apenas admin)
router.put('/:id/status', authenticateToken, requireAdmin, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'Status deve ser true ou false'
      });
    }

    // Verificar se usuário existe
    const users = await executeQuery(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    // Não permitir desativar a si mesmo
    if (parseInt(id) === req.user.id && !isActive) {
      return res.status(400).json({
        error: 'Não é possível desativar sua própria conta'
      });
    }

    // Atualizar status
    await executeQuery(
      'UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [isActive, id]
    );

    res.json({
      message: `Usuário ${isActive ? 'ativado' : 'desativado'} com sucesso`,
      user: {
        id: parseInt(id),
        name: users[0].name,
        email: users[0].email,
        isActive
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar status do usuário:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/users/:id/role - Alterar cargo do usuário (apenas admin)
router.put('/:id/role', authenticateToken, requireAdmin, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['Gerente de Compras', 'Coordenador de TI', 'Coordenador de Logística', 'Diretor', 'Outro'];
    
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: 'Cargo inválido'
      });
    }

    // Verificar se usuário existe
    const users = await executeQuery(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        error: 'Usuário não encontrado'
      });
    }

    // Atualizar cargo
    await executeQuery(
      'UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [role, id]
    );

    res.json({
      message: 'Cargo atualizado com sucesso',
      user: {
        id: parseInt(id),
        name: users[0].name,
        email: users[0].email,
        role
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/users/stats/summary - Estatísticas de usuários (apenas admin)
router.get('/stats/summary', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stats = await executeQuery(`
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_users,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive_users,
        SUM(CASE WHEN role = 'Gerente de Compras' THEN 1 ELSE 0 END) as managers,
        SUM(CASE WHEN role = 'Coordenador de TI' THEN 1 ELSE 0 END) as it_coordinators,
        SUM(CASE WHEN role = 'Coordenador de Logística' THEN 1 ELSE 0 END) as logistics_coordinators,
        SUM(CASE WHEN role = 'Diretor' THEN 1 ELSE 0 END) as directors,
        SUM(CASE WHEN role = 'Outro' THEN 1 ELSE 0 END) as others
      FROM users
    `);

    const result = stats[0];

    res.json({
      summary: {
        totalUsers: parseInt(result.total_users),
        activeUsers: parseInt(result.active_users),
        inactiveUsers: parseInt(result.inactive_users),
        byRole: {
          managers: parseInt(result.managers),
          itCoordinators: parseInt(result.it_coordinators),
          logisticsCoordinators: parseInt(result.logistics_coordinators),
          directors: parseInt(result.directors),
          others: parseInt(result.others)
        }
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


