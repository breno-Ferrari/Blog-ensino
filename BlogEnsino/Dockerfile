# Use a imagem Node.js oficial como base
FROM node:20-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package.json package-lock.json ./

# Instale TODAS as dependências (incluindo as de desenvolvimento)
RUN npm install --production=false

# Copie o restante dos arquivos da aplicação
COPY . .

# Copie o arquivo Swagger já gerado localmente
COPY swagger_output.json ./swagger_output.json

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que o aplicativo usa
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["node", "dist/server.js"]
