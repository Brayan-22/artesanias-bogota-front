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
# Copia los archivos necesarios
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

COPY --from=builder /app/dist/ /usr/share/nginx/html/
