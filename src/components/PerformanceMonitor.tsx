import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { addBreadcrumb, setContext } from '../lib/sentry';

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ children }) => {
  useEffect(() => {
    // Monitorear performance de la aplicación
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          const firstContentfulPaint = performance.getEntriesByType('paint')
            .find(entry => entry.name === 'first-contentful-paint')?.startTime;

          // Enviar métricas a Sentry como contexto
          setContext('performance', {
            loadTime,
            domContentLoaded,
            firstContentfulPaint,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          });

          addBreadcrumb('Performance metrics collected', 'performance', {
            loadTime: `${loadTime}ms`,
            domContentLoaded: `${domContentLoaded}ms`,
            firstContentfulPaint: firstContentfulPaint ? `${firstContentfulPaint}ms` : 'N/A'
          });

          // Enviar métricas como mensaje informativo
          Sentry.withScope((scope) => {
            scope.setTag('performance.type', 'app_load');
            scope.setExtra('metrics', {
              loadTime: `${loadTime}ms`,
              domContentLoaded: `${domContentLoaded}ms`,
              firstContentfulPaint: firstContentfulPaint ? `${firstContentfulPaint}ms` : 'N/A'
            });
            
            Sentry.captureMessage('App performance metrics collected', 'info');
          });
        }
      }
    };

    // Ejecutar cuando la página esté completamente cargada
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Monitorear errores de recursos
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName) {
        Sentry.addBreadcrumb({
          message: `Resource load error: ${target.tagName}`,
          category: 'resource',
          level: 'error',
          data: {
            tagName: target.tagName,
            src: (target as HTMLImageElement | HTMLScriptElement).src || 'unknown',
            type: 'resource_error'
          }
        });
      }
    };

    window.addEventListener('error', handleResourceError, true);

    // Monitorear errores de promesas no capturadas
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      Sentry.captureException(new Error(`Unhandled Promise Rejection: ${event.reason}`));
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('load', measurePerformance);
      window.removeEventListener('error', handleResourceError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};
