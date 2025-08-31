#!/bin/bash

# Dokku Memory Optimization Script for 1GB RAM Servers
# Run this script on your Dokku server after installation

echo "🔧 Optimizing Dokku for 1GB RAM server..."

# 1. Configure Docker daemon for low memory usage
echo "📦 Configuring Docker daemon..."
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-ulimits": {
    "nofile": {
      "Hard": 64000,
      "Name": "nofile",
      "Soft": 64000
    }
  }
}
EOF

# 2. Configure system limits
echo "⚙️ Configuring system limits..."
sudo tee -a /etc/security/limits.conf > /dev/null <<EOF
# Dokku memory optimization
dokku soft nofile 65536
dokku hard nofile 65536
dokku soft nproc 32768
dokku hard nproc 32768
EOF

# 3. Configure Dokku global settings
echo "🚀 Configuring Dokku global settings..."
dokku config:set --global DOKKU_DISABLE_ANALYTICS=1
dokku config:set --global DOKKU_SKIP_CLEANUP=1

# 4. Set memory limits for apps
echo "💾 Setting memory limits for apps..."
# Backend app (Django)
dokku resource:limit api memory=512m
dokku resource:limit api cpu=0.5

# Frontend app (Nginx)
dokku resource:limit web memory=256m
dokku resource:limit web cpu=0.3

# 5. Configure PostgreSQL (if using)
if dokku plugin:installed postgres; then
    echo "🐘 Configuring PostgreSQL for low memory..."
    dokku postgres:create init-db
    dokku postgres:link init-db api
    
    # Set PostgreSQL memory limits
    dokku resource:limit init-db memory=256m
    dokku resource:limit init-db cpu=0.3
fi

# 6. Configure Nginx for low memory
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/conf.d/dokku-memory.conf > /dev/null <<EOF
# Memory optimization for Dokku
worker_processes 1;
worker_connections 512;
worker_rlimit_nofile 1024;

events {
    worker_connections 512;
    use epoll;
    multi_accept on;
}

http {
    # Basic settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Buffer sizes
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    
    # Timeouts
    client_body_timeout 12;
    client_header_timeout 12;
    send_timeout 10;
}
EOF

# 7. Restart services
echo "🔄 Restarting services..."
sudo systemctl restart docker
sudo systemctl restart nginx

echo "✅ Dokku optimization complete!"
echo ""
echo "📊 Memory allocation summary:"
echo "   - Backend (Django): 512MB"
echo "   - Frontend (Nginx): 256MB"
echo "   - Database (PostgreSQL): 256MB"
echo "   - System overhead: ~256MB"
echo ""
echo "🔍 To monitor memory usage:"
echo "   - dokku resource:report"
echo "   - docker stats"
echo "   - free -h"
