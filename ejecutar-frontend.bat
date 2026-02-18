@echo off
cd /d "%~dp0"

echo Instalando dependencias...
call npm.cmd install
if errorlevel 1 (
    echo Error al instalar. Si usas PowerShell, abre CMD o ejecuta: Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
    pause
    exit /b 1
)

echo.
echo Iniciando frontend INIT...
if exist "node_modules\.bin\vite.cmd" (
    call node_modules\.bin\vite.cmd
) else (
    call npx.cmd vite
)
pause
