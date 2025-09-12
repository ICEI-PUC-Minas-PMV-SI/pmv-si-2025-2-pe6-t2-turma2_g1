# Use Node.js LTS
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Criar diretório para uploads
RUN mkdir -p uploads

# Expor porta
EXPOSE 5000

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Mudar propriedade dos arquivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Comando para iniciar
CMD ["npm", "start"]


