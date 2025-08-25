# Risk-Calcu 🛡️🇨🇷

**Calculadora de Riesgos de Seguridad Informática para Costa Rica**

Risk-Calcu es una aplicación web especializada en la evaluación y gestión de riesgos de seguridad informática, diseñada específicamente para organizaciones en Costa Rica. Utiliza metodologías reconocidas internacionalmente adaptadas al contexto regulatorio y empresarial costarricense.

## 🚀 Características Principales

- **Evaluación de Riesgos Sistemática**: Basada en estándares ISO 27005, ISO 31000 y NIST
- **Contexto Costarricense**: Considera regulaciones locales como la Ley de Protección de Datos (8968)
- **Interfaz Moderna**: Desarrollada con React, TypeScript, Tailwind CSS y Shadcn UI
- **Persistencia de Datos**: Integración con Firebase para almacenamiento en la nube
- **Cálculo Automático**: Matriz de riesgo con puntuación automática de impacto y probabilidad
- **Historial de Evaluaciones**: Seguimiento de todas las evaluaciones realizadas

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS + Shadcn UI
- **Navegación**: React Router DOM
- **Base de Datos**: Firebase Firestore
- **Autenticación**: Firebase Auth (configuración lista)
- **Desarrollo**: ESLint + Hot Module Replacement

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase (para funcionalidad completa)

## ⚡ Instalación y Configuración

### 1. Clonar e instalar dependencias

\`\`\`bash
# Instalar dependencias
npm install
\`\`\`

### 2. Configurar Firebase (Opcional)

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database
3. Obtener la configuración del proyecto
4. Actualizar el archivo \`src/lib/firebase.ts\`:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-sender-id",
  appId: "tu-app-id"
};
\`\`\`

### 3. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en \`http://localhost:5173\`

## 🏗️ Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes UI base (Shadcn)
│   └── Navbar.tsx      # Navegación principal
├── hooks/              # Hooks personalizados
│   └── useRiskAssessments.ts  # Hook para Firebase
├── lib/                # Utilidades y configuración
│   ├── firebase.ts     # Configuración Firebase
│   └── utils.ts        # Utilidades generales
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Página principal
│   ├── RiskCalculator.tsx  # Calculadora de riesgos
│   └── About.tsx       # Información sobre la app
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
\`\`\`

## 🎯 Uso de la Aplicación

### Evaluación de Riesgos

1. **Navegar a la Calculadora**: Ir a \`/calculator\`
2. **Completar el Formulario**:
   - Organización (opcional)
   - Activo a evaluar
   - Amenaza identificada
   - Vulnerabilidad presente
   - Nivel de impacto (1-5)
   - Probabilidad de ocurrencia (1-5)
3. **Calcular Riesgo**: El sistema calculará automáticamente:
   - Puntuación de riesgo
   - Nivel de riesgo (Bajo/Medio/Alto/Crítico)
4. **Revisar Resultados**: Ver historial y análisis

### Metodología de Evaluación

**Niveles de Impacto (1-5):**
- 1 - Mínimo: Sin afectación operativa
- 2 - Menor: Afectación mínima temporal  
- 3 - Moderado: Afectación parcial de servicios
- 4 - Mayor: Afectación significativa
- 5 - Severo: Pérdida total de servicio

**Niveles de Probabilidad (1-5):**
- 1 - Muy Baja: Evento muy improbable
- 2 - Baja: Evento poco probable
- 3 - Media: Evento posible
- 4 - Alta: Evento probable
- 5 - Muy Alta: Evento muy probable

**Matriz de Riesgo:**
- 🟢 Bajo (1-6): Riesgo aceptable
- 🟡 Medio (7-12): Requiere monitoreo
- 🟠 Alto (13-20): Requiere acción
- 🔴 Crítico (21-25): Acción inmediata

## 🛡️ Consideraciones de Seguridad para Costa Rica

La aplicación considera el marco regulatorio costarricense:

- **Ley de Protección de Datos Personales (Ley N° 8968)**
- **Normativas del MICITT y SUTEL**
- **Estándares internacionales ISO 27001 e ISO 31000**
- **Marco de referencia NIST Cybersecurity Framework**

## 🚀 Despliegue

### Build para Producción

\`\`\`bash
npm run build
\`\`\`

### Despliegue en Firebase Hosting

\`\`\`bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar proyecto
firebase init hosting

# Desplegar
firebase deploy
\`\`\`

## 📝 Scripts Disponibles

- \`npm run dev\` - Servidor de desarrollo
- \`npm run build\` - Build para producción
- \`npm run preview\` - Preview del build
- \`npm run lint\` - Ejecutar ESLint

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama feature (\`git checkout -b feature/nueva-funcionalidad\`)
3. Commit los cambios (\`git commit -am 'Agregar nueva funcionalidad'\`)
4. Push a la rama (\`git push origin feature/nueva-funcionalidad\`)
5. Crear un Pull Request

## 📞 Soporte y Contacto

- **Email**: soporte@risk-calcu.cr
- **Ubicación**: San José, Costa Rica
- **Sectores**: Banca, Gobierno, Telecomunicaciones, Salud, Educación

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🙏 Agradecimientos

- Comunidad de desarrolladores de Costa Rica
- Estándares internacionales de seguridad informática
- Frameworks y bibliotecas de código abierto utilizadas

---

**Risk-Calcu** - Protegiendo el futuro digital de Costa Rica 🇨🇷✨
