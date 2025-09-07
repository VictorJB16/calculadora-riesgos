import * as Sentry from '@sentry/react';

export const initSentry = () => {
  // Verificar que tenemos el DSN antes de inicializar
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn || dsn === 'your-sentry-dsn-here') {
    console.warn('VITE_SENTRY_DSN no está configurado. Sentry no se inicializará.');
    return;
  }

  console.log('🔍 Inicializando Sentry...');
  console.log('🌍 Environment:', import.meta.env.MODE);
  console.log('🚀 Release:', import.meta.env.VITE_SENTRY_RELEASE);

  Sentry.init({
    dsn,
    integrations: [
      Sentry.browserTracingIntegration({
        // Configurar el rastreo de navegación
        enableInp: true,
      }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    environment: import.meta.env.MODE,
    // Performance Monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    // Session Replay
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    // Release tracking
    release: import.meta.env.VITE_SENTRY_RELEASE || `calculadora-riesgos@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
    
    // Configuración avanzada
    beforeSend(event) {
      // Filtrar errores comunes que no son útiles
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (error?.value?.includes('ResizeObserver loop limit exceeded') ||
            error?.value?.includes('Non-Error promise rejection captured') ||
            error?.value?.includes('Script error')) {
          return null;
        }
      }
      
      // En desarrollo, mostrar eventos en consola
      if (import.meta.env.DEV) {
        console.log('📊 Sentry Event:', event);
      }
      
      return event;
    },
    
    // Configuración inicial de usuario y contexto
    initialScope: {
      tags: {
        component: 'calculadora-riesgos',
        version: import.meta.env.VITE_APP_VERSION || '1.0.0',
        environment: import.meta.env.MODE,
      },
      contexts: {
        app: {
          name: 'Calculadora de Riesgos',
          version: import.meta.env.VITE_APP_VERSION || '1.0.0',
          build_time: new Date().toISOString(),
        },
        browser: {
          name: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          url: window.location.href,
        },
        firebase: {
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        }
      }
    },
    
    // Configuración de transporte para asegurar que los eventos se envíen
    transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),
    
    // Configurar el nivel de debug
    debug: import.meta.env.DEV,
  });

  // Configurar información del usuario inicial
  Sentry.setUser({
    id: 'anonymous',
    email: undefined,
    username: 'Usuario Anónimo'
  });

  // Establecer contexto adicional
  Sentry.setContext('deployment', {
    platform: 'vercel',
    timestamp: new Date().toISOString(),
    hostname: window.location.hostname,
  });

  console.log('✅ Sentry inicializado correctamente');
  
  // Enviar un evento de prueba en desarrollo
  if (import.meta.env.DEV) {
    Sentry.addBreadcrumb({
      message: 'Sentry initialized successfully',
      level: 'info',
      category: 'init',
    });
  }
};

// Funciones útiles para reportar errores manualmente
export const captureError = (error: Error, context?: Record<string, unknown>) => {
  console.error('🚨 Capturing error:', error);
  Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional_info', context);
    }
    scope.setLevel('error');
    Sentry.captureException(error);
  });
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  console.log(`📨 Capturing message [${level}]:`, message);
  Sentry.captureMessage(message, level);
};

export const addBreadcrumb = (message: string, category?: string, data?: Record<string, unknown>) => {
  Sentry.addBreadcrumb({
    message,
    category: category || 'custom',
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  });
};

export const setUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};

export const setContext = (key: string, context: Record<string, unknown>) => {
  Sentry.setContext(key, context);
};

// Función para testear Sentry
export const testSentry = () => {
  console.log('🧪 Testing Sentry...');
  captureMessage('Test message from Calculadora de Riesgos', 'info');
  addBreadcrumb('Sentry test initiated', 'test');
  
  // Simular un error después de un pequeño delay
  setTimeout(() => {
    try {
      throw new Error('Test error from Calculadora de Riesgos - this is intentional');
    } catch (error) {
      captureError(error as Error, {
        testContext: 'manual_test',
        timestamp: new Date().toISOString(),
      });
    }
  }, 1000);
};
