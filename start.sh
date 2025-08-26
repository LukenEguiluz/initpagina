#!/bin/bash

echo "🚀 Iniciando proyecto INIT..."

# Función para limpiar procesos al salir
cleanup() {
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Iniciar backend
echo "🔧 Iniciando backend Django..."
cd backend
source venv/bin/activate
python manage.py runserver --noreload &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend se inicie
sleep 3

# Iniciar frontend
echo "⚡ Iniciando frontend Vite..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Servidores iniciados:"
echo "   Backend: http://localhost:8000"
echo "   Frontend: http://localhost:5173"
echo "   Admin: http://localhost:8000/admin"
echo ""
echo "Presiona Ctrl+C para detener los servidores"

# Esperar a que ambos procesos terminen
wait
