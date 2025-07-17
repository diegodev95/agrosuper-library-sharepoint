import React, { useState } from "react";

interface ConfiguracionProps {
  user: any;
}

const Configuracion: React.FC<ConfiguracionProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState({
    general: {
      nombreSitio: "SharePoint App",
      descripcion: "Aplicación de gestión para SharePoint",
      zonaHoraria: "America/Santiago",
      idioma: "es-ES",
    },
    notificaciones: {
      emailNotificaciones: true,
      notificacionesPush: false,
      recordatorios: true,
      reportesAutomaticos: false,
    },
    seguridad: {
      autenticacionDoble: false,
      sesionTimeout: 30,
      registroActividad: true,
      backupAutomatico: true,
    },
    apariencia: {
      tema: "claro",
      densidad: "normal",
      mostrarAnimaciones: true,
      mostrarTooltips: true,
    },
  });

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "notificaciones", name: "Notificaciones", icon: "🔔" },
    { id: "seguridad", name: "Seguridad", icon: "🔒" },
    { id: "apariencia", name: "Apariencia", icon: "🎨" },
  ];

  const handleConfigChange = (section: string, key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simular guardado de configuración
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Configuración guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar configuración:", error);
      alert("Error al guardar la configuración");
    } finally {
      setIsLoading(false);
    }
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Configuración General
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="nombreSitio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre del Sitio
            </label>
            <input
              type="text"
              id="nombreSitio"
              value={config.general.nombreSitio}
              onChange={(e) =>
                handleConfigChange("general", "nombreSitio", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              value={config.general.descripcion}
              onChange={(e) =>
                handleConfigChange("general", "descripcion", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="zonaHoraria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Zona Horaria
            </label>
            <select
              id="zonaHoraria"
              value={config.general.zonaHoraria}
              onChange={(e) =>
                handleConfigChange("general", "zonaHoraria", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/Santiago">Chile (GMT-3)</option>
              <option value="America/New_York">Nueva York (GMT-5)</option>
              <option value="Europe/Madrid">Madrid (GMT+1)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="idioma"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Idioma
            </label>
            <select
              id="idioma"
              value={config.general.idioma}
              onChange={(e) =>
                handleConfigChange("general", "idioma", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="es-ES">Español</option>
              <option value="en-US">English</option>
              <option value="pt-BR">Português</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificacionesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Configuración de Notificaciones
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Notificaciones por Email
              </h4>
              <p className="text-sm text-gray-500">
                Recibir notificaciones importantes por correo electrónico
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "notificaciones",
                  "emailNotificaciones",
                  !config.notificaciones.emailNotificaciones
                )
              }
              className={`${
                config.notificaciones.emailNotificaciones
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.notificaciones.emailNotificaciones
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Notificaciones Push
              </h4>
              <p className="text-sm text-gray-500">
                Recibir notificaciones en tiempo real en el navegador
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "notificaciones",
                  "notificacionesPush",
                  !config.notificaciones.notificacionesPush
                )
              }
              className={`${
                config.notificaciones.notificacionesPush
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.notificaciones.notificacionesPush
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Recordatorios
              </h4>
              <p className="text-sm text-gray-500">
                Recibir recordatorios de tareas pendientes
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "notificaciones",
                  "recordatorios",
                  !config.notificaciones.recordatorios
                )
              }
              className={`${
                config.notificaciones.recordatorios
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.notificaciones.recordatorios
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Reportes Automáticos
              </h4>
              <p className="text-sm text-gray-500">
                Recibir reportes semanales por email
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "notificaciones",
                  "reportesAutomaticos",
                  !config.notificaciones.reportesAutomaticos
                )
              }
              className={`${
                config.notificaciones.reportesAutomaticos
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.notificaciones.reportesAutomaticos
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSeguridadTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Configuración de Seguridad
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Autenticación de Dos Factores
              </h4>
              <p className="text-sm text-gray-500">
                Requerir código adicional para iniciar sesión
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "seguridad",
                  "autenticacionDoble",
                  !config.seguridad.autenticacionDoble
                )
              }
              className={`${
                config.seguridad.autenticacionDoble
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.seguridad.autenticacionDoble
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div>
            <label
              htmlFor="sesionTimeout"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tiempo de Sesión (minutos)
            </label>
            <select
              id="sesionTimeout"
              value={config.seguridad.sesionTimeout}
              onChange={(e) =>
                handleConfigChange(
                  "seguridad",
                  "sesionTimeout",
                  parseInt(e.target.value)
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={60}>1 hora</option>
              <option value={120}>2 horas</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Registro de Actividad
              </h4>
              <p className="text-sm text-gray-500">
                Mantener un registro de todas las acciones realizadas
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "seguridad",
                  "registroActividad",
                  !config.seguridad.registroActividad
                )
              }
              className={`${
                config.seguridad.registroActividad
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.seguridad.registroActividad
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Backup Automático
              </h4>
              <p className="text-sm text-gray-500">
                Realizar copias de seguridad automáticas diarias
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "seguridad",
                  "backupAutomatico",
                  !config.seguridad.backupAutomatico
                )
              }
              className={`${
                config.seguridad.backupAutomatico
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.seguridad.backupAutomatico
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAparienciaTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Configuración de Apariencia
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="tema"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tema
            </label>
            <select
              id="tema"
              value={config.apariencia.tema}
              onChange={(e) =>
                handleConfigChange("apariencia", "tema", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="claro">Claro</option>
              <option value="oscuro">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="densidad"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Densidad de la Interfaz
            </label>
            <select
              id="densidad"
              value={config.apariencia.densidad}
              onChange={(e) =>
                handleConfigChange("apariencia", "densidad", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="compacto">Compacto</option>
              <option value="normal">Normal</option>
              <option value="espacioso">Espacioso</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Mostrar Animaciones
              </h4>
              <p className="text-sm text-gray-500">
                Habilitar transiciones y animaciones en la interfaz
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "apariencia",
                  "mostrarAnimaciones",
                  !config.apariencia.mostrarAnimaciones
                )
              }
              className={`${
                config.apariencia.mostrarAnimaciones
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.apariencia.mostrarAnimaciones
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Mostrar Tooltips
              </h4>
              <p className="text-sm text-gray-500">
                Mostrar información adicional al pasar el mouse
              </p>
            </div>
            <button
              onClick={() =>
                handleConfigChange(
                  "apariencia",
                  "mostrarTooltips",
                  !config.apariencia.mostrarTooltips
                )
              }
              className={`${
                config.apariencia.mostrarTooltips
                  ? "bg-blue-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.apariencia.mostrarTooltips
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralTab();
      case "notificaciones":
        return renderNotificacionesTab();
      case "seguridad":
        return renderSeguridadTab();
      case "apariencia":
        return renderAparienciaTab();
      default:
        return renderGeneralTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración
          </h1>
          <p className="text-gray-600">
            Personaliza la configuración de tu aplicación
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Restaurar Valores
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
