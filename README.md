# Sistema de Trazabilidad QR - Hospital III de Emergencias Grau

Sistema web de gestión y trazabilidad de equipos médicos mediante códigos QR para el Hospital III de Emergencias Grau - EsSalud.

![Hospital EsSalud](public/hospital-essalud.png)

## 📋 Características Principales

- ✅ **Gestión de Equipos Médicos** - Registro completo con códigos QR
- ✅ **Trazabilidad en Tiempo Real** - Seguimiento de ubicación y movimientos
- ✅ **Mantenimientos** - Registro preventivo y correctivo con evidencias
- ✅ **Certificaciones** - Control de calibraciones y certificados
- ✅ **Movimientos** - Transferencias, salidas temporales y retornos
- ✅ **Gestión de Áreas y Ubicaciones** - Organización hospitalaria
- ✅ **Usuarios y Roles** - Control de acceso por perfiles
- ✅ **Auditoría** - Registro completo de actividades
- ✅ **Escaneo QR** - Lectura rápida desde dispositivos móviles

## 🚀 Tecnologías Utilizadas

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **State Management**: React Context API

## 📦 Requisitos Previos

Antes de instalar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 (Recomendado: 20.x LTS)
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git** (para clonar el repositorio)

### Verificar versiones instaladas:

```bash
node --version
npm --version
```

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd cryo-planetary
```

### 2. Instalar dependencias

```bash
npm install
```

O si usas yarn:

```bash
yarn install
```

### 3. Configurar variables de entorno (opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_APP_TITLE=Sistema de Trazabilidad QR
VITE_API_URL=http://localhost:3000/api
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 🏗️ Compilar para Producción

### 1. Generar build de producción

```bash
npm run build
```

Esto creará una carpeta `dist/` con los archivos optimizados.

### 2. Vista previa del build

```bash
npm run preview
```

## 🌐 Despliegue en Servidor

### Opción 1: Servidor Web Estático (Nginx, Apache)

1. Compilar el proyecto:
```bash
npm run build
```

2. Copiar el contenido de `dist/` al directorio del servidor web:
```bash
# Ejemplo para Nginx
sudo cp -r dist/* /var/www/html/
```

3. Configurar Nginx para SPA (Single Page Application):

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Opción 2: Vercel (Recomendado para pruebas)

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Desplegar:
```bash
vercel
```

### Opción 3: Netlify

1. Instalar Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Desplegar:
```bash
netlify deploy --prod
```

### Opción 4: Docker

Crear un `Dockerfile`:

```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Construir y ejecutar:
```bash
docker build -t hospital-qr-system .
docker run -p 80:80 hospital-qr-system
```

## 👥 Credenciales de Acceso (Demo)

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@essalud.gob.pe | admin123 | Administrador |
| tecnico@essalud.gob.pe | tecnico123 | Técnico Biomédico |
| supervisor@essalud.gob.pe | supervisor123 | Supervisor |
| asistencial@essalud.gob.pe | asistencial123 | Personal Asistencial |
| auditor@essalud.gob.pe | auditor123 | Auditor |

## 📱 Funcionalidades por Rol

### Administrador
- ✅ Acceso completo a todos los módulos
- ✅ Gestión de usuarios
- ✅ Configuración del sistema
- ✅ Reportes y auditoría

### Técnico Biomédico
- ✅ Gestión de equipos
- ✅ Registro de mantenimientos
- ✅ Certificaciones
- ✅ Movimientos de equipos

### Supervisor
- ✅ Visualización de equipos
- ✅ Aprobación de mantenimientos
- ✅ Reportes
- ✅ Auditoría

### Personal Asistencial
- ✅ Consulta de equipos
- ✅ Escaneo QR
- ✅ Registro de movimientos

### Auditor
- ✅ Visualización completa
- ✅ Auditoría detallada
- ✅ Exportación de reportes

## 🗂️ Estructura del Proyecto

```
cryo-planetary/
├── public/                 # Archivos estáticos
│   └── hospital-essalud.png
├── src/
│   ├── components/        # Componentes React
│   │   ├── layout/       # Layouts (Sidebar, TopNavbar)
│   │   ├── shared/       # Componentes compartidos (Modales, Forms)
│   │   └── ui/           # Componentes UI base (shadcn/ui)
│   ├── contexts/         # Context API (Auth)
│   ├── pages/            # Páginas de la aplicación
│   ├── types/            # Definiciones TypeScript
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔐 Seguridad

> **⚠️ IMPORTANTE**: Este proyecto usa datos mock para demostración. Para producción:

1. Implementar autenticación real con JWT o OAuth
2. Conectar con API backend segura
3. Implementar HTTPS
4. Configurar CORS apropiadamente
5. Validar y sanitizar inputs
6. Implementar rate limiting

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 en uso
```bash
# Cambiar puerto en vite.config.ts
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Build falla
```bash
# Limpiar caché
npm run build -- --force
```

## 📞 Soporte

Para reportar problemas o solicitar funcionalidades:
- Email: cvilca.sam@gmail.com
- Teléfono: 937050119


---

**Desarrollado por**: Cristian Samuel Bacilio vilca
**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024
