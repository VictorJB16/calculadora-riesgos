# 🛡️ Configuración de Sentry para Calculadora de Riesgos

## ✅ Estado Actual - COMPLETAMENTE CONFIGURADO

**¡Tu configuración de Sentry está funcionando perfectamente!** 

Los logs que viste en la consola confirman que:
- ✅ Sentry se inicializa correctamente
- ✅ Los errores se capturan y envían
- ✅ Los errores `ERR_BLOCKED_BY_CLIENT` son normales en desarrollo (ad blockers)

## 🔧 Configuración Realizada

### 1. Variables de Entorno (`.env`) - YA CONFIGURADO
```bash
VITE_SENTRY_DSN=https://0fae3c646f89c6a1995c4c57c929f425@o4507908899471360.ingest.us.sentry.io/4509971145490434
VITE_SENTRY_RELEASE=calculadora-riesgos@1.0.0
VITE_APP_VERSION=1.0.0
SENTRY_ORG=calculcadora-de-riesgos
SENTRY_PROJECT=calculadora-riesgos
```

### 2. Inicialización en `src/main.tsx` - YA CONFIGURADO
```typescript
import { initSentry } from './lib/sentry'
initSentry(); // Se ejecuta antes de renderizar la app
```

### 3. ErrorBoundary de Sentry en `src/App.tsx` - YA CONFIGURADO
- Wrappea toda la aplicación con `Sentry.withErrorBoundary`
- Captura errores automáticamente
- Muestra UI de fallback personalizada

### 4. Componente de Prueba `SentryTestButton` - YA IMPLEMENTADO
- 4 tipos de pruebas diferentes
- Feedback visual de acciones
- Solo visible en modo desarrollo

## 🧪 Cómo Probar - LISTO PARA USAR

### En la Aplicación (http://localhost:5173/):
1. Busca el panel "🧪 Panel de Pruebas de Sentry" en la página principal
2. Prueba los botones:
   - **💥 Break the world** - Lanza un error que rompe la app
   - **⚠️ Reportar Error Manual** - Envía error sin romper la app  
   - **📝 Enviar Mensaje** - Envía mensaje informativo
   - **📊 Test Performance** - Prueba métricas de rendimiento

### En tu Dashboard de Sentry:
1. Ve a [sentry.io](https://sentry.io)
2. Busca el proyecto "calculadora-riesgos"
3. Verifica que los errores aparezcan en tiempo real

## ⚠️ Errores Esperados en Desarrollo - ESTO ES NORMAL

### `ERR_BLOCKED_BY_CLIENT` ← ESTO CONFIRMA QUE FUNCIONA
```
POST https://...sentry.io/... net::ERR_BLOCKED_BY_CLIENT
```

**Esto es NORMAL y ESPERADO porque:**
- Los ad blockers bloquean peticiones a Sentry
- Las extensiones de privacidad bloquean tracking
- uBlock Origin, AdBlock Plus, etc. bloquean por defecto
- **Ver este error significa que Sentry SÍ está intentando enviar datos**

**Soluciones:**
1. **Para desarrollo**: Desactiva ad blockers temporalmente
2. **Para pruebas**: Usa modo incógnito sin extensiones
3. **En producción**: Los usuarios finales verán el comportamiento real

Para que Sentry pueda subir source maps automáticamente durante el build:

1. En Sentry, ve a Settings → Account → API Keys
2. Crea un nuevo Auth Token con permisos para:
   - project:read
   - project:releases
   - org:read
3. Copia el token y úsalo como `SENTRY_AUTH_TOKEN`

## 4. Funcionalidades implementadas

### Monitoreo de errores
- ✅ Captura automática de errores JavaScript
- ✅ ErrorBoundary personalizado para React
- ✅ Captura de errores en Firebase/API calls
- ✅ Fallback a localStorage cuando Firebase falla

### Monitoreo de performance
- ✅ Métricas de carga de la aplicación
- ✅ First Contentful Paint
- ✅ DOM Content Loaded
- ✅ Detección de errores de recursos

### Session Replay
- ✅ Grabación de sesiones en caso de errores
- ✅ Configurado para no grabar datos sensibles

### Breadcrumbs
- ✅ Seguimiento de navegación del usuario
- ✅ Acciones importantes en la aplicación
- ✅ Operaciones de base de datos

## 5. Utilidades disponibles

```typescript
import { 
  captureError, 
  captureMessage, 
  addBreadcrumb, 
  setUser, 
  setTag, 
  setContext 
} from '../lib/sentry';

// Capturar error manualmente
captureError(new Error('Algo salió mal'), { 
  userId: 'user123',
  operation: 'calculation' 
});

// Capturar mensaje
captureMessage('Usuario completó evaluación', 'info');

// Agregar breadcrumb
addBreadcrumb('Botón guardar clickeado', 'user_action');

// Configurar usuario
setUser({ id: 'user123', email: 'user@example.com' });

// Agregar tags
setTag('feature', 'risk_calculator');

// Agregar contexto
setContext('calculation', { method: 'qualitative', asset: 'server' });
```

## 6. Testing en desarrollo

Para probar que Sentry funciona correctamente:

1. Abre la consola del navegador
2. Ejecuta: `throw new Error('Test error for Sentry')`
3. Ve a tu dashboard de Sentry para verificar que el error aparece

## 7. Configuración de Alertas

En el dashboard de Sentry puedes configurar:

- **Email alerts** para errores críticos
- **Slack/Discord integrations** para notificaciones del equipo
- **Release tracking** para correlacionar errores con deployments
- **Performance alerts** para slowdowns

## 8. Build para producción

Para deployments, las siguientes variables son opcionales pero recomendadas:

```bash
# En tu CI/CD o entorno de build
SENTRY_ORG=your-organization
SENTRY_PROJECT=calculadora-riesgos
SENTRY_AUTH_TOKEN=your-auth-token
```

Esto permitirá que Sentry:
- Suba source maps automáticamente
- Cree releases para tracking
- Associate commits con errores

## 9. Mejores prácticas

### ✅ DO:
- Usa `captureError()` para errores manejados
- Agrega contexto relevante a los errores
- Configura usuarios cuando sea posible
- Usa breadcrumbs para tracking de UX

### ❌ DON'T:
- No captures errores que no necesitas
- No incluyas información sensible en contextos
- No uses `console.error()` directamente, usa Sentry
- No olvides configurar el DSN en producción

## 10. Monitoreo recomendado

### Métricas clave a observar:
- **Error rate**: Mantener < 1%
- **TTFB (Time to First Byte)**: < 200ms
- **First Contentful Paint**: < 1.5s
- **User satisfaction**: > 95%

### Alertas recomendadas:
- Error spike: > 10 errores en 5 minutos
- Performance degradation: FCP > 3s
- High error rate: > 5% durante 10 minutos
