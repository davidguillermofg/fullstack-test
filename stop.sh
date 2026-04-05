#!/usr/bin/env bash
# Libera los puertos 8080 (backend) y 5173 (Vite). Usa lsof (macOS/Linux) o fuser (Linux).
set -euo pipefail

stop_port() {
  local port=$1
  if command -v lsof >/dev/null 2>&1; then
    local pids
    pids="$(lsof -ti:"$port" 2>/dev/null || true)"
    if [[ -n "${pids}" ]]; then
      # shellcheck disable=SC2086
      kill ${pids} 2>/dev/null || true
    fi
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "${port}/tcp" 2>/dev/null || true
  else
    echo "No se encontró lsof ni fuser. Instala lsof o usa ./stop.bat en Windows." >&2
    exit 1
  fi
}

echo "Deteniendo procesos en puertos 8080 y 5173..."
for port in 8080 5173; do
  stop_port "$port"
done
echo "Listo."
