# frontend/Dockerfile
FROM node:20-alpine AS build

# Set environment variables to reduce memory usage
ENV NPM_CONFIG_CACHE=/tmp/npm-cache

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with memory optimizations
RUN npm ci --no-audit --no-fund --prefer-offline

# Copy source code
COPY . .

# Create basic .env file for build
RUN echo "VITE_API_BASE_URL=https://api.init.com.mx" > .env

# Build with memory optimizations
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf.dokku /etc/nginx/conf.d/default.conf

# Asegura rutas de escritura para nginx (aun si arrancas como root, está bien tenerlo limpio)
RUN set -eux; \
    mkdir -p /var/cache/nginx /var/run /var/log/nginx; \
    chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

# NO pongas USER nginx aquí (deja root para que el entrypoint funcione)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]