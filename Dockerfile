# Base image con Node.js
FROM node:20-alpine
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot
# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y yarn.lock
COPY package.json yarn.lock ./

# Copia solo los archivos necesarios para la aplicación
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