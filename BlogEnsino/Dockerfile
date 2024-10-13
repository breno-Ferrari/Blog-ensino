# Use a imagem Node.js oficial como base
FROM node:20-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g ts-node

COPY . .

# Copie o arquivo Swagger já gerado localmente
COPY swagger_output.json ./swagger_output.json

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que o aplicativo usa
EXPOSE 3001

CMD ["ts-node", "src/server.ts"]