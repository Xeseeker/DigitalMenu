import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import "./styles/global.css";
import "./styles/responsive.css";
import "./styles/components.css";

function App() {
  return (
    <MenuProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:itemId" element={<ItemDetailsPage />} />
        </Routes>
      </Router>
    </MenuProvider>
  );
}

export default App;
