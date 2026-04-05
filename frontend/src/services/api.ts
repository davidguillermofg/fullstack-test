import axios from 'axios';

/**
 * Resuelve la raíz del API REST (`/api/v1`).
 * - Con `VITE_API_URL` en .env: debe ser la URL completa hasta `/api/v1` (p. ej. `http://localhost:8080/api/v1`).
 *   Si termina en `/api` sin `v1`, se añade `/v1` automáticamente.
 * - Sin variable en desarrollo: se usa `/api/v1` relativo + proxy de Vite → `http://localhost:8080`.
 */
function resolveApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL?.trim();
  if (raw) {
    let u = raw.replace(/\/$/, '');
    if (u.endsWith('/api')) {
      u = `${u}/v1`;
    }
    return u;
  }
  if (import.meta.env.DEV) {
    return '/api/v1';
  }
  return 'http://localhost:8080/api/v1';
}

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
});

export default api;
