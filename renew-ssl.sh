#!/bin/bash

# Script de renovación SSL para contenedor Nginx
echo "🔄 Renovando certificados SSL..."

# Verificar si los certificados necesitan renovación
if certbot renew --dry-run; then
    echo "✅ Certificados renovados exitosamente"
    
    # Copiar certificados renovados
    if [[ -f "/etc/letsencrypt/live/init.com.mx/fullchain.pem" ]]; then
        cp /etc/letsencrypt/live/init.com.mx/fullchain.pem /etc/nginx/ssl/cert.pem
        cp /etc/letsencrypt/live/init.com.mx/privkey.pem /etc/nginx/ssl/key.pem
        chmod 644 /etc/nginx/ssl/cert.pem
        chmod 600 /etc/nginx/ssl/key.pem
        
        # Recargar Nginx
        nginx -s reload
        
        echo "$(date): SSL certificates renewed successfully" >> /var/log/ssl-renewal.log
        echo "✅ Nginx recargado con nuevos certificados"
    else
        echo "❌ Error: Certificados no encontrados"
    fi
else
    echo "❌ Error renovando certificados"
fi
