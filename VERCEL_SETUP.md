# Configuración de Variables de Entorno en Vercel

## 📋 Variables requeridas en Vercel

Para que la aplicación funcione correctamente en producción, debes configurar las siguientes variables de entorno en el panel de Vercel:

### 🔥 Firebase Configuration
```
VITE_FIREBASE_API_KEY=AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM
VITE_FIREBASE_AUTH_DOMAIN=risk-calculator-9251e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=risk-calculator-9251e
VITE_FIREBASE_STORAGE_BUCKET=risk-calculator-9251e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=657154942565
VITE_FIREBASE_APP_ID=1:657154942565:web:d8ce3b3655eeb41da0c88c
```

### 📊 Sentry Configuration
```
VITE_SENTRY_DSN=https://0fae3c646f89c6a1995c4c57c929f425@o4507908899471360.ingest.us.sentry.io/4509971145490434
VITE_SENTRY_RELEASE=calculadora-riesgos@1.0.0
VITE_APP_VERSION=1.0.0
```

### 🔧 Sentry Build Configuration
```
SENTRY_ORG=calculcadora-de-riesgos
SENTRY_PROJECT=calculadora-riesgos
SENTRY_AUTH_TOKEN=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
```

### 🏷️ App Configuration
```
VITE_APP_NAME=Calculadora de Riesgos
VITE_APP_DESCRIPTION=Aplicación para calcular y gestionar riesgos
NODE_ENV=production
```

## 🚀 Cómo configurar en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `calculadora-riesgos`
3. Ve a **Settings** > **Environment Variables**
4. Agrega cada variable una por una:
   - **Name**: `VITE_FIREBASE_API_KEY`
   - **Value**: `AIzaSyDHI1JV_gxUE0tqnaWF9bWJvCwTrhzdSMM`
   - **Environment**: Select `Production`, `Preview`, y `Development`
5. Repite para todas las variables listadas arriba

## 🔒 Configuración de Reglas de Firebase

Para solucionar el error de permisos de Firebase, necesitas actualizar las reglas de Firestore:

### Reglas temporales (para desarrollo):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura a la colección riskAssessments
    match /riskAssessments/{document} {
      allow read, write: if true;
    }
  }
}
```

### Reglas de producción (más seguras):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura con validación básica
    match /riskAssessments/{document} {
      allow read: if true;
      allow write: if request.resource.data.keys().hasAll(['name', 'asset', 'method']) &&
                      request.resource.data.name is string &&
                      request.resource.data.asset is string &&
                      request.resource.data.method in ['qualitative', 'quantitative'];
    }
  }
}
```

## 🔧 Pasos para aplicar las reglas de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `risk-calculator-9251e`
3. Ve a **Firestore Database** > **Rules**
4. Reemplaza las reglas existentes con las reglas temporales de arriba
5. Haz clic en **Publish**

## ✅ Verificación

Después de configurar todo:

1. Haz un nuevo deploy en Vercel
2. Verifica que no hay errores de variables de entorno
3. Verifica que Sentry está recibiendo datos
4. Verifica que Firebase permite las operaciones de lectura/escritura

## 🐛 Solución de problemas

### Si Sentry no funciona:
- Verifica que el DSN es correcto
- Verifica que las variables están configuradas en Vercel
- Revisa la consola del navegador en producción

### Si Firebase da errores de permisos:
- Verifica las reglas de Firestore
- Asegúrate de que las variables de Firebase están configuradas
- Verifica que el proyecto ID coincide

### Si las variables no se cargan:
- Asegúrate de que tienen el prefijo `VITE_` para variables del frontend
- Verifica que están configuradas para todos los entornos (Production, Preview, Development)
- Haz un nuevo deploy después de agregar las variables
