import React from "react";

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
        className="w-8 h-8"
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
        className="w-8 h-8"
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
        className="w-8 h-8"
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

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-48">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/agrosuper-wallpaper.png')`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 4 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">AGROSUPER</span>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-white">
              BIBLIOTECA DE NORMAS Y PROCEDIMIENTOS
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigationTabs.map((tab) => (
              <button
                key={tab.href}
                className={`py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            NORMAS Y PROCEDIMIENTOS
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Nuestra misión es diseñar y elaborar documentos organizacionales
              que reduzcan la pérdida de recursos, prevengan problemas, aceleren
              la curva de aprendizaje y fomenten la mejora continua.
            </p>
            <p className="text-gray-700">
              A través de un enfoque sistemático y colaborativo, hemos logrado
              establecer estándares de calidad que garantizan la consistencia y
              eficiencia en todos nuestros procesos operativos.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionButtons.map((button) => (
            <button
              key={button.name}
              className="bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-lg shadow-lg transition-colors duration-200 flex flex-col items-center justify-center space-y-4"
            >
              <div className="text-white">{button.icon}</div>
              <span className="text-lg font-medium text-center">
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
