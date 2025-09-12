module.exports = {
  // Configurações do Servidor
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Configurações do Banco de Dados
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || 'techperifericos',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  },
  
  // Configurações de Autenticação
  jwt: {
    secret: process.env.JWT_SECRET || 'techperifericos_super_secret_jwt_key_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  // Configurações de Upload
  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxFileSize: process.env.MAX_FILE_SIZE || 5242880 // 5MB
  },
  
  // Configurações de CORS
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : ['http://localhost:3000'],
    credentials: true
  }
};


