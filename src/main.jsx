import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./Menu"; // 👈 Importa el nuevo componente Menu
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Menu /> {/* 👈 Renderiza el componente Menu */}
  </React.StrictMode>
);
