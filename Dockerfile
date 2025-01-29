FROM node:lts-alpine AS builder

WORKDIR /app

RUN apk update
RUN apk upgrade

COPY package.json .

RUN yarn install

COPY . .

# Asigna permisos correctos para todos los archivos
RUN chmod -R 755 /app

RUN yarn run build

FROM nginx:stable-alpine-slim AS deploy

COPY --from=builder /app/dist/ /usr/share/nginx/html/
