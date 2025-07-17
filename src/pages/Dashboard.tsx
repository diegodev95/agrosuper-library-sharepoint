import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";

interface DashboardProps {
  user: any;
}

const navigationTabs = [
  { name: "INICIO", href: "inicio", active: true },
  { name: "BUSCAR", href: "buscar", active: false },
  { name: "FAVORITOS", href: "favoritos", active: false },
  {
    name: "DOCUMENTOS ESTRATEGICOS",
    href: "documentos-estrategicos",
    active: false,
  },
  { name: "DOCUMENTOS DE APOYO", href: "documentos-apoyo", active: false },
  { name: "ADMINISTRACIÓN", href: "administracion", active: false },
];

const actionButtons = [
  {
    name: "BUSCAR DOCUMENTOS",
    icon: (
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    href: "#",
  },
  {
    name: "DOCUMENTOS DE APOYO",
    icon: (
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2v-2a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2z"
        />
      </svg>
    ),
    href: "#",
  },
  {
    name: "SOLICITAR REUNIÓN",
    icon: (
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20v-2a3 3 0 00-6 0v2M12 12a5 5 0 100-10 5 5 0 000 10zm6 8a2 2 0 002-2v-2a2 2 0 00-2-2h-1.35"
        />
      </svg>
    ),
    href: "#",
  },
];

// Componente para el organigrama
const Organigrama: React.FC = () => (
  <div className="w-full">
    <h3 className="text-xl font-bold text-blue-600 mb-8 text-center">
      BUSCAR POR ORGANIGRAMA
    </h3>
    <div className="overflow-x-auto flex justify-center">
      <Tree
        lineWidth={"2px"}
        lineColor={"#a3a3a3"}
        lineBorderRadius={"10px"}
        label={
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-lg min-w-[220px] text-center text-sm font-medium">
            GERENCIA GENERAL AGROSUPER
          </div>
        }
      >
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA INDUSTRIAL
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA INNOVACIONES
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA COMERCIAL
            </div>
          }
        >
          <TreeNode
            label={
              <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
                GERENCIA VENTAS INTERNACIONALES
              </div>
            }
          />
        </TreeNode>
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA VENTAS NACIONALES
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA CADENA SUMINISTRO
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA PERSONAS
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA ADMINISTRACIÓN Y FINANZAS
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA PRODUCCIÓN ANIMAL
            </div>
          }
        />
        <TreeNode
          label={
            <div className="bg-orange-500 text-white p-3 rounded-lg shadow-lg text-center text-xs font-medium">
              GERENCIA ASUNTOS CORPORATIVOS Y SUSTENTABILIDAD
            </div>
          }
        />
      </Tree>
    </div>
  </div>
);

// Componente para el listado
const Listado: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-blue-600 mb-6">
        Listado de Documentos
      </h3>
      <p className="text-gray-600">
        Aquí se mostrará el listado de documentos disponibles.
      </p>
    </div>
  );
};

// Componente para la vista de búsqueda
const BuscarView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedOption, setSelectedOption] = useState<
    "organigrama" | "listado" | null
  >(null);

  const searchOptions = [
    {
      name: "ORGANIGRAMA",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 112-2m0 0V5a2 2 0 112-2h6a2 2 0 012 2h10"
          />
        </svg>
      ),
      value: "organigrama" as const,
    },
    {
      name: "LISTADO",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 112 212"
          />
        </svg>
      ),
      value: "listado" as const,
    },
  ];

  if (selectedOption === "organigrama") {
    return (
      <div>
        <button
          onClick={() => setSelectedOption(null)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>
        <Organigrama />
      </div>
    );
  }

  if (selectedOption === "listado") {
    return (
      <div>
        <button
          onClick={() => setSelectedOption(null)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>
        <Listado />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al Dashboard
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6">
        Selecciona una opción de búsqueda
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {searchOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedOption(option.value)}
            className="bg-orange-500 hover:bg-blue-800 text-white p-6 sm:p-8 rounded-lg shadow-lg transition-colors duration-200 flex flex-col items-center justify-center space-y-3 sm:space-y-4 min-h-[120px] sm:min-h-[140px]"
          >
            <div className="text-white">{option.icon}</div>
            <span className="text-sm sm:text-base lg:text-lg font-medium text-center leading-tight">
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<"dashboard" | "buscar">(
    "dashboard"
  );

  const handleBuscarClick = () => {
    setCurrentView("buscar");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  if (currentView === "buscar") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-40 sm:h-48 md:h-56 lg:h-64 flex items-center">
          {/* Fondo decorativo */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url('/agrosuper-wallpaper.png')`,
            }}
          ></div>
          {/* Overlay para mejorar contraste */}
          <div className="absolute inset-0 bg-blue-900/40"></div>
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-0">
            {/* Logo y nombre empresa */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-0">
              <div className="bg-orange-50 rounded-xl flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shadow-lg">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
              <span className="hidden sm:inline-block text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-lg">
                AGROSUPER
              </span>
            </div>
            {/* Título */}
            <div className="w-full sm:w-auto text-center sm:text-right">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
                BIBLIOTECA DE NORMAS Y PROCEDIMIENTOS
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-blue-100/90 font-medium tracking-wide hidden md:block">
                Accede, consulta y gestiona los documentos clave de la
                organización
              </p>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 min-w-max">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.href}
                  className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    tab.href === "buscar"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <BuscarView onBack={handleBackToDashboard} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-40 sm:h-48 md:h-56 lg:h-64 flex items-center">
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url('/agrosuper-wallpaper.png')`,
          }}
        ></div>
        {/* Overlay para mejorar contraste */}
        <div className="absolute inset-0 bg-blue-900/40"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-0">
          {/* Logo y nombre empresa */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-0">
            <div className="bg-orange-50 rounded-xl flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shadow-lg">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <span className="hidden sm:inline-block text-white text-base md:text-lg font-semibold tracking-wide drop-shadow-lg">
              AGROSUPER
            </span>
          </div>
          {/* Título */}
          <div className="w-full sm:w-auto text-center sm:text-right">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
              BIBLIOTECA DE NORMAS Y PROCEDIMIENTOS
            </h1>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-blue-100/90 font-medium tracking-wide hidden md:block">
              Accede, consulta y gestiona los documentos clave de la
              organización
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 min-w-max">
            {navigationTabs.map((tab) => (
              <button
                key={tab.href}
                className={`py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  tab.active
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
            NORMAS Y PROCEDIMIENTOS
          </h2>
          <div className="prose max-w-none">
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
              Nuestra misión es diseñar y elaborar documentos organizacionales
              que reduzcan la pérdida de recursos, prevengan problemas, aceleren
              la curva de aprendizaje y fomenten la mejora continua.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              A través de un enfoque sistemático y colaborativo, hemos logrado
              establecer estándares de calidad que garantizan la consistencia y
              <span className="text-2xl font-bold text-white">AGROSUPER</span>
              eficiencia en todos nuestros procesos operativos.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {actionButtons.map((button) => (
            <button
              key={button.name}
              onClick={
                button.name === "BUSCAR DOCUMENTOS"
                  ? handleBuscarClick
                  : undefined
              }
              className="bg-orange-500 hover:bg-blue-800 text-white p-6 sm:p-8 rounded-lg shadow-lg transition-colors duration-200 flex flex-col items-center justify-center space-y-3 sm:space-y-4 min-h-[120px] sm:min-h-[140px]"
            >
              <div className="text-white">{button.icon}</div>
              <span className="text-sm sm:text-base lg:text-lg font-medium text-center leading-tight">
                {button.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
