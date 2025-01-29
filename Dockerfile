FROM node:20-alpine AS builder
WORKDIR /app
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
RUN apk update
RUN apk upgrade
USER nonroot
# Establece el directorio de trabajo en el contenedor
WORKDIR /app

COPY package.json yarn.lock ./

# Cambia al usuario sin privilegios
USER nonroot

# Copia solo los archivos necesarios para la aplicación
COPY public ./public
COPY src ./src
COPY eslint.config.js ./
COPY tsconfig.node.tsbuildinfo ./
COPY tsconfig.app.tsbuildinfo ./
COPY tsconfig.json ./
COPY vite.config.ts ./
RUN yarn install

# Asigna permisos correctos para todos los archivos
RUN chmod -R 755 /app

RUN yarn run build

FROM nginx:stable-alpine-slim AS deploy

# Crear un usuario no root para el contenedor de nginx
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Cambiar a un usuario no root
USER nonroot

# Copia los archivos generados por el builder
COPY --from=builder /app/dist/ /usr/share/nginx/html/