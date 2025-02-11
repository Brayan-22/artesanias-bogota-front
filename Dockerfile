# Etapa 1: Construcción
FROM node:lts-alpine AS builder

# Establecer directorio de trabajo
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

# Establece permisos correctos
RUN chown -R nonroot:nonroot /app && chmod -R 755 /app

# Cambia al usuario sin privilegios
USER nonroot

# Instala dependencias sin optimizar para producción
RUN yarn install

# Etapa 2: Ejecución en modo desarrollo
FROM node:lts-alpine AS dev

WORKDIR /app

# Copiar código fuente desde la etapa anterior
COPY --from=builder /app /app

# Exponer el puerto de Vite (React) para desarrollo
EXPOSE 5173

# Configuración para Traefik
LABEL "traefik.enable"="true"
LABEL "traefik.docker.network"="reverse-proxy"
LABEL "traefik.http.routers.react.rule"="Host(`react.localhost`)"
LABEL "traefik.http.services.react.loadbalancer.server.port"="5173"
LABEL "treafik.http.routes.react.entrypoints"="web"
LABEL "traefik.http.routers.react.service"="react"
# Iniciar la aplicación en modo desarrollo
CMD ["yarn", "dev", "--host"]