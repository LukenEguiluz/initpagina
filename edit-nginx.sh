#!/bin/bash

echo "📝 Editor de configuración de Nginx"
echo "=================================="

# Verificar que el archivo existe
if [[ ! -f "nginx.ssl.conf" ]]; then
    echo "❌ nginx.ssl.conf no encontrado"
    exit 1
fi

# Mostrar opciones
echo "¿Qué editor prefieres usar?"
echo "1) nano (más fácil)"
echo "2) vi/vim (más potente)"
echo "3) cat (solo ver)"
echo "4) Salir"

read -p "Selecciona una opción (1-4): " choice

case $choice in
    1)
        echo "🔧 Abriendo con nano..."
        nano nginx.ssl.conf
        ;;
    2)
        echo "🔧 Abriendo con vi..."
        vi nginx.ssl.conf
        ;;
    3)
        echo "📋 Mostrando configuración actual:"
        cat nginx.ssl.conf
        ;;
    4)
        echo "👋 Saliendo..."
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac

# Preguntar si quiere aplicar cambios
if [[ $choice -eq 1 || $choice -eq 2 ]]; then
    echo ""
    echo "¿Quieres aplicar los cambios? (y/n)"
    read -r apply
    if [[ "$apply" =~ ^[Yy]$ ]]; then
        echo "🔄 Aplicando cambios..."
        
        # Verificar sintaxis
        echo "🔍 Verificando sintaxis..."
        if docker run --rm -v $(pwd)/nginx.ssl.conf:/etc/nginx/nginx.conf nginx:alpine nginx -t; then
            echo "✅ Sintaxis correcta"
            
            # Reconstruir y reiniciar
            echo "🔨 Reconstruyendo Nginx..."
            docker compose -f docker-compose.prod.yml build nginx
            
            echo "🚀 Reiniciando Nginx..."
            docker compose -f docker-compose.prod.yml up nginx -d
            
            echo "✅ Cambios aplicados"
        else
            echo "❌ Error en la sintaxis. Revisa la configuración."
        fi
    else
        echo "❌ Cambios no aplicados"
    fi
fi
