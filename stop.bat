@echo off
setlocal EnableExtensions
echo Deteniendo procesos en puertos 8080 y 5173...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ports = 8080, 5173; foreach ($p in $ports) { Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }"
echo Listo.
endlocal
