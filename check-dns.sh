#!/bin/bash

echo "🌐 Verificando configuración DNS..."
echo "=================================="

# Obtener la IP del droplet
DROPLET_IP=$(curl -s ifconfig.me)
echo "📍 IP del droplet: $DROPLET_IP"
echo ""

# Verificar registros DNS
echo "🔍 Verificando registros DNS..."

# Verificar dominio principal
echo "📋 init.com.mx:"
INIT_IP=$(dig +short init.com.mx)
if [[ "$INIT_IP" == "$DROPLET_IP" ]]; then
    echo "✅ init.com.mx → $INIT_IP (Correcto)"
else
    echo "❌ init.com.mx → $INIT_IP (Debería ser $DROPLET_IP)"
fi

# Verificar www
echo "📋 www.init.com.mx:"
WWW_IP=$(dig +short www.init.com.mx)
if [[ "$WWW_IP" == "$DROPLET_IP" ]]; then
    echo "✅ www.init.com.mx → $WWW_IP (Correcto)"
else
    echo "❌ www.init.com.mx → $WWW_IP (Debería ser $DROPLET_IP)"
fi

# Verificar api
echo "📋 api.init.com.mx:"
API_IP=$(dig +short api.init.com.mx)
if [[ "$API_IP" == "$DROPLET_IP" ]]; then
    echo "✅ api.init.com.mx → $API_IP (Correcto)"
else
    echo "❌ api.init.com.mx → $API_IP (Debería ser $DROPLET_IP)"
fi

echo ""
echo "🎯 Configuración necesaria en DigitalOcean:"
echo "=========================================="
echo "1. Ve a cloud.digitalocean.com"
echo "2. Networking → Domains"
echo "3. Busca init.com.mx"
echo "4. Agrega estos registros:"
echo ""
echo "   Tipo | Nombre | Valor"
echo "   ---- | ------ | -----"
echo "   A    | @      | $DROPLET_IP"
echo "   A    | www    | $DROPLET_IP"
echo "   A    | api    | $DROPLET_IP"
echo ""
echo "⏳ Los cambios DNS pueden tardar hasta 24 horas en propagarse"
echo "💡 Normalmente toma 5-15 minutos"
