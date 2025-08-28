# frontend/Dockerfile
FROM node:20-bullseye AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html/
# Opcional: tu nginx.conf si necesitas history API fallback
EXPOSE 80