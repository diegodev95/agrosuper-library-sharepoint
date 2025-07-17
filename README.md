# SharePoint React App

Una aplicación React moderna para SharePoint que incluye autenticación, navegación y funcionalidades CRUD completas.

## 🚀 Características

- **Autenticación con SharePoint**: Login integrado con PnP (Patterns and Practices)
- **Navegación Responsiva**: Navbar moderno con menú móvil
- **Dashboard Interactivo**: Estadísticas y actividad reciente
- **Mantenedor CRUD**: Gestión completa de elementos con formularios
- **Configuración Avanzada**: Múltiples opciones de configuración organizadas en pestañas
- **Diseño Moderno**: Interfaz construida con Tailwind CSS
- **TypeScript**: Código tipado para mayor robustez

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Login.tsx          # Componente de autenticación
│   ├── Navbar.tsx         # Barra de navegación
│   └── Mantenedor.tsx     # CRUD de elementos
├── pages/
│   ├── Dashboard.tsx      # Página principal con estadísticas
│   └── Configuracion.tsx  # Configuración del sistema
├── App.tsx               # Componente principal
└── index.css             # Estilos globales con Tailwind
```

## 🛠️ Tecnologías Utilizadas

- **React 19**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **PnP (Patterns and Practices)**: Integración con SharePoint
- **React Hooks**: Gestión de estado

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:

   ```bash
   git clone <repository-url>
   cd sharepoint-react-app
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:

   ```bash
   # Copiar el archivo de ejemplo
   cp env.example .env

   # Editar las variables con tus valores
   nano .env
   ```

4. **Ejecutar en desarrollo**:

   ```bash
   npm start
   ```

5. **Construir para producción**:
   ```bash
   npm run build
   ```

## 🔐 Configuración SSO y Publicación

Para configurar Single Sign-On (SSO) y publicar la aplicación en SharePoint Online, consulta la guía completa:

**[📖 SSO-DEPLOYMENT.md](SSO-DEPLOYMENT.md)**

Esta guía incluye:

- ✅ Configuración de Azure AD
- ✅ Configuración de SharePoint
- ✅ Publicación de la aplicación
- ✅ Configuración de SSO
- ✅ Scripts de automatización
- ✅ Solución de problemas

## 📋 Funcionalidades

### 🔐 Autenticación

- Login simulado con SharePoint
- Gestión de sesión de usuario
- Información del perfil de usuario

### 📊 Dashboard

- Estadísticas en tiempo real
- Actividad reciente del sistema
- Información del usuario actual
- Acciones rápidas

### 📝 Mantenedor

- **Crear**: Formulario para nuevos elementos
- **Leer**: Tabla con filtros y búsqueda
- **Actualizar**: Edición inline de elementos
- **Eliminar**: Confirmación antes de eliminar
- Filtros por categoría y búsqueda por texto

### ⚙️ Configuración

- **General**: Nombre del sitio, zona horaria, idioma
- **Notificaciones**: Email, push, recordatorios
- **Seguridad**: Autenticación 2FA, timeout de sesión
- **Apariencia**: Tema, densidad, animaciones

## 🎨 Diseño

La aplicación utiliza un diseño moderno y responsivo con:

- Paleta de colores profesional
- Componentes reutilizables
- Animaciones suaves
- Interfaz adaptativa para móviles
- Iconos SVG integrados

## 🔧 Configuración de SharePoint

Para integrar completamente con SharePoint:

1. **Configurar PnP**:

   ```typescript
   import { spfi } from "@pnp/sp";
   import { graphfi } from "@pnp/graph";

   const sp = spfi("https://your-site.sharepoint.com");
   const graph = graphfi();
   ```

2. **Autenticación**:

   - Configurar Azure AD App Registration
   - Configurar permisos de SharePoint
   - Implementar flujo de autenticación OAuth

3. **Listas de SharePoint**:
   - Crear listas para los datos del mantenedor
   - Configurar permisos de usuario
   - Implementar operaciones CRUD reales

## 📱 Responsive Design

La aplicación es completamente responsiva y funciona en:

- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🚀 Próximas Mejoras

- [ ] Integración real con SharePoint Online
- [ ] Autenticación OAuth completa
- [ ] Sincronización en tiempo real
- [ ] Exportación de datos
- [ ] Reportes avanzados
- [ ] Temas personalizables
- [ ] Notificaciones push reales

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas, contacta al equipo de desarrollo.
