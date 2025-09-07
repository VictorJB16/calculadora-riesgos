# 🚀 Guía de Resolución de Problemas - Calculadora de Riesgos

## 📋 Resumen de Problemas Identificados

1. **❌ Error de permisos de Firebase**: "Missing or insufficient permissions"
2. **❌ Error de módulo Firebase**: "Failed to resolve module specifier firebase/app"
3. **❌ Sentry no funciona correctamente** en producción
4. **❌ Variables de entorno** no configuradas en Vercel

## 🔧 Soluciones Implementadas

### 1. 🔥 Firebase - Configuración de Reglas
**Problema**: Las reglas de Firestore no permiten acceso sin autenticación.

**Solución**:
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `risk-calculator-9251e`
3. Ve a **Firestore Database** > **Rules**
4. Reemplaza las reglas con el contenido del archivo `firestore.rules`
5. Haz clic en **Publish**

### 2. 📊 Sentry - Configuración Mejorada
**Problema**: Sentry no está enviando datos correctamente en producción.

**Solución**: ✅ Ya implementada
- Configuración mejorada de Sentry en `src/lib/sentry.ts`
- Mejor manejo de errores y filtrado
- Componente de prueba mejorado

### 3. 🌐 Variables de Entorno en Vercel
**Problema**: Las variables de entorno no están configuradas en Vercel.

**Solución**: Configura estas variables en tu panel de Vercel:

#### Variables requeridas:
```
VITE_FIREBASE_API_KEY=AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM
VITE_FIREBASE_AUTH_DOMAIN=risk-calculator-9251e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=risk-calculator-9251e
VITE_FIREBASE_STORAGE_BUCKET=risk-calculator-9251e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=657154942565
VITE_FIREBASE_APP_ID=1:657154942565:web:d8ce3b3655eeb41da0c88c
VITE_SENTRY_DSN=https://0fae3c646f89c6a1995c4c57c929f425@o4507908899471360.ingest.us.sentry.io/4509971145490434
VITE_SENTRY_RELEASE=calculadora-riesgos@1.0.0
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=Calculadora de Riesgos
VITE_APP_DESCRIPTION=Aplicación para calcular y gestionar riesgos
```

#### Pasos para configurar en Vercel:
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** > **Environment Variables**
4. Agrega cada variable (selecciona Production, Preview y Development)

### 4. 🛠️ Mejoras en el Código
**Implementadas**:
- ✅ Mejor manejo de errores de Firebase
- ✅ Fallback automático a localStorage
- ✅ Logging mejorado para debugging
- ✅ Configuración optimizada de Vite
- ✅ Manejo robusto de estados de carga

## 🚀 Pasos Inmediatos para Resolver

### Paso 1: Configurar Firebase (MUY IMPORTANTE)
```bash
# 1. Ve a Firebase Console
# 2. Proyecto: risk-calculator-9251e
# 3. Firestore Database > Rules
# 4. Copia el contenido de firestore.rules
# 5. Publish
```

### Paso 2: Configurar Variables en Vercel
```bash
# 1. Ve a Vercel Dashboard
# 2. Tu proyecto > Settings > Environment Variables
# 3. Agrega todas las variables listadas arriba
```

### Paso 3: Hacer Deploy
```bash
# El deploy debería funcionar automáticamente después de:
# - Configurar variables de entorno
# - Actualizar reglas de Firebase
```

## 🔍 Verificación Post-Deploy

### ✅ Firebase funcionando:
- No más errores "Missing or insufficient permissions"
- Los cálculos se guardan correctamente
- Los datos se cargan desde Firebase

### ✅ Sentry funcionando:
- Ve a tu dashboard de Sentry
- Deberías ver eventos llegando
- Usa el botón de prueba en la aplicación

### ✅ Variables de entorno:
- No más errores de módulos no encontrados
- La aplicación carga correctamente

## 🔧 Si Persisten Problemas

### Error de Firebase:
```javascript
// Si sigues viendo errores de permisos, usa reglas más permisivas:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ Solo para desarrollo
    }
  }
}
```

### Error de Sentry:
- Verifica que el DSN es correcto
- Revisa la consola del navegador
- Los errores "ERR_BLOCKED_BY_CLIENT" son normales (bloqueadores de anuncios)

### Error de Variables:
- Asegúrate de que todas tienen el prefijo `VITE_`
- Verifica que están en todos los entornos
- Haz un nuevo deploy después de agregar variables

## 📞 Próximos Pasos

1. **Inmediato**: Configurar Firebase y Vercel según esta guía
2. **Mediano plazo**: Implementar autenticación para mayor seguridad
3. **Largo plazo**: Optimizar reglas de Firebase para producción

---

💡 **Tip**: Después de hacer estos cambios, tu aplicación debería funcionar correctamente sin errores de permisos ni problemas de Sentry.
