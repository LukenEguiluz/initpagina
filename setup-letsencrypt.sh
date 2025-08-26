#!/bin/bash

echo "🔒 Configurando Let's Encrypt para SSL automático..."
echo "=================================================="

# Verificar si estamos en el droplet
if [[ ! -f "docker-compose.prod.yml" ]]; then
    echo "❌ No se encontró docker-compose.prod.yml"
    echo "💡 Ejecuta este script en tu droplet de DigitalOcean"
    exit 1
fi

# Verificar que certbot esté instalado
if ! command -v certbot &> /dev/null; then
    echo "📦 Instalando certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Verificar que los dominios estén configurados
echo "🌐 Verificando configuración DNS..."
DROPLET_IP=$(curl -s ifconfig.me)

echo "📍 IP del droplet: $DROPLET_IP"
echo ""

# Verificar registros DNS
INIT_IP=$(dig +short init.com.mx)
API_IP=$(dig +short api.init.com.mx)

if [[ "$INIT_IP" == "$DROPLET_IP" ]]; then
    echo "✅ init.com.mx apunta correctamente"
else
    echo "❌ init.com.mx NO apunta a $DROPLET_IP (apunta a $INIT_IP)"
fi

if [[ "$API_IP" == "$DROPLET_IP" ]]; then
    echo "✅ api.init.com.mx apunta correctamente"
else
    echo "❌ api.init.com.mx NO apunta a $DROPLET_IP (apunta a $API_IP)"
fi

echo ""
echo "🎯 Configurando Let's Encrypt..."

# Parar contenedores temporalmente
echo "⏹️  Parando contenedores..."
docker compose -f docker-compose.prod.yml down

# Crear configuración temporal de Nginx para Let's Encrypt
echo "📝 Creando configuración temporal de Nginx..."
sudo tee /etc/nginx/sites-available/init-temp << 'EOF'
server {
    listen 80;
    server_name init.com.mx www.init.com.mx api.init.com.mx;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 200 "Configurando SSL...";
        add_header Content-Type text/plain;
    }
}
EOF

# Habilitar sitio temporal
sudo ln -sf /etc/nginx/sites-available/init-temp /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Crear directorio para desafíos ACME
sudo mkdir -p /var/www/html/.well-known/acme-challenge

# Reiniciar Nginx
sudo systemctl restart nginx

# Generar certificados con Let's Encrypt
echo "🔑 Generando certificados SSL con Let's Encrypt..."
sudo certbot certonly --webroot \
    --webroot-path=/var/www/html \
    --email info@init.com.mx \
    --agree-tos \
    --no-eff-email \
    --domains init.com.mx,www.init.com.mx,api.init.com.mx

# Verificar que los certificados se generaron
if [[ -f "/etc/letsencrypt/live/init.com.mx/fullchain.pem" ]]; then
    echo "✅ Certificados SSL generados exitosamente"
    
    # Crear directorio SSL
    sudo mkdir -p ssl
    
    # Copiar certificados
    sudo cp /etc/letsencrypt/live/init.com.mx/fullchain.pem ssl/cert.pem
    sudo cp /etc/letsencrypt/live/init.com.mx/privkey.pem ssl/key.pem
    
    # Ajustar permisos
    sudo chown -R $USER:$USER ssl/
    sudo chmod 600 ssl/key.pem
    sudo chmod 644 ssl/cert.pem
    
    echo "✅ Certificados copiados a ssl/"
else
    echo "❌ Error generando certificados SSL"
    exit 1
fi

# Limpiar configuración temporal
sudo rm -f /etc/nginx/sites-enabled/init-temp
sudo systemctl restart nginx

# Reconstruir y levantar contenedores
echo "🔨 Reconstruyendo contenedores..."
docker compose -f docker-compose.prod.yml build frontend
docker compose -f docker-compose.prod.yml up -d

echo "⏳ Esperando a que los servicios estén listos..."
sleep 15

# Verificar que funciona
echo "🔍 Verificando certificados SSL..."
echo ""

echo "📋 Probando api.init.com.mx:"
if curl -s -I https://api.init.com.mx/health | grep -q "200"; then
    echo "✅ api.init.com.mx funciona correctamente"
else
    echo "❌ api.init.com.mx no responde correctamente"
fi

echo ""
echo "📋 Probando init.com.mx:"
if curl -s -I https://init.com.mx | grep -q "200"; then
    echo "✅ init.com.mx funciona correctamente"
else
    echo "❌ init.com.mx no responde correctamente"
fi

# Configurar renovación automática
echo ""
echo "🔄 Configurando renovación automática..."

# Crear script de renovación
sudo tee /usr/local/bin/renew-ssl.sh << 'EOF'
#!/bin/bash
cd /home/kaki/Init
certbot renew --quiet
if [ $? -eq 0 ]; then
    cp /etc/letsencrypt/live/init.com.mx/fullchain.pem ssl/cert.pem
    cp /etc/letsencrypt/live/init.com.mx/privkey.pem ssl/key.pem
    chown -R kaki:kaki ssl/
    docker compose -f docker-compose.prod.yml restart frontend
    echo "$(date): SSL certificates renewed successfully" >> /var/log/ssl-renewal.log
fi
EOF

sudo chmod +x /usr/local/bin/renew-ssl.sh

# Agregar al crontab para renovación automática
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/local/bin/renew-ssl.sh") | crontab -

echo "✅ Renovación automática configurada (diaria a las 12:00 PM)"

echo ""
echo "🎉 Let's Encrypt configurado exitosamente!"
echo "💡 Los certificados se renovarán automáticamente cada día"
echo "📅 Próxima renovación: mañana a las 12:00 PM"
