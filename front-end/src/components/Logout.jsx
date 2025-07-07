import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(
    JSON.parse(localStorage.getItem("usuarioLogado")) || null
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // limpa o estado do usuário no App
    navigate("/"); // volta para o login
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);
  };

  return (
    <button className="logout__botao" onClick={handleLogout}>
      Sair
    </button>
  );
};

export default Logout;
