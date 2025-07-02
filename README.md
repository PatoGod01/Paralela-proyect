# Sistema de Exámenes Paralelos

Un sistema completo de gestión de exámenes con procesamiento paralelo usando MPI, desarrollado con FastAPI (backend) y React + TypeScript (frontend).

## 🚀 Características

- **Procesamiento Paralelo**: Evaluación de exámenes usando MPI para alto rendimiento
- **Dashboard en Tiempo Real**: Monitoreo de métricas del sistema y procesamiento
- **Gestión Completa**: Exámenes, postulantes, sesiones y evaluaciones
- **Interfaz Moderna**: Frontend responsive con React y Tailwind CSS
- **API RESTful**: Backend robusto con FastAPI y SQLAlchemy

## 📋 Requisitos Previos

### Backend
- Python 3.10+
- PostgreSQL
- OpenMPI (para procesamiento paralelo)
- Docker (opcional)

### Frontend
- Node.js 18+
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd parallel-exam-system
```

### 2. Configurar el Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones
```

### 3. Configurar la Base de Datos

```bash
# Crear base de datos PostgreSQL
createdb parallel_exam_db

# Las tablas se crean automáticamente al iniciar la aplicación
```

### 4. Compilar el Procesador MPI (Opcional)

```bash
cd mpi_processor
make
cd ..
```

### 5. Configurar el Frontend

```bash
cd frontend  # o desde la raíz del proyecto

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend
```

## 🚀 Ejecución

### Iniciar el Backend

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

El backend estará disponible en: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Iniciar el Frontend

```bash
# Desde la raíz del proyecto o carpeta frontend
npm run dev
```

El frontend estará disponible en: http://localhost:3000

## 🐳 Ejecución con Docker

```bash
# Construir y ejecutar con docker-compose
docker-compose up --build

# Solo el backend
docker build -f Dockerfile.backend -t parallel-exam-backend .
docker run -p 8000:8000 parallel-exam-backend
```

## 📡 API Endpoints

### Exámenes
- `GET /api/v1/exams` - Listar exámenes
- `POST /api/v1/exams` - Crear examen
- `GET /api/v1/exams/{id}` - Obtener examen
- `PUT /api/v1/exams/{id}/activate` - Activar examen

### Postulantes
- `GET /api/v1/applicants` - Listar postulantes
- `POST /api/v1/applicants` - Registrar postulante
- `GET /api/v1/applicants/{id}` - Obtener postulante

### Inscripciones
- `POST /api/v1/exams/{id}/enrollments` - Inscribir postulantes
- `GET /api/v1/exams/{id}/enrollments` - Listar inscritos

### Sesiones
- `POST /api/v1/exams/{id}/start-all` - Iniciar todas las sesiones
- `POST /api/v1/sessions/{id}/responses` - Enviar respuesta
- `PUT /api/v1/sessions/{id}/end` - Finalizar sesión

### Evaluación
- `POST /api/v1/evaluations/evaluate-exam` - Evaluar examen (MPI)

### Sistema
- `GET /api/v1/system/info` - Información del sistema
- `GET /health` - Estado de salud

## 🎨 Características del Frontend

### Dashboard Principal
- **Estado del Sistema**: Indicador de operatividad y uptime
- **Métricas en Tiempo Real**: Estadísticas de exámenes, postulantes y procesos
- **Estado del Procesamiento Paralelo**: Monitoreo de procesos MPI
- **Actividad Reciente**: Log de eventos del sistema
- **Métricas del Sistema**: CPU, memoria, red y disco

### Gestión de Exámenes
- Crear y configurar exámenes
- Activar exámenes para inscripciones
- Ver estadísticas y resultados

### Gestión de Postulantes
- Registrar postulantes individuales
- Importación masiva (CSV)
- Búsqueda y filtrado

### Monitor de Procesamiento
- Vista detallada de procesos MPI
- Métricas de rendimiento en tiempo real
- Control de procesos (pausar/reanudar)

### Log del Sistema
- Vista de terminal con eventos en tiempo real
- Filtrado por nivel y búsqueda
- Exportación de logs

## 🔧 Configuración Avanzada

### Variables de Entorno

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/parallel_exam_db
SECRET_KEY=your-secret-key-here
DEBUG=true
MPI_PROCESSOR_PATH=/app/mpi_processor/evaluator
SUPABASE_URL=your-supabase-url (opcional)
SUPABASE_KEY=your-supabase-key (opcional)
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Configuración de CORS

El backend está configurado para permitir todas las conexiones en desarrollo. Para producción, actualiza la configuración en `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Especifica dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🧪 Pruebas

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
npm run test
```

## 📦 Construcción para Producción

### Frontend
```bash
npm run build
```

### Backend
```bash
# El backend se ejecuta directamente con uvicorn
# Para producción, considera usar gunicorn:
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🔍 Solución de Problemas

### Error de Conexión a la Base de Datos
- Verifica que PostgreSQL esté ejecutándose
- Confirma las credenciales en DATABASE_URL
- Asegúrate de que la base de datos existe

### Error de CORS
- Verifica que el frontend esté configurado para usar la URL correcta del backend
- Confirma la configuración de CORS en el backend

### Procesamiento MPI No Disponible
- El sistema funciona con simulación si MPI no está disponible
- Para usar MPI real, instala OpenMPI y compila el procesador

### Frontend No Se Conecta al Backend
- Verifica que el backend esté ejecutándose en el puerto correcto
- Confirma la variable VITE_API_URL en el frontend
- Revisa la consola del navegador para errores de red

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte y preguntas:
- Crear un issue en GitHub
- Revisar la documentación de la API en `/docs`
- Verificar los logs del sistema para diagnóstico