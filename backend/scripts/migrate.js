const { executeQuery, testConnection } = require('../config/database');

const createTables = async () => {
  try {
    console.log('🔄 Iniciando migração do banco de dados...');

    // Tabela de usuários
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        company VARCHAR(100) NOT NULL,
        cnpj VARCHAR(18) UNIQUE NOT NULL,
        phone VARCHAR(15) NOT NULL,
        role ENUM('Gerente de Compras', 'Coordenador de TI', 'Coordenador de Logística', 'Diretor', 'Outro') NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Tabela de categorias
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE NOT NULL,
        slug VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Tabela de produtos
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        category_id INT NOT NULL,
        image_url VARCHAR(500),
        stock INT DEFAULT 0,
        specs JSON,
        features JSON,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
      )
    `);

    // Tabela de carrinho
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product (user_id, product_id)
      )
    `);

    // Tabela de pedidos
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_number VARCHAR(20) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        status ENUM('processando', 'em_transito', 'entregue', 'cancelado') DEFAULT 'processando',
        total_amount DECIMAL(10,2) NOT NULL,
        shipping_address TEXT NOT NULL,
        tracking_code VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
      )
    `);

    // Tabela de itens do pedido
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
      )
    `);

    // Índices para performance
    await executeQuery(`CREATE INDEX idx_products_category ON products(category_id)`);
    await executeQuery(`CREATE INDEX idx_products_active ON products(is_active)`);
    await executeQuery(`CREATE INDEX idx_orders_user ON orders(user_id)`);
    await executeQuery(`CREATE INDEX idx_orders_status ON orders(status)`);
    await executeQuery(`CREATE INDEX idx_cart_user ON cart_items(user_id)`);

    console.log('✅ Migração concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na migração:', error.message);
    throw error;
  }
};

const runMigration = async () => {
  try {
    const connected = await testConnection();
    if (!connected) {
      process.exit(1);
    }
    
    await createTables();
    console.log('🎉 Banco de dados configurado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Falha na migração:', error);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  runMigration();
}

module.exports = { createTables };
