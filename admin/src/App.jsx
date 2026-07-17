import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MenuManager from "./pages/MenuManager";
import Login from "./pages/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  const token = localStorage.getItem("admin_token");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  token ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/menu"
                element={
                  token ? <MenuManager /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/"
                element={<Navigate to={token ? "/dashboard" : "/login"} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
