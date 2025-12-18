# Guía de Instalación - Sistema de Trazabilidad QR

## 📋 Requisitos del Sistema

### Software Necesario

| Software | Versión Mínima | Versión Recomendada | Descarga |
|----------|---------------|---------------------|----------|
| Node.js | 18.0.0 | 20.x LTS | https://nodejs.org |
| npm | 9.0.0 | 10.x | Incluido con Node.js |
| Git | 2.30+ | Última | https://git-scm.com |

### Hardware Recomendado

- **CPU**: 2 núcleos o más
- **RAM**: 4 GB mínimo, 8 GB recomendado
- **Disco**: 500 MB libres
- **Red**: Conexión a Internet para instalación inicial

---

## 🚀 Instalación Paso a Paso

### Paso 1: Instalar Node.js

#### Windows:
1. Descargar instalador desde https://nodejs.org
2. Ejecutar el instalador (.msi)
3. Seguir el asistente de instalación
4. Verificar instalación:
```cmd
node --version
npm --version
```

#### Linux (Ubuntu/Debian):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### macOS:
```bash
brew install node@20
```

### Paso 2: Clonar o Descargar el Proyecto

#### Opción A: Con Git
```bash
git clone <url-del-repositorio>
cd cryo-planetary
```

#### Opción B: Sin Git
1. Descargar el archivo ZIP del proyecto
2. Extraer en una carpeta
3. Abrir terminal en esa carpeta

### Paso 3: Instalar Dependencias

```bash
npm install
```

**Tiempo estimado**: 2-5 minutos dependiendo de la conexión

### Paso 4: Ejecutar en Desarrollo

```bash
npm run dev
```

Abrir navegador en: `http://localhost:5173`

---

## 🌐 Despliegue en Servidor

### Opción 1: Servidor con Node.js

1. **Compilar el proyecto**:
```bash
npm run build
```

2. **Instalar servidor HTTP simple**:
```bash
npm install -g serve
```

3. **Ejecutar**:
```bash
serve -s dist -p 80
```

### Opción 2: Servidor Web (Nginx/Apache)

1. **Compilar**:
```bash
npm run build
```

2. **Copiar archivos**:
```bash
# Copiar contenido de dist/ a tu servidor web
cp -r dist/* /var/www/html/
```

3. **Configurar Nginx** (usar archivo `nginx.conf` incluido)

### Opción 3: Docker (Más Fácil)

1. **Construir imagen**:
```bash
docker build -t hospital-qr .
```

2. **Ejecutar contenedor**:
```bash
docker run -d -p 80:80 hospital-qr
```

O usar Docker Compose:
```bash
docker-compose up -d
```

---

## 🔧 Configuración

### Variables de Entorno (Opcional)

Crear archivo `.env` en la raíz:

```env
VITE_APP_TITLE=Sistema de Trazabilidad QR
VITE_API_URL=http://tu-servidor.com/api
```

### Personalización

- **Logo**: Reemplazar `public/hospital-essalud.png`
- **Colores**: Editar `src/index.css` (variables CSS)
- **Título**: Editar `index.html`

---

## ✅ Verificación de Instalación

### Checklist Post-Instalación

- [ ] Node.js instalado correctamente
- [ ] Dependencias instaladas sin errores
- [ ] Aplicación ejecutándose en localhost
- [ ] Login funcional con credenciales de prueba
- [ ] Navegación entre páginas funciona
- [ ] No hay errores en consola del navegador

### Credenciales de Prueba

```
Email: admin@essalud.gob.pe
Contraseña: admin123
```

---

## 🐛 Solución de Problemas Comunes

### Error: "npm: command not found"
**Solución**: Node.js no está instalado o no está en el PATH
```bash
# Reinstalar Node.js desde nodejs.org
```

### Error: "EACCES: permission denied"
**Solución**: Problemas de permisos
```bash
# Linux/Mac
sudo npm install -g npm
# O usar nvm (Node Version Manager)
```

### Error: "Port 5173 already in use"
**Solución**: Puerto ocupado
```bash
# Cambiar puerto en vite.config.ts
# O matar proceso en puerto 5173
```

### Error al compilar: "Out of memory"
**Solución**: Aumentar memoria de Node.js
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Página en blanco después del build
**Solución**: Configurar base path
```javascript
// vite.config.ts
export default defineConfig({
  base: './'
})
```

---

## 📞 Soporte Técnico

### Antes de Contactar Soporte

1. Verificar versiones de Node.js y npm
2. Revisar consola del navegador (F12)
3. Revisar logs del servidor
4. Intentar en modo incógnito

### Información a Proporcionar

- Sistema operativo y versión
- Versión de Node.js (`node --version`)
- Mensaje de error completo
- Pasos para reproducir el problema

---

## 📚 Recursos Adicionales

- **Documentación Node.js**: https://nodejs.org/docs
- **Documentación React**: https://react.dev
- **Documentación Vite**: https://vitejs.dev
- **Documentación Tailwind**: https://tailwindcss.com

---

## 🔄 Actualización del Sistema

```bash
# 1. Hacer backup de datos (si aplica)
# 2. Obtener última versión
git pull origin main

# 3. Actualizar dependencias
npm install

# 4. Recompilar
npm run build

# 5. Reiniciar servidor
```

---

**Última actualización**: Diciembre 2024  
**Versión del documento**: 1.0
