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

# Asegura permisos sobre rutas que Nginx usa para escribir
RUN set -eux; \
    mkdir -p /var/cache/nginx /var/run /var/log/nginx; \
    chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

# Switch to non-root user
USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]