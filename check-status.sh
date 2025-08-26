#!/bin/bash

echo "🔍 Verificando estado de la aplicación..."

# Verificar contenedores
echo "📦 Estado de contenedores:"
docker compose -f docker-compose.prod.yml ps

echo
echo "📋 Logs del frontend (últimas 10 líneas):"
docker compose -f docker-compose.prod.yml logs frontend --tail=10

echo
echo "📋 Logs del backend (últimas 10 líneas):"
docker compose -f docker-compose.prod.yml logs backend --tail=10

echo
echo "🌐 Verificando conectividad HTTP..."
if curl -fsS http://localhost >/dev/null 2>&1; then
    echo "✅ Frontend respondiendo en http://localhost"
else
    echo "❌ Frontend no responde en http://localhost"
fi

if curl -fsS http://localhost/api/ >/dev/null 2>&1; then
    echo "✅ API respondiendo en http://localhost/api/"
else
    echo "❌ API no responde en http://localhost/api/"
fi

echo
echo "🔧 Comandos útiles:"
echo "  Ver logs en tiempo real: docker compose -f docker-compose.prod.yml logs -f"
echo "  Reiniciar todo: docker compose -f docker-compose.prod.yml restart"
echo "  Parar todo: docker compose -f docker-compose.prod.yml down"
