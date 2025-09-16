# Imagem base com Node
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

ENV API_KEY="AIzaSyDudRcWxm4P517DjhudmTi4KhmMRL0uem0"

# Copia package.json e lock file
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta do Vite Preview (4173)
EXPOSE 4173

# Comando para rodar em produção
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
