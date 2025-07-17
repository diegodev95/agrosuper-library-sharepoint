import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Mantenedor from "./components/Mantenedor";
import Navbar from "./components/Navbar";
import Configuracion from "./pages/Configuracion";
import Dashboard from "./pages/Dashboard";

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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "mantenedor":
        return <Mantenedor user={user} />;
      case "configuracion":
        return <Configuracion user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App bg-gray-50 min-h-screen">
      <Navbar
        user={user}
        onLogout={handleLogout}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <main>{renderCurrentPage()}</main>
    </div>
  );
}

export default App;
