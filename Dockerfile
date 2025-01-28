# Base image con Node.js
FROM node:20-alpine

# Crear usuario sin privilegios
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y yarn.lock y ajusta permisos
COPY package.json yarn.lock ./
RUN chmod -R 777 /app

# Cambia al usuario sin privilegios
USER nonroot

# Copia los archivos necesarios
COPY public ./public
COPY src ./src
COPY eslint.config.js ./
COPY index.html ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.tsbuildinfo ./
COPY tsconfig.app.tsbuildinfo ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Instala las dependencias usando Yarn
RUN yarn install

# Expone el puerto 3000 para el entorno de desarrollo
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación en modo desarrollo
ENTRYPOINT ["yarn", "run", "dev"]