import * as Sentry from '@sentry/react';
import { Button } from './ui/button';
import { useState } from 'react';

// Componente para probar Sentry's error tracking
function SentryTestButton() {
  const [lastAction, setLastAction] = useState('');

  const handleError = () => {
    setLastAction('💥 Error lanzado - Revisa la consola y tu dashboard de Sentry');
    
    // Agregar contexto adicional antes del error
    Sentry.addBreadcrumb({
      message: 'Usuario hizo clic en el botón de prueba de error',
      level: 'info',
      category: 'ui',
    });

    Sentry.setTag('section', 'test');
    Sentry.setContext('test_info', {
      component: 'SentryTestButton',
      action: 'manual_error_test',
      timestamp: new Date().toISOString(),
    });

    // Lanzar el error para probar Sentry
    throw new Error('¡Este es tu primer error de prueba para Sentry! 🚨');
  };

  const handleManualReport = () => {
    setLastAction('⚠️ Error reportado manualmente - Revisa tu dashboard de Sentry');
    
    // Reportar un error manualmente sin romper la aplicación
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'manual_report');
      scope.setLevel('warning');
      scope.setContext('manual_test', {
        description: 'Error reportado manualmente sin romper la app',
        user_action: 'test_manual_reporting',
      });
      
      Sentry.captureException(new Error('Error reportado manualmente para prueba'));
    });
  };

  const handleMessage = () => {
    setLastAction('📝 Mensaje enviado - Revisa tu dashboard de Sentry');
    
    // Enviar un mensaje personalizado
    Sentry.addBreadcrumb({
      message: 'Usuario envió mensaje de prueba',
      level: 'info',
    });

    Sentry.captureMessage('Mensaje de prueba desde la calculadora de riesgos', 'info');
  };

  const handlePerformanceTest = () => {
    setLastAction('📊 Transacción de rendimiento iniciada');
    
    // Crear una span de rendimiento personalizada
    Sentry.withScope((scope) => {
      scope.setTag('performance_test', true);
      
      // Simular algo de trabajo con medición de tiempo
      const start = performance.now();
      
      setTimeout(() => {
        const duration = performance.now() - start;
        
        Sentry.addBreadcrumb({
          message: 'Performance test completed',
          level: 'info',
          data: {
            duration: `${duration}ms`,
            operation: 'test-performance'
          }
        });
        
        setLastAction(`📊 Test completado en ${duration.toFixed(2)}ms`);
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 border rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 shadow-lg">
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        🧪 Panel de Pruebas de Sentry
        <span className="text-sm font-normal px-2 py-1 bg-green-100 text-green-700 rounded">
          ✅ Conectado
        </span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button 
          onClick={handleError}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          💥 Break the world
        </Button>
        
        <Button 
          onClick={handleManualReport}
          variant="outline"
          className="border-orange-500 text-orange-600 hover:bg-orange-50 flex items-center gap-2"
        >
          ⚠️ Reportar Error Manual
        </Button>
        
        <Button 
          onClick={handleMessage}
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-2"
        >
          📝 Enviar Mensaje
        </Button>

        <Button 
          onClick={handlePerformanceTest}
          variant="outline"
          className="border-purple-500 text-purple-600 hover:bg-purple-50 flex items-center gap-2"
        >
          📊 Test Performance
        </Button>
      </div>
      
      {lastAction && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          <strong>Última acción:</strong> {lastAction}
        </div>
      )}
      
      <div className="text-sm text-slate-600 space-y-2">
        <p className="font-medium">🎯 Instrucciones:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Los botones envían datos a Sentry (aunque se vean errores ERR_BLOCKED_BY_CLIENT en consola)</li>
          <li>ERR_BLOCKED_BY_CLIENT = Ad blocker/extensión bloqueando (normal en desarrollo)</li>
          <li>Revisa tu dashboard de Sentry: <span className="font-mono text-xs">sentry.io</span></li>
          <li>En producción funcionará sin bloqueos</li>
        </ul>
      </div>
      
      <div className="text-xs text-slate-500 p-2 bg-slate-100 rounded font-mono">
        DSN: {import.meta.env.VITE_SENTRY_DSN?.slice(0, 50)}...
      </div>
    </div>
  );
}

export default SentryTestButton;
