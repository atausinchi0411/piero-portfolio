@echo off
rem Publica el portfolio y guarda el cambio en GitHub. Doble clic y listo.
cd /d "%~dp0"

echo.
echo  Publicando el portfolio...
echo.
call npx vercel --prod --yes
if errorlevel 1 (
  echo.
  echo  ERROR: no se ha publicado. La web sigue como estaba.
  echo  Lo mas probable: una comilla o una coma borrada en el ultimo cambio.
  pause
  exit /b 1
)

echo.
echo  Guardando en GitHub...
git add -A
git commit -q -m "Cambios de texto"
git push -q

echo.
echo  Listo: https://piero-portfolio.vercel.app
pause
