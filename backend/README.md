## Backend - Unicatólica Semana Ingeniería

API REST para inscripciones con SQLite y generación de QR.

### Requisitos
- Node.js 18+

### Variables de entorno
Crear `.env` (puedes basarte en `.env.example`):

```
PORT=4000
DATABASE_PATH=./data/database.sqlite
ALLOWED_ORIGINS=http://localhost:5173
```

### Instalación

```bash
cd backend
npm install
```

Para migrar la BD manualmente (opcional):

```bash
node ./src/db.js --migrate
```

### Ejecutar

```bash
npm run dev
```

### Endpoint

- POST `/inscripciones/registro`
  - Guarda la inscripción y retorna un QR en `qr` (Data URL) y `qrData`.

### Conectar con el frontend

En tu frontend, configura la URL base de la API, por ejemplo:

```
REACT_APP_API_URL=http://localhost:4000
```


