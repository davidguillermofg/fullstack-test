@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "BACKEND_JAR=%~dp0backend\target\ecommerce-api-0.0.1.jar"

if not exist logs mkdir logs

if not exist "%BACKEND_JAR%" (
  echo No existe el JAR del backend. Compilando...
  pushd backend
  call mvn -q -DskipTests package
  popd
  if not exist "%BACKEND_JAR%" (
    echo ERROR: no se genero ecommerce-api-0.0.1.jar
    exit /b 1
  )
)

echo Iniciando backend (http://localhost:8080^)...
pushd backend
start /b java -jar "target\ecommerce-api-0.0.1.jar" 1>> "%~dp0logs\backend.log" 2>>&1
popd

timeout /t 2 /nobreak >nul

echo Iniciando frontend (http://localhost:5173^)...
pushd frontend
start /b npm run dev 1>> "%~dp0logs\frontend.log" 2>>&1
popd

echo.
echo Backend y frontend en segundo plano.
echo Logs: %~dp0logs\backend.log y %~dp0logs\frontend.log
echo Para detener: stop.bat
endlocal
