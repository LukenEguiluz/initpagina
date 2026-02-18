@echo off
cd /d "%~dp0"
echo Quitando Co-authored-by del ultimo commit...
git commit --amend -m "Solo frontend: INIT para Vercel, equipo, logo, contacto, anti-bot, docs Vercel"
echo.
echo Subiendo a initpagina (force push)...
git push initpagina main --force
echo.
echo Listo. Cursor ya no aparecera como coautor en GitHub.
pause
