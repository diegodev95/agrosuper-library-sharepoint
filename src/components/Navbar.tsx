import React, { useState } from "react";

interface User {
  Id: number;
  Title: string;
  Email: string;
  LoginName: string;
  profile?: {
    displayName: string;
    mail: string;
  };
}

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  currentPage,
  onPageChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "dashboard" },
    { name: "Mantenedor", href: "mantenedor" },
    { name: "Configuración", href: "configuracion" },
  ];

  return (
    <nav className="bg-white shadow-lg">
      {/* SharePoint Header */}
      <div className="bg-[#484644] text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 sm:h-12">
            {/* Left side - Logo and SharePoint text */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-medium">
                  SharePoint
                </span>
              </div>
            </div>

            {/* Right side - Search and User controls */}
            <div className="flex items-center space-x-2">
              {/* Search Bar - Hidden on mobile, visible on tablet+ */}
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="BUSCAR EN ESTE SITIO"
                  className="w-48 lg:w-64 px-3 sm:px-1 text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      console.log("Buscando:", e.currentTarget.value);
                    }
                  }}
                />
                <svg
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    const searchInput = document.querySelector(
                      'input[placeholder="BUSCAR EN ESTE SITIO"]'
                    ) as HTMLInputElement;
                    if (searchInput) {
                      console.log("Buscando:", searchInput.value);
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Mobile Search Toggle */}
              <button
                className="sm:hidden p-1 hover:bg-gray-700 rounded"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <svg
                  className="w-4 h-4"
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
              </button>

              {/* Notification and Help buttons - Hidden on small mobile */}
              <div className="hidden xs:flex items-center space-x-1">
                <button className="p-1 hover:bg-gray-700 rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-700 rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* User Avatar and Logout */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {user?.profile?.displayName?.charAt(0) ||
                      user?.Title?.charAt(0) ||
                      "G"}
                  </span>
                </div>
                {user && (
                  <button
                    onClick={onLogout}
                    className="hidden sm:block bg-gray-700 hover:bg-gray-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    Cerrar Sesión
                  </button>
                )}
                {/* Mobile Logout - Icon only */}
                {user && (
                  <button
                    onClick={onLogout}
                    className="sm:hidden p-1 hover:bg-gray-700 rounded"
                    title="Cerrar Sesión"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Expandable */}
          {isSearchVisible && (
            <div className="sm:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="BUSCAR EN ESTE SITIO"
                  className="w-full px-3 sm:px-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      console.log("Buscando:", e.currentTarget.value);
                      setIsSearchVisible(false);
                    }
                  }}
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    const searchInput = document.querySelector(
                      'input[placeholder="BUSCAR EN ESTE SITIO"]'
                    ) as HTMLInputElement;
                    if (searchInput) {
                      console.log("Buscando:", searchInput.value);
                      setIsSearchVisible(false);
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
