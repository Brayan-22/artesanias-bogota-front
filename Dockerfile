# Base image con Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y yarn.lock
COPY package.json yarn.lock ./

# Instala las dependencias usando Yarn
RUN yarn install

# Copia todo el código fuente al contenedor
COPY . .

# Expone el puerto 3000 para el entorno de desarrollo
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación en modo desarrollo
ENTRYPOINT ["yarn", "run", "dev"]