const bcrypt = require('bcryptjs');
const { executeQuery, testConnection } = require('../config/database');

const seedData = async () => {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Inserir categorias
    const categories = [
      { name: 'Mouses', slug: 'mouses', description: 'Mouses ópticos e sem fio para ambientes corporativos' },
      { name: 'Teclados', slug: 'teclados', description: 'Teclados mecânicos e membrana para produtividade' },
      { name: 'Headsets', slug: 'headsets', description: 'Headsets profissionais com cancelamento de ruído' },
      { name: 'Adaptadores', slug: 'adaptadores', description: 'Hubs USB-C e adaptadores para conectividade' },
      { name: 'Acessórios', slug: 'acessorios', description: 'Mouse pads, suportes e acessórios diversos' }
    ];

    for (const category of categories) {
      await executeQuery(`
        INSERT IGNORE INTO categories (name, slug, description) 
        VALUES (?, ?, ?)
      `, [category.name, category.slug, category.description]);
    }

    // Inserir usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await executeQuery(`
      INSERT IGNORE INTO users (name, email, password, company, cnpj, phone, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Administrador',
      'admin@techperifericos.com',
      hashedPassword,
      'TechPeriféricos Ltda',
      '12.345.678/0001-90',
      '(11) 99999-9999',
      'Diretor'
    ]);

    // Inserir usuário de teste
    const testPassword = await bcrypt.hash('teste123', 10);
    await executeQuery(`
      INSERT IGNORE INTO users (name, email, password, company, cnpj, phone, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Carlos Silva',
      'carlos@techcorp.com',
      testPassword,
      'TechCorp Ltda',
      '98.765.432/0001-10',
      '(11) 88888-8888',
      'Gerente de Compras'
    ]);

    // Buscar IDs das categorias
    const categoryResults = await executeQuery('SELECT id, name FROM categories');
    const categoryMap = {};
    categoryResults.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    // Inserir produtos
    const products = [
      {
        name: 'Mouse Óptico Profissional MX Master 3',
        description: 'Mouse sem fio com sensor de alta precisão, ideal para ambientes corporativos e trabalho intensivo.',
        price: 299.90,
        original_price: 349.90,
        category: 'Mouses',
        image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
        stock: 25,
        specs: JSON.stringify([
          { label: 'DPI', value: '4000' },
          { label: 'Conexão', value: 'Wireless' },
          { label: 'Bateria', value: '70 dias' },
          { label: 'Peso', value: '141g' }
        ]),
        features: JSON.stringify([
          'Sensor de alta precisão',
          'Design ergonômico',
          'Bateria de longa duração',
          'Compatível com múltiplos dispositivos'
        ])
      },
      {
        name: 'Teclado Mecânico RGB K95 Platinum',
        description: 'Teclado mecânico com switches Cherry MX, iluminação RGB e teclas programáveis.',
        price: 899.90,
        original_price: 1099.90,
        category: 'Teclados',
        image_url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
        stock: 12,
        specs: JSON.stringify([
          { label: 'Switches', value: 'Cherry MX Speed' },
          { label: 'Layout', value: 'Full Size' },
          { label: 'Iluminação', value: 'RGB' },
          { label: 'Conexão', value: 'USB' }
        ]),
        features: JSON.stringify([
          'Switches Cherry MX',
          'Iluminação RGB personalizável',
          'Teclas macro programáveis',
          'Construção em alumínio'
        ])
      },
      {
        name: 'Headset Gamer Pro X2',
        description: 'Headset com cancelamento de ruído ativo, ideal para reuniões e chamadas profissionais.',
        price: 499.90,
        category: 'Headsets',
        image_url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
        stock: 18,
        specs: JSON.stringify([
          { label: 'Driver', value: '50mm' },
          { label: 'Frequência', value: '20Hz-20kHz' },
          { label: 'Microfone', value: 'Cancelamento de ruído' },
          { label: 'Conexão', value: 'USB/Wireless' }
        ]),
        features: JSON.stringify([
          'Cancelamento de ruído ativo',
          'Som surround 7.1',
          'Microfone removível',
          'Bateria de 20 horas'
        ])
      },
      {
        name: 'Mouse Pad Gaming XXL',
        description: 'Mouse pad de alta qualidade com superfície otimizada para precisão e controle.',
        price: 89.90,
        category: 'Acessórios',
        image_url: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=300&fit=crop',
        stock: 35,
        specs: JSON.stringify([
          { label: 'Tamanho', value: '900x400mm' },
          { label: 'Material', value: 'Tecido premium' },
          { label: 'Base', value: 'Antiderrapante' },
          { label: 'Espessura', value: '3mm' }
        ]),
        features: JSON.stringify([
          'Superfície otimizada',
          'Base antiderrapante',
          'Fácil limpeza',
          'Durabilidade superior'
        ])
      },
      {
        name: 'Adaptador USB-C Hub 7 em 1',
        description: 'Hub USB-C com múltiplas portas para conectar diversos dispositivos simultaneamente.',
        price: 199.90,
        category: 'Adaptadores',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        stock: 22,
        specs: JSON.stringify([
          { label: 'Portas USB', value: '3x USB 3.0' },
          { label: 'HDMI', value: '4K@60Hz' },
          { label: 'Ethernet', value: 'Gigabit' },
          { label: 'SD Card', value: 'Sim' }
        ]),
        features: JSON.stringify([
          '7 portas em 1',
          'Suporte 4K',
          'Ethernet Gigabit',
          'Compatível com Mac/PC'
        ])
      }
    ];

    for (const product of products) {
      await executeQuery(`
        INSERT IGNORE INTO products (name, description, price, original_price, category_id, image_url, stock, specs, features) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        product.name,
        product.description,
        product.price,
        product.original_price ?? null,
        categoryMap[product.category],
        product.image_url,
        product.stock,
        product.specs,
        product.features
      ]);
    }

    console.log('✅ Seed concluído com sucesso!');
    console.log('👤 Usuários criados:');
    console.log('   - admin@techperifericos.com (senha: admin123)');
    console.log('   - carlos@techcorp.com (senha: teste123)');
    console.log('📦 Produtos criados: 5 produtos em 5 categorias');
    
  } catch (error) {
    console.error('❌ Erro no seed:', error.message);
    throw error;
  }
};

const runSeed = async () => {
  try {
    const connected = await testConnection();
    if (!connected) {
      process.exit(1);
    }
    
    await seedData();
    console.log('🎉 Dados de exemplo inseridos com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Falha no seed:', error);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  runSeed();
}

module.exports = { seedData };
