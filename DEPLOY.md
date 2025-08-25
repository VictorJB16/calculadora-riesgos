# 🚀 Guía de Despliegue en Vercel

## Paso 1: Preparación del Proyecto

Asegúrate de que el proyecto esté listo:

```bash
# Verificar que la aplicación funcione localmente
npm run dev

# Construir para producción
npm run build

# Probar el build
npm run preview
```

## Paso 2: Subir a GitHub

```bash
# Si no tienes repositorio remoto, crear uno en GitHub
# Luego conectarlo:

git remote add origin https://github.com/TU_USUARIO/calculadora-riesgo.git
git branch -M main
git push -u origin main
```

## Paso 3: Despliegue en Vercel

### Opción A: Desde la Web (Recomendado)

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona tu repositorio `calculadora-riesgo`
5. Configura las variables de entorno (ver abajo)
6. Click "Deploy"

### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

## Paso 4: Variables de Entorno en Vercel

En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:

```
VITE_FIREBASE_API_KEY=AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM
VITE_FIREBASE_AUTH_DOMAIN=risk-calculator-9251e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=risk-calculator-9251e
VITE_FIREBASE_STORAGE_BUCKET=risk-calculator-9251e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=657154942565
VITE_FIREBASE_APP_ID=1:657154942565:web:85b75fe6769db548a0c88c
```

## Paso 5: Configuración Adicional

El archivo `vercel.json` ya está configurado para:
- ✅ Reescritura de rutas (SPA)
- ✅ Comando de build
- ✅ Comando de desarrollo

## Paso 6: Verificación Post-Despliegue

1. ✅ Verificar que la aplicación carga
2. ✅ Probar navegación entre páginas
3. ✅ Crear una evaluación de riesgo
4. ✅ Verificar que los datos se guardan en Firebase
5. ✅ Probar exportación CSV
6. ✅ Verificar matriz de riesgo

## Dominios Personalizados (Opcional)

En Vercel Dashboard > Settings > Domains:
- Agregar `calculadora-riesgo.tu-dominio.com`
- Configurar DNS según las instrucciones

## Monitoreo y Analytics

Vercel incluye automáticamente:
- 📊 Analytics de performance
- 🔍 Logs de errores
- 📈 Métricas de uso

## Actualizaciones Automáticas

Cada push a la rama `main` desplegará automáticamente:
```bash
git add .
git commit -m "Nueva funcionalidad"
git push origin main
# Vercel desplegará automáticamente
```

## Troubleshooting

**Error de build:**
- Verificar que `npm run build` funcione localmente
- Revisar logs en Vercel Dashboard

**Error de Firebase:**
- Verificar variables de entorno
- Confirmar configuración de Firebase

**Rutas no funcionan:**
- El archivo `vercel.json` debe estar en la raíz
- Verificar configuración de reescritura

## URLs de Ejemplo

- **Producción**: https://calculadora-riesgo.vercel.app
- **Preview**: https://calculadora-riesgo-git-main.vercel.app
- **Development**: http://localhost:5175

---

¡Tu aplicación estará lista en minutos! 🎉
