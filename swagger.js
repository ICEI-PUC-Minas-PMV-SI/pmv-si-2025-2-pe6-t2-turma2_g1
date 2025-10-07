const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API E-commerce - Pedidos',
      version: '1.0.0',
      description: 'Documentação da API de pedidos do e-commerce',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routers/*.js'], // Caminho para as rotas
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger disponível em: http://localhost:3000/api-docs');
}

module.exports = swaggerDocs;
