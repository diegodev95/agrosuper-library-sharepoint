import React, { useState } from "react";

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular autenticación con SharePoint
      // En un entorno real, aquí se configuraría PnP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simular datos del usuario
      const mockUser = {
        Id: 1,
        Title: "Usuario Demo",
        Email: "usuario@demo.com",
        LoginName: "i:0#.f|membership|usuario@demo.com",
        profile: {
          displayName: "Usuario Demo",
          mail: "usuario@demo.com",
        },
      };

      onLoginSuccess(mockUser);
    } catch (err) {
      console.error("Error during login:", err);
      setError("Error al iniciar sesión. Verifica tu conexión y permisos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-orange-500/10"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-[#003344] to-[#004455] px-8 py-8 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <img
                    src="/logo.png"
                    alt="AGROSUPER Logo"
                    className="h-24 w-auto"
                    onError={(e) => {
                      // Fallback si el logo no carga
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
              <p className="text-blue-100 text-sm">
                Portal de Ventas SharePoint
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-center text-gray-600 text-sm">
                Accede con tu cuenta de Microsoft
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#0078d4] to-[#106ebe] hover:from-[#106ebe] hover:to-[#005a9e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078d4] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Iniciar Sesión con Microsoft
                </div>
              )}
            </button>

            {/* Microsoft Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Utiliza tu cuenta corporativa de Microsoft 365
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                © Desarrollado por{" "}
                <span className="font-medium text-gray-500">BRIDEV</span> • 2025
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? Contacta a soporte técnico
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
