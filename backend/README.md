# TechPeriféricos B2B - Backend API

Backend da plataforma de e-commerce B2B para periféricos eletrônicos, desenvolvido em Node.js com Express e MySQL.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados
- **helmet** - Segurança
- **cors** - Cross-Origin Resource Sharing

## 📋 Pré-requisitos

- Node.js 16+ 
- MySQL 8.0+
- npm ou yarn

## ⚙️ Instalação

1. **Clone o repositório e navegue para o backend:**
```bash
cd backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Servidor
PORT=5000
NODE_ENV=development

# Banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=techperifericos
DB_USER=root
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=7d
```

4. **Configure o banco de dados:**
```bash
# Criar banco de dados
mysql -u root -p -e "CREATE DATABASE techperifericos;"

# Executar migrações
npm run migrate

# Inserir dados de exemplo
npm run seed
```

## 🏃‍♂️ Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`

## 📚 Documentação da API

### Autenticação
Todas as rotas protegidas requerem o header:
```
Authorization: Bearer <token>
```

### Endpoints Principais

#### 🔐 Autenticação (`/api/auth`)
- `POST /register` - Cadastrar usuário
- `POST /login` - Login
- `GET /me` - Dados do usuário logado
- `POST /refresh` - Renovar token
- `POST /change-password` - Alterar senha

#### 👥 Usuários (`/api/users`)
- `GET /profile` - Perfil do usuário
- `PUT /profile` - Atualizar perfil
- `GET /` - Listar usuários (admin)
- `PUT /:id/status` - Ativar/desativar usuário (admin)

#### 📦 Produtos (`/api/products`)
- `GET /` - Listar produtos com filtros
- `GET /:id` - Detalhes do produto
- `GET /category/:slug` - Produtos por categoria
- `GET /featured/list` - Produtos em destaque
- `GET /search/suggestions` - Sugestões de busca

#### 🛒 Carrinho (`/api/cart`)
- `GET /` - Itens do carrinho
- `POST /` - Adicionar item
- `PUT /:id` - Atualizar quantidade
- `DELETE /:id` - Remover item
- `DELETE /` - Limpar carrinho
- `POST /validate` - Validar carrinho

#### 📋 Pedidos (`/api/orders`)
- `GET /` - Listar pedidos
- `GET /:id` - Detalhes do pedido
- `POST /` - Criar pedido
- `PUT /:id/cancel` - Cancelar pedido
- `GET /stats/summary` - Estatísticas

#### 🏷️ Categorias (`/api/categories`)
- `GET /` - Listar categorias
- `GET /:slug` - Categoria por slug
- `GET /:slug/products` - Produtos da categoria

### Exemplos de Uso

#### Cadastro de Usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@empresa.com",
    "password": "senha123",
    "company": "TechCorp Ltda",
    "cnpj": "12.345.678/0001-90",
    "phone": "(11) 99999-9999",
    "role": "Gerente de Compras"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@empresa.com",
    "password": "senha123"
  }'
```

#### Buscar Produtos
```bash
curl "http://localhost:5000/api/products?search=mouse&page=1&limit=10"
```

#### Adicionar ao Carrinho
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

## 🗄️ Estrutura do Banco

### Tabelas Principais
- `users` - Usuários corporativos
- `categories` - Categorias de produtos
- `products` - Catálogo de produtos
- `cart_items` - Itens do carrinho
- `orders` - Pedidos
- `order_items` - Itens dos pedidos

## 🔒 Segurança

- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Helmet** para headers de segurança
- **Rate limiting** para prevenir abuso
- **Validação** de dados de entrada
- **CORS** configurado

## 🧪 Testes

```bash
npm test
```

## 📊 Monitoramento

- Health check: `GET /health`
- Logs estruturados com Morgan
- Tratamento de erros centralizado

## 🚀 Deploy

### Docker (Recomendado)
```bash
docker build -t techperifericos-backend .
docker run -p 5000:5000 techperifericos-backend
```

### PM2
```bash
npm install -g pm2
pm2 start server.js --name "techperifericos-api"
```

## 📝 Scripts Disponíveis

- `npm start` - Iniciar em produção
- `npm run dev` - Iniciar em desenvolvimento
- `npm run migrate` - Executar migrações
- `npm run seed` - Inserir dados de exemplo
- `npm test` - Executar testes

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para suporte, entre em contato:
- Email: suporte@techperifericos.com
- Documentação: [Link para docs]


