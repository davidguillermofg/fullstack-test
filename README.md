# Gapsi e-Commerce — full stack

**Spring Boot 3** (Java 17) + **H2**, **React 19** (TypeScript) con **Redux Toolkit**, **Axios** y **MUI**. Bienvenida + versión desde API, CRUD de proveedores paginado con tabla virtualizada, manifiesto **PWA**, colección Postman, patrones documentados en backend y logs de peticiones con **SLF4J**.

## Requisitos

- **JDK 17+**
- **Maven 3.8+**
- **Node.js 20+** y npm

## Arranque rápido (raíz)

- **Windows:** `start.bat` / `stop.bat` (backend `:8080`, frontend `:5173`, logs en `logs/`).
- **Linux / macOS / WSL:** `./start.sh` / `./stop.sh` (tras `chmod +x`). `stop.sh` usa `lsof` o `fuser`.

Si no existe `backend/target/ecommerce-api-0.0.1.jar`, los scripts ejecutan antes `mvn -DskipTests package` y arrancan el backend con `java -jar ...`.

## Backend

```bash
cd backend
mvn clean package
mvn spring-boot:run
```

- API: `http://localhost:8080/api/v1`
- Health: `GET http://localhost:8080/actuator/health`
- H2: `http://localhost:8080/h2` — JDBC `jdbc:h2:mem:gapsi`, usuario `sa`, sin contraseña

Si `GET /api/v1/app/info` da 404: revisa health en `:8080`, recompila con `mvn clean package` y evita usar el mismo puerto para el backend y `vite preview` a la vez.

Config: `backend/src/main/resources/application.properties`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173`. En desarrollo, sin `.env`, la base es `/api/v1` con **proxy** a `http://localhost:8080` (`vite.config.ts`). Opcional: copia `frontend/.env.example` a `frontend/.env` y define `VITE_API_URL` (ver `services/api.ts`).

```bash
npm run build
npm run preview
```

## PWA

- `frontend/public/manifest.json` — nombre, icono, `standalone`, colores.
- `frontend/index.html` — enlace al manifiesto y `theme-color`.

Sin service worker (sin caché offline).

## Patrones (backend)

| Patrón | Archivo |
|--------|---------|
| Repository | `SupplierRepository.java` |
| DTO + Factory Method | `SupplierResponse.java` |

## API / Postman

- `postman-collection.json` (raíz)`
- `GET /api/v1/app/info` → `message`, `version`

## Estructura

- `backend/` — API
- `frontend/` — React + Vite + MUI
- Scripts `start.*` / `stop.*` en la raíz

## Notas

- UI: MUI (`theme.ts`, `ThemeProvider` + `CssBaseline` en `main.tsx`).
- REST vía Axios; sin GraphQL.
- Logo: `frontend/public/gapsi.png` (`GAPSI_LOGO_PNG`).
