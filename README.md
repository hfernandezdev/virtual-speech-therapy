# 🎯 Mini Virtual Speech Therapy Platform

Una plataforma completa de terapia de lenguaje virtual que conecta terapeutas con niños mediante video llamadas, juegos interactivos y seguimiento de progreso.

## 🌐 Demo en vivo:
**🔗 URL:** [https://virtual-speech-therapy.vercel.app/](https://virtual-speech-therapy.vercel.app/)

## 🚀 Características Principales

### ✅ Implementadas
- **Video Call Integration** - Comunicación en tiempo real usando Daily.co
- **Juegos Interactivos** - Juegos Phaser para terapia de lenguaje con sincronización WebSocket
- **Sistema de Sesiones** - Registro de progreso con métricas y notas
- **Dashboard Terapeuta** - Vista completa de casos y progreso de estudiantes
- **Sincronización en Tiempo Real** - WebSockets para juego colaborativo

### 🔮 Planeadas (Scaffold)
- **Resúmenes con IA** - Generación automática de resúmenes de sesiones
- **Análisis Avanzado** - Insights sobre progreso del estudiante

## 🛠 Stack Tecnológico

### Frontend
- **React 18** + TypeScript
- **TailwindCSS** - Styling
- **Phaser 3** - Motor de juegos
- **Socket.io Client** - Comunicación en tiempo real
- **Axios** - Cliente HTTP

### Backend
- **Node.js** + Express + TypeScript
- **MongoDB** + Mongoose - Base de datos
- **Socket.io** - WebSockets
- **JWT** - Autenticación

### Deployment
- **Railway** - Hosting (Frontend + Backend)
- **MongoDB Atlas** - Base de datos en cloud

## 🏗 Arquitectura del Proyecto
    ```
    speech-therapy-platform/
    ├── frontend/ # React Application
    │ ├── src/
    │ │ ├── components/ # Componentes reutilizables
    │ │ ├── pages/ # Vistas principales
    │ │ ├── services/ # APIs y servicios
    │ │ ├── contexts/ # Contexts de React
    │ │ └── types/ # Definiciones TypeScript
    │ └── public/ # Assets estáticos
    │
    └── backend/ # Node.js API
    ├── src/
    │ ├── controllers/ # Lógica de endpoints
    │ ├── models/ # Modelos de base de datos
    │ ├── routes/ # Definición de rutas
    │ ├── middleware/ # Middlewares personalizados
    │ └── websocket/ # Handlers de WebSocket
    └── scripts/ # Scripts de utilidad


## 🎮 Juego de Terapia - "Match the Word"

### Características del Juego
- **Temática educativa** - Enfocado en desarrollo de lenguaje
- **Turnos alternados** - Terapeuta y estudiante juegan en colaboración
- **Sincronización real-time** - Estado del juego compartido via WebSocket
- **Métricas automáticas** - Tracking de respuestas correctas/incorrectas

### Mecánica
1. **Palabra objetivo** mostrada al centro
2. **4 opciones de emojis** para seleccionar
3. **Turnos alternados** entre participantes
4. **Puntuación en tiempo real**
5. **Transición automática** entre rondas

## 📊 Sistema de Sesiones

### Flujo de Trabajo
1. **Iniciar Video Call** - Conexión inicial terapeuta-estudiante
2. **Juego Interactivo** - Sesión de terapia mediante juego
3. **Registro de Datos** - Captura automática de métricas
4. **Notas y Observaciones** - Comentarios cualitativos del terapeuta
5. **Resumen de Progreso** - Visualización de avances

### Métricas Capturadas
- ✅ Respuestas correctas/incorrectas
- 📊 Porcentaje de éxito por sesión
- 📈 Progreso histórico del estudiante
- 📝 Notas comportamentales y observaciones

## 🔌 APIs y WebSockets

### Endpoints Principales
- `GET /api/students` - Lista de estudiantes
- `GET /api/students/:id/progress` - Progreso del estudiante
- `POST /api/sessions` - Crear nueva sesión
- `GET /api/sessions/student/:id` - Sesiones del estudiante

### Eventos WebSocket
- `join-game-room` - Unirse a sala de juego
- `game-update` - Actualización de estado del juego
- `game-action` - Acciones del juego entre jugadores

## 🚀 Deployment

### Requisitos
- Node.js 18+
- MongoDB Atlas
- Cuenta Railway
- Cuenta Vercel

### Variables de Entorno
#### Backend (.env)
    ```env
    MONGODB_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    NODE_ENV=production

#### Frontend (.env)
    ```env
    VITE_API_URL=https://your-backend.railway.app/api
    VITE_WS_URL=wss://your-backend.railway.app

### Pasos de Deployment
1. **Configurar MongoDB Atlas**
2. **Deploy Backend en Railway**
3. **Deploy Frontend en Railway**
4. **Configurar variables de entorno**
5. **Verificar conectividad**

## 🎯 Decisiones Técnicas y Trade-offs
### ✅ Decisiones Adoptadas

1. **MongoDB sobre PostgreSQL** - Flexibilidad para datos de sesiones
2. **Daily.co sobre WebRTC nativo** - Desarrollo más rápido
3. **Phaser para juegos** - Motor maduro con buena documentación
4. **TailwindCSS** - Desarrollo rápido de UI

## ⚠️ Trade-offs Aceptados

1. **Autenticación simplificada** - Para MVP, sin sistema completo de auth
2. **Juego básico** - Un solo tipo de juego para demostrar concepto
3. **UI minimalista** - Funcionalidad sobre diseño pulido
4. **Mock data** - Para desarrollo rápido, reemplazable en producción

## 📞 Soporte
### Para issues y preguntas:

1. Revisar documentación técnica
2. Verificar logs en Railway
3. Revisar status de servicios
4. Crear issue en GitHub

### Desarrollado con ❤️ para el challenge técnico de Empat Speech
