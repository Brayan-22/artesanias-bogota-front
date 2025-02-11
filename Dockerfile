FROM node:lts-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Crear usuario sin privilegios
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Como root, copia los archivos y establece permisos
USER root
COPY package.json yarn.lock ./
COPY public ./public
COPY src ./src
COPY eslint.config.js ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Asegurarse de que nginx puede leer la configuración
RUN chown -R nonroot:nonroot /etc/nginx/conf.d
# Establece los permisos correctos
RUN chown -R nonroot:nonroot /app && \
    chmod -R 755 /app

# Cambia al usuario sin privilegios
USER nonroot

# Instala dependencias y construye
RUN yarn install
RUN yarn run build

# Segunda etapa
FROM nginx:stable-alpine-slim AS deploy

# Crear usuario no root para nginx
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Copiar archivos y establecer permisos
COPY --from=builder /app/dist/ /usr/share/nginx/html/
RUN chown -R nonroot:nonroot /usr/share/nginx/html

# Cambiar a usuario no root
USER nonroot