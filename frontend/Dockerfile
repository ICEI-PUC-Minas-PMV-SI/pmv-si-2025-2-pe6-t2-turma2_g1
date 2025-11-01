# Estágio 1: Build da aplicação React
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Permite que a URL da API seja passada durante o build
ARG REACT_APP_API_URL

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Builda a aplicação para produção, injetando a variável de ambiente
RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine

# Copia os arquivos de build do estágio anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nossa configuração personalizada do Nginx para produção/k8s
COPY nginx.k8s.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
