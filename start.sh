#!/usr/bin/env bash
# Arranca Spring Boot (:8080) y Vite (:5173). Si no existe el JAR, ejecuta mvn package antes.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
mkdir -p logs

JAR="$ROOT/backend/target/ecommerce-api-0.0.1.jar"

if [[ ! -f "$JAR" ]]; then
  echo "No existe el JAR del backend. Compilando..."
  (cd "$ROOT/backend" && mvn -q -DskipTests package)
fi

echo "Iniciando backend (http://localhost:8080)..."
(
  cd "$ROOT/backend"
  java -jar target/ecommerce-api-0.0.1.jar
) >>"$ROOT/logs/backend.log" 2>&1 &
echo $! >"$ROOT/logs/backend.pid"

echo "Iniciando frontend (http://localhost:5173)..."
(
  cd "$ROOT/frontend"
  npm run dev
) >>"$ROOT/logs/frontend.log" 2>&1 &
echo $! >"$ROOT/logs/frontend.pid"

echo ""
echo "Procesos en segundo plano. PIDs: $(cat "$ROOT/logs/backend.pid") (backend), $(cat "$ROOT/logs/frontend.pid") (npm/vite)"
echo "Logs: $ROOT/logs/backend.log y $ROOT/logs/frontend.log"
echo "Para detener: ./stop.sh"
