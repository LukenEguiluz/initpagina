#!/bin/bash
# Ejecutar en el Droplet como root, con el dominio init.com.mx ya apuntando a la IP.
# Da permisos: chmod +x setup-https.sh && ./setup-https.sh

set -e
echo "=== Instalando nginx y certbot ==="
apt update && apt install -y nginx certbot python3-certbot-nginx

echo "=== Creando directorio para desafíos ACME ==="
mkdir -p /var/www/certbot

echo "=== Configuración inicial nginx (bootstrap) ==="
# Suponiendo que este script está en /opt/init/deploy/
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cp "$DIR/nginx-bootstrap.conf" /etc/nginx/sites-available/init.com.mx
ln -sf /etc/nginx/sites-available/init.com.mx /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "=== Obteniendo certificado Let's Encrypt (init.com.mx + www) ==="
# Sustituir admin@init.com.mx por tu email real
certbot certonly --webroot -w /var/www/certbot -d init.com.mx -d www.init.com.mx --non-interactive --agree-tos --email admin@init.com.mx --no-eff-email

echo "=== Configuración nginx con HTTPS ==="
cp "$DIR/nginx-ssl.conf" /etc/nginx/sites-available/init.com.mx
nginx -t && systemctl reload nginx

echo "=== Activando renovación automática (certbot timer) ==="
systemctl enable certbot.timer
systemctl start certbot.timer
systemctl status certbot.timer --no-pager

echo "=== Listo. HTTPS activo; certificado se renueva solo (2x al día). ==="
echo "Prueba: https://init.com.mx"
